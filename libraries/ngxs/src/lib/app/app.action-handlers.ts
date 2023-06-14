import {Actions, ofActionSuccessful, Store} from "@ngxs/store";
import {inject, Injectable} from "@angular/core";
import {MAPQUEST_REPOSITORY, DATE_REPOSITORY} from '@jbr/shared';
import {tap, withLatestFrom} from "rxjs";
import {DateActions} from "../date/date.actions";
import {LocationActions} from "../location/location.actions";
import {Navigate} from "@ngxs/router-plugin";


@Injectable({providedIn: "root"})
export class AppActionHandlers {

  readonly #store = inject(Store);
  readonly #actions = inject(Actions);
  readonly #date = inject(DATE_REPOSITORY);
  readonly #location = inject(MAPQUEST_REPOSITORY);

  constructor() {
    this.#actions.pipe(
      ofActionSuccessful(DateActions.SetCurrentDate, LocationActions.SetActive),
      withLatestFrom(
        this.#location.activeSummary$,
        this.#date.current$
      ),
      tap(([action, location, date]) => {

        if(!location || !location.lat || !location.long || !date) {
          return;
        }

        this.#store.dispatch(new Navigate(['weather']));
      })
    )
    .subscribe();
  }
}
