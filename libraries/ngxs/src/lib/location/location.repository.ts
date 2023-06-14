import {inject} from "@angular/core";
import {Store} from "@ngxs/store";
import {MapquestRepository, MapLocation, ifNonNullElseNull, convertToLocationSummary} from "@jbr/shared";
import {LocationActions} from "./location.actions";
import {LocationStore} from "./location.store";


class NGXSLocationRepository implements MapquestRepository {

  readonly #store = inject(Store);

  readonly activeSummary$ = this.#store.select(LocationStore.active)
    .pipe(
      ifNonNullElseNull(
        convertToLocationSummary()
      )
    )
  setCurrentLocation(location: MapLocation): void {
    this.#store.dispatch([new LocationActions.Add(location), new LocationActions.SetActive(location.id)]);
  }
}

export const locationRepositoryFactory = () => new NGXSLocationRepository();
