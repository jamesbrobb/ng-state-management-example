import {InjectionToken} from "@angular/core";
import {Observable} from "rxjs";
import {MapLocation, MapLocationSummary} from "../models/mapquest.models";


export interface MapquestRepository {
  readonly active$: Observable<MapLocationSummary | null>;
  readonly getLocationBySlug: (slug: string | string[]) => Observable<MapLocation | null>;
  addLocation(location: MapLocation): void;
  setActiveLocation(location: MapLocation): void;
}

export const MAPQUEST_REPOSITORY = new InjectionToken<MapquestRepository>('MapquestRepository')
