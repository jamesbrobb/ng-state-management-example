import {InjectionToken} from "@angular/core";
import {Observable} from "rxjs";
import {MapLocation, MapLocationSummary} from "@jbr/shared";


export interface MapquestRepository {
  readonly searchTerm$: Observable<string>;
  readonly options$: Observable<MapLocation[]>;
  readonly active$: Observable<MapLocation | undefined>;
  readonly activeSummary$: Observable<MapLocationSummary | null>;
  readonly getLocationBySlug: (slug: string | string[]) => Observable<MapLocation | null>;
  search(q: string): void;
  setActiveLocation(location: MapLocation): void;
}

export const MAPQUEST_REPOSITORY = new InjectionToken<MapquestRepository>('MapquestRepository')
