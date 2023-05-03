import {createStore} from "@ngneat/elf";
import {
  selectActiveEntity,
  selectEntityByPredicate,
  setActiveId,
  upsertEntities,
  withActiveId,
  withEntities
} from "@ngneat/elf-entities";
import {MapLocation, MapquestRepository, ifNonNullElseNull, convertToLocationSummary, doesLocationMatchPath} from "@jbr/shared";
import {map} from "rxjs";


class ElfLocationRepository implements MapquestRepository {

  readonly #store = createStore(
    { name: 'locations' },
    withEntities<MapLocation>(),
    withActiveId()
  );

  readonly getLocationBySlug = (slug: string | string[]) =>
    this.#store.pipe(
      selectEntityByPredicate(
        (loc) => doesLocationMatchPath(loc, slug)
      ),
      map((arg) => arg || null)
    )

  readonly active$ = this.#store.pipe(
    selectActiveEntity(),
    ifNonNullElseNull(
      convertToLocationSummary()
    )
  );

  addLocation(location: MapLocation): void {
    this.#store.update(upsertEntities(location));
  }

  setActiveLocation(location: MapLocation): void {
    this.#store.update(setActiveId(location.id));
  }
}


export const locationRepositoryFactory = () => new ElfLocationRepository();
