import {Actions, ofActionSuccessful, Store} from "@ngxs/store";
import {inject, Injectable} from "@angular/core";
import {LOCATION_REPOSITORY, DATE_REPOSITORY} from '@jbr/state/shared';
import {tap, withLatestFrom} from "rxjs";
import {DateActions} from "../date/date.actions";
import {LocationActions} from "../location/location.actions";
import {Navigate} from "@ngxs/router-plugin";
import {Router} from "@angular/router";


@Injectable({providedIn: "root"})
export class AppActionHandlers {

  readonly #store = inject(Store);
  readonly #actions = inject(Actions);
  readonly #date = inject(DATE_REPOSITORY);
  readonly #location = inject(LOCATION_REPOSITORY);

  readonly #router = inject(Router);

  constructor() {
    this.#actions.pipe(
      ofActionSuccessful(DateActions.SetCurrentDate, LocationActions.SetActiveLocation),
      withLatestFrom(
        this.#location.activeSummary$,
        this.#date.current$
      ),
      tap(([action, location, date]) => {
        console.log(location);
        if(!location || !location.lat || !location.long || !date) {
          return;
        }

        this.#store.dispatch(new Navigate(['weather']));
      })
    )
    .subscribe();
  }
}
