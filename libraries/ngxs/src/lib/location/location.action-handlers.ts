import {inject, Injectable} from "@angular/core";
import {Actions, ofActionSuccessful, Store} from "@ngxs/store";
import {MapquestService} from "@jbr/shared";
import {LocationActions} from "./location.actions";
import {catchError, switchMap, tap, of} from "rxjs";


@Injectable({providedIn: "root"})
export class LocationActionHandlers {
  readonly #service = inject(MapquestService);
  readonly #store = inject(Store);
  readonly #actions = inject(Actions);

  constructor() {
    this.#actions.pipe(
      ofActionSuccessful(LocationActions.Search),
      switchMap(({term}) => this.#service.search(term).pipe(
        tap(response => this.#store.dispatch(new LocationActions.SearchSuccess(response))),
        catchError(error => {
          this.#store.dispatch(new LocationActions.SearchError(error))
          return of(error);
        })
      ))
    ).subscribe();
  }
}
