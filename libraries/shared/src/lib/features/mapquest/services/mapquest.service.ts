import {inject, Injectable, InjectionToken} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {iif, map, Observable, of, switchMap} from "rxjs";
import {MapLocation} from "../models/mapquest.models";

const API = 'https://www.mapquestapi.com/search/v3/prediction';

type PredictionResponseDTO = {
  request: {
    q: string,
    collection: string[]
  },
  results: MapLocation[]
}

export const MAPQUEST_KEY = new InjectionToken<string>('MAPQUEST_KEY');

@Injectable({providedIn: 'root'})
export class MapquestService {
  #http = inject(HttpClient);
  #key: string = inject(MAPQUEST_KEY);

  search(q: string): Observable<MapLocation[]> {

    return of(q).pipe(
      switchMap(value => iif(
        () => value?.length > 2,
        of(value).pipe(
          switchMap(_ => {
            const params = new HttpParams({fromObject: {
                key: this.#key,
                q,
                collection: [
                  'poi',
                  'airport',
                  'address',
                  "adminArea"
                ].join(','),
                limit: 5
              }});
            return this.#http.get<PredictionResponseDTO>(API, {params})
              .pipe(map((response) => response.results));
          })
        ),
        of([])
      ))
    )
  }
}
