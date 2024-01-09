import {inject, Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {getWeatherForLocation} from "./weather.actions";
import {weatherFeature} from "./weather.reducer";
import {ifNonNullElseNull, convertResponseDataToLocationData} from "@jbr/shared";
import {WeatherFacade} from '@jbr/state/shared';
import {map} from "rxjs";


class NGRXWeatherFacade implements WeatherFacade {

  readonly #store = inject(Store);

  readonly locations$ = this.#store.select(weatherFeature.selectLocations);
  readonly getLocationByKey = (key: string) => this.#store.select(weatherFeature.getLocationByKey(key));
  readonly getLocationDataByKey = (key: string, datetime: string) => this.getLocationByKey(key)
    .pipe(
      map(location => location?.[datetime]),
      ifNonNullElseNull(
        convertResponseDataToLocationData()
      )
    )

  getWeatherForLocation(lat: number, lng: number, validdatetime: string): void {
    this.#store.dispatch(getWeatherForLocation({lat, lng, validdatetime}));
  }
}

export const weatherFacadeFactory = () => new NGRXWeatherFacade()
