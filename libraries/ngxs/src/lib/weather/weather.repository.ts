import {inject} from "@angular/core";
import {WeatherRepository, WeatherLocationMap, ifNonNullElseNull, convertResponseDataToLocationData} from "@jbr/shared";
import {Store} from "@ngxs/store";
import {map, Observable} from "rxjs";
import {WeatherStore} from "./weather.store";
import {WeatherActions} from "./weather.actions";


class NGXSWeatherRepository implements WeatherRepository {

  readonly #store = inject(Store);

  readonly locations$: Observable<WeatherLocationMap> = this.#store.select(WeatherStore.locations);
  readonly getLocationByKey =
    (key: string) => this.#store.select(WeatherStore.getLocationByKey)
      .pipe(
        map(fn => fn(key))
      );

  readonly getLocationDataByKey =
    (key: string) => this.getLocationByKey(key)
      .pipe(
        ifNonNullElseNull(
          convertResponseDataToLocationData()
        )
      )

  getWeatherForLocation(lat: number, lng: number, validdatetime: string): void {
    this.#store.dispatch(new WeatherActions.GetForLocation(lat, lng, validdatetime));
  }
}

export const weatherRepositoryFactory = () => new NGXSWeatherRepository();
