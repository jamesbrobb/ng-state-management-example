import {inject} from "@angular/core";
import {catchError, map, Observable, of, take, tap} from "rxjs";
import {createStore, select, withProps} from "@ngneat/elf";

import {
  WEATHER_PARAM,
  WeatherResponseData,
  WeatherService,
  ifNonNullElseNull,
  convertResponseDataToLocationData
} from "@jbr/shared";

import {initialWeatherState, WeatherState, WeatherFacade, WeatherLocationMap} from "@jbr/state/shared";


class ElfWeatherFacade implements WeatherFacade {

  #store = createStore(
    { name: 'weather' },
    withProps<WeatherState>(initialWeatherState)
  );

  service = inject(WeatherService);

  readonly locations$: Observable<WeatherLocationMap> =
    this.#store.pipe(select((state) => state.locations));
  readonly getLocationByKey: (key: string) => Observable<{[datetime: string]:WeatherResponseData[]} | null> =
    (key: string) => this.locations$.pipe(select(state => state[key]));
  readonly getLocationDataByKey = (key: string, datetime: string) => this.getLocationByKey(key)
    .pipe(
      map(location => location?.[datetime]),
      ifNonNullElseNull(
        convertResponseDataToLocationData()
      )
    )

  getWeatherForLocation(lat: number, lng: number, validdatetime: string): void {
    this.service.get({
      validdatetime,
      location: `${lat},${lng}`,
      parameters: [
        WEATHER_PARAM.WIND_SPEED,
        WEATHER_PARAM.WIND_DIRECTION,
        WEATHER_PARAM.WIND_GUSTS_24HR,
        WEATHER_PARAM.TEMPERATURE_MIN,
        WEATHER_PARAM.TEMPERATURE_MAX,
        WEATHER_PARAM.PRECIPITATION_24HR,
        WEATHER_PARAM.WEATHER_SYMBOL_24H,
        WEATHER_PARAM.SUNRISE,
        WEATHER_PARAM.SUNSET
      ]
    }).pipe(
      take(1),
      tap((data) => this._setWeather(data, validdatetime)),
      catchError((err) => of(err))
    ).subscribe()
  }

  private _setWeather(data: WeatherResponseData[], validdatetime: string): void {
    const coord = data[0].coordinates[0];
    const location = `${coord.lat}-${coord.lon}`;
    this.#store.update((state) => ({
      ...state,
      locations: {
        ...state.locations,
        [location]: {
          ...state.locations[location] || {},
          [validdatetime]: data
        }
      }
    }));
  }
}

export const weatherFacadeFactory = () => new ElfWeatherFacade();
