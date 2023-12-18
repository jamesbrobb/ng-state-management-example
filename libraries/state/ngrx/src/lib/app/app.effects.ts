import {filter, map, withLatestFrom} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {MapLocationSummary} from '@jbr/shared';
import {LOCATION_REPOSITORY} from '@jbr/state/shared';

import {setCurrentDate} from "../date/date.actions";
import {getWeatherForLocation} from "../weather/weather.actions";


@Injectable()
export class AppEffects {

  readonly #actions$ = inject(Actions);
  readonly #location = inject(LOCATION_REPOSITORY);

  getWeatherForLocation$ = createEffect(
    () => this.#actions$.pipe(
      ofType(setCurrentDate),
      map(action => action.current),
      withLatestFrom(this.#location.activeSummary$),
      filter((arg: [string, MapLocationSummary | null]): arg is [string, MapLocationSummary] => {
        console.log(arg);
        return !!arg[1];
      }),
      map(([date, location]) => {
        return getWeatherForLocation({lat: location.lat, lng: location.long, validdatetime: date});
      })
    ),
  )
}

