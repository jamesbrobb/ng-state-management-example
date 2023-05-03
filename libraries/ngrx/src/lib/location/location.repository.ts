import {inject} from "@angular/core";
import {Store} from "@ngrx/store";
import {ifNonNullElseNull, MapquestRepository, MapLocation, convertToLocationSummary} from "@jbr/shared";
import {addLocation, setActiveLocation} from "./location.actions";
import {locationFeature} from "./location.reducers";


class NGRXLocationRepository implements MapquestRepository {
  #store = inject(Store);

  readonly active$ = this.#store.select(locationFeature.getActiveLocation)
    .pipe(
      ifNonNullElseNull(
        convertToLocationSummary()
      )
    );

  setCurrentLocation(location: MapLocation): void {
    this.#store.dispatch(addLocation({location}));
    this.#store.dispatch(setActiveLocation({activeId: location.id}));
  }
}

export const locationRepositoryFactory = () => new NGRXLocationRepository();
