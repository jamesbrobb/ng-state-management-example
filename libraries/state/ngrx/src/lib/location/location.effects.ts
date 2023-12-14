import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {MapquestService} from "@jbr/shared";
import {catchError, map, of, switchMap} from "rxjs";
import {locationSearchError, locationSearchSuccess, searchForLocation} from "./location.actions";



@Injectable()
export class LocationEffects {
  readonly #actions$ = inject(Actions);
  readonly #service = inject(MapquestService);

  searchForLocation$ = createEffect(
    () => this.#actions$.pipe(
      ofType(searchForLocation),
      switchMap(({term}) => this.#service.search(term).pipe(
        map(response => locationSearchSuccess({locations: response})),
        catchError(error => of(locationSearchError({error})))
      ))
    )
  )
}
