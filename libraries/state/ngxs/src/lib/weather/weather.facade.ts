import {inject} from "@angular/core";
import {ifNonNullElseNull, convertResponseDataToLocationData} from "@jbr/shared";
import {WeatherFacade, WeatherLocationMap} from '@jbr/state/shared';
import {Store} from "@ngxs/store";
import {map, Observable} from "rxjs";
import {WeatherStore} from "./weather.store";
import {WeatherActions} from "./weather.actions";


class NGXSWeatherFacade implements WeatherFacade {

  readonly #store = inject(Store);

  readonly locations$: Observable<WeatherLocationMap> = this.#store.select(WeatherStore.locations);
  readonly getLocationByKey =
    (key: string) => this.#store.select(WeatherStore.getLocationByKey)
      .pipe(
        map(fn => fn(key))
      );

  readonly getLocationDataByKey =
    (key: string, datetime: string) => this.getLocationByKey(key)
      .pipe(
        map(location => location?.[datetime]),
        ifNonNullElseNull(
          convertResponseDataToLocationData()
        )
      )

  getWeatherForLocation(lat: number, lng: number, validdatetime: string): void {
    this.#store.dispatch(new WeatherActions.GetForLocation(lat, lng, validdatetime));
  }
}

export const weatherFacadeFactory = () => new NGXSWeatherFacade();
