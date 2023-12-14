import {inject} from "@angular/core";
import {AppRepository} from "@jbr/shared";
import {of} from "rxjs";
import {AppActionHandlers} from "./app.action-handlers";


class NGXSAppRepository implements AppRepository {

  //readonly #appActionHandlers = inject(AppActionHandlers);
  readonly currentWeather$ = of(null)

  /*
  this.#location.activeSummary$.pipe(
    switchMap(location => this.#weather.getLocationByKey(`${location.lat}${location.long}`))
  );
  */
}

export const appRepositoryFactory = () => new NGXSAppRepository();
