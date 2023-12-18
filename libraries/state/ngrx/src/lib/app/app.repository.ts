import {inject} from "@angular/core";
import {of} from "rxjs";
import {AppRepository, LOCATION_REPOSITORY} from "@jbr/state/shared";


class NGRXAppRepository implements AppRepository {

  readonly #location = inject(LOCATION_REPOSITORY);

  readonly currentWeather$ = of(null)
}

export const appRepositoryFactory = () => new NGRXAppRepository();
