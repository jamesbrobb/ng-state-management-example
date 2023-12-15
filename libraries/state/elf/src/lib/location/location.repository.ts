import {inject} from "@angular/core";
import {createStore, select, withProps} from "@ngneat/elf";
import {
  selectActiveEntity, selectAllEntities,
  selectEntityByPredicate,
  setActiveId, setEntities,
  withActiveId,
  withEntities
} from "@ngneat/elf-entities";
import {
  MapquestService,
  MapLocation,
  ifNonNullElseNull,
  convertToLocationSummary,
  doesLocationMatchPath
} from "@jbr/shared";
import {LocationRepository, initialLocationState} from '@jbr/state/shared';
import {map, switchMap, tap} from "rxjs";


class ElfLocationRepository implements LocationRepository {

  readonly #service = inject(MapquestService);

  readonly #store = createStore(
    { name: 'locations' },
    withEntities<MapLocation>(),
    withActiveId(),
    withProps<{searchTerm: string}>(initialLocationState)
  );

  readonly searchTerm$ = this.#store.pipe(select(state => state.searchTerm));
  readonly options$ = this.#store.pipe(selectAllEntities());
  readonly active$ = this.#store.pipe(selectActiveEntity());
  readonly activeSummary$ = this.#store.pipe(
    selectActiveEntity(),
    ifNonNullElseNull(
      convertToLocationSummary()
    )
  );

  readonly getLocationBySlug = (slug: string | string[]) =>
    this.#store.pipe(
      selectEntityByPredicate(
        (loc) => doesLocationMatchPath(loc, slug)
      ),
      map((arg) => arg || null)
    )

  constructor() {
    this.searchTerm$.pipe(
      switchMap(value => this.#service.search(value)),
      tap(res => this.#store.update(setEntities(res)))
    ).subscribe();
  }

  search(q: string): void {
    this.#store.update(state => ({
      ...state,
      searchTerm: q
    }))
  }

  setActiveLocation(location: MapLocation): void {
    this.#store.update(setActiveId(location.id));
  }
}


export const locationRepositoryFactory = () => new ElfLocationRepository();
