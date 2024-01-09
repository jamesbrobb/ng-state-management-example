import {inject} from "@angular/core";
import {Store} from "@ngxs/store";
import {MapLocation, ifNonNullElseNull, convertToLocationSummary, doesLocationMatchPath, log} from "@jbr/shared";
import {LocationFacade} from '@jbr/state/shared';
import {LocationActions} from "./location.actions";
import {LocationStore} from "./location.store";
import {find, from, map, switchMap, tap} from "rxjs";
import {LocationActionHandlers} from "./location.action-handlers";


class NGXSLocationFacade implements LocationFacade {

  readonly #store = inject(Store);
  readonly #actionHandlers = inject(LocationActionHandlers);

  readonly searchTerm$ = this.#store.select(LocationStore.searchTerm);
  readonly options$ = this.#store.select(LocationStore.selectAll);
  readonly active$ = this.#store.select(LocationStore.getActiveLocation);

  readonly activeSummary$ = this.#store.select(LocationStore.getActiveLocation)
    .pipe(
      ifNonNullElseNull(
        convertToLocationSummary()
      )
    );

  readonly getLocationBySlug = (slug: string | string[]) =>
    this.options$.pipe(
      switchMap(locations => from(locations)
        .pipe(
          find((loc) => doesLocationMatchPath(loc, slug)),
          map((arg) => arg || null)
        )
      )
    )

  search(q: string): void {
    this.#store.dispatch(new LocationActions.Search(q));
  }
  setActiveLocation(location: MapLocation): void {
    this.#store.dispatch(new LocationActions.SetActiveLocation(location.id));
  }
}

export const locationFacadeFactory = () => new NGXSLocationFacade();
