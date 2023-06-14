import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {iif, map, Observable, of, switchMap} from "rxjs";
import {MapLocation} from "../models/mapquest.models";

const KEY = '8hyjFGdGNNpSaV4MrCbVE7cnBbVZYSUZ';
const API = 'https://www.mapquestapi.com/search/v3/prediction';

type PredictionResponseDTO = {
  request: {
    q: string,
    collection: string[]
  },
  results: MapLocation[]
}


@Injectable({providedIn: 'root'})
export class MapquestService {
  private _http = inject(HttpClient);

  search(q: string): Observable<MapLocation[]> {

    return of(q).pipe(
      switchMap(value => iif(
        () => value?.length > 2,
        of(value).pipe(
          switchMap(_ => {
            const params = new HttpParams({fromObject: {
                key: KEY,
                q,
                collection: [
                  'poi',
                  'airport',
                  'address',
                  "adminArea"
                ].join(','),
                limit: 5
              }});
            return this._http.get<PredictionResponseDTO>(API, {params})
              .pipe(map((response) => response.results));
          })
        ),
        of([])
      ))
    )
  }
}
