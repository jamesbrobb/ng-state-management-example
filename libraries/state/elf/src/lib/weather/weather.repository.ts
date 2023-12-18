import {inject, Injectable} from "@angular/core";
import {catchError, Observable, of, take, tap} from "rxjs";
import {createStore, select, withProps} from "@ngneat/elf";

import {
  WEATHER_PARAM,
  WeatherResponseData,
  WeatherService,
  WeatherLocationData,
  ifNonNullElseNull,
  convertResponseDataToLocationData
} from "@jbr/shared";

import {initialWeatherState, WeatherState, WeatherRepository, WeatherLocationMap} from "@jbr/state/shared";



class ElfWeatherRepository implements WeatherRepository {

  #store = createStore(
    { name: 'weather' },
    withProps<WeatherState>(initialWeatherState)
  );

  service = inject(WeatherService);

  readonly locations$: Observable<WeatherLocationMap> =
    this.#store.pipe(select((state) => state.locations));
  readonly getLocationByKey: (key: string) => Observable<WeatherResponseData[] | null> =
    (key: string) => this.locations$.pipe(select(state => state[key]));
  readonly getLocationDataByKey: (key: string) => Observable<WeatherLocationData | null> =
    (key: string) => this.getLocationByKey(key)
      .pipe(
        ifNonNullElseNull(
          convertResponseDataToLocationData()
        )
      )

  constructor() {
    console.log('ElfWeatherRepository');
  }

  getWeatherForLocation(lat: number, lng: number, validdatetime: string): void {
    this.service.get({
      validdatetime,
      location: `${lat},${lng}`,
      parameters: [WEATHER_PARAM.MSL_PRESSURE, WEATHER_PARAM.PRECIPITATION_24HR]
    }).pipe(
      take(1),
      tap(this._setWeather),
      catchError((err) => of(err))
    ).subscribe()
  }

  private _setWeather(arg: WeatherResponseData[]): void {
    const coord = arg[0].coordinates[0];

    this.#store.update((state) => ({
      ...state,
      locations: {
        ...state.locations,
        [`${coord.lat}${coord.lon}`]: arg
      }
    }));
  }
}

export const weatherRepositoryFactory = () => new ElfWeatherRepository();
