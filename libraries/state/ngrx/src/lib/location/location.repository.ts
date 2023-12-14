import {inject} from "@angular/core";
import {Store} from "@ngrx/store";
import {ifNonNullElseNull, MapLocation, convertToLocationSummary, doesLocationMatchPath} from "@jbr/shared";
import {MapquestRepository} from '@jbr/state/shared';
import {searchForLocation, setActiveLocation} from "./location.actions";
import {locationFeature} from "./location.reducers";
import {find, from, map, switchMap} from "rxjs";


class NGRXLocationRepository implements MapquestRepository {
  readonly #store = inject(Store);

  readonly searchTerm$ = this.#store.select(locationFeature.selectSearchTerm);
  readonly options$ = this.#store.select(locationFeature.selectAll);
  readonly active$ = this.#store.select(locationFeature.getActiveLocation)

  readonly activeSummary$ = this.#store.select(locationFeature.getActiveLocation)
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
    );
  search(q: string): void {
    this.#store.dispatch(searchForLocation({term: q}));
  }

  setActiveLocation(location: MapLocation): void {
    this.#store.dispatch(setActiveLocation({activeId: location.id}));
  }
}

export const locationRepositoryFactory = () => new NGRXLocationRepository();
