import {Actions, ofActionSuccessful, Store} from "@ngxs/store";
import {inject, Injectable} from "@angular/core";
import {MapLocationSummary} from '@jbr/shared';
import {LOCATION_REPOSITORY} from '@jbr/state/shared';
import {filter, map, tap, withLatestFrom} from "rxjs";
import {DateActions} from "../date/date.actions";
import {WeatherActions} from "../weather/weather.actions";


@Injectable({providedIn: "root"})
export class AppActionHandlers {

  readonly #store = inject(Store);
  readonly #actions = inject(Actions);
  readonly #location = inject(LOCATION_REPOSITORY);

  constructor() {
    this.#actions.pipe(
      ofActionSuccessful(DateActions.SetCurrentDate),
      map(action => action.current),
      withLatestFrom(this.#location.activeSummary$),
      filter((arg: [string, MapLocationSummary | null]): arg is [string, MapLocationSummary] => {
        return !!arg[1];
      }),
      tap(([date, location]) => {
        this.#store.dispatch(new WeatherActions.GetForLocation(location.lat, location.long, date));
      })
    )
    .subscribe();
  }
}
