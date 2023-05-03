import {inject} from "@angular/core";
import {of} from "rxjs";
import {AppRepository, MAPQUEST_REPOSITORY} from "@jbr/shared";


class NGRXAppRepository implements AppRepository {

  readonly #location = inject(MAPQUEST_REPOSITORY);

  readonly currentWeather$ = of(null)

  /*
  this.#location.active$.pipe(
    switchMap(location => this.#weather.getLocationByKey(`${location.lat}${location.long}`))
  );
  */
}

export const appRepositoryFactory = () => new NGRXAppRepository();
