import {inject, Injectable} from "@angular/core";
import {Actions, concatLatestFrom, createEffect, ofType} from "@ngrx/effects";
import {MAPQUEST_REPOSITORY, DATE_REPOSITORY} from '@jbr/shared';
import {setActiveLocation} from "../location/location.actions";
import {setCurrentDate} from "../date/date.actions";

import {tap} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class AppEffects {

  readonly #actions$ = inject(Actions);
  readonly #location = inject(MAPQUEST_REPOSITORY);
  readonly #date = inject(DATE_REPOSITORY);
  readonly #router = inject(Router);

  getWeatherForLocation = createEffect(
    () => this.#actions$.pipe(
      ofType(
        setActiveLocation,
        setCurrentDate
      ),
      concatLatestFrom(() => [
        this.#location.activeSummary$,
        this.#date.current$
      ]),
      tap(([action, location, date]) => {
        console.log(location);
        if(!location || !location.lat || !location.long || !date) {
          return;
        }

        this.#router.navigate(['weather'])
      })
    ),
    {dispatch: false}
  )
}

