import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  iif,
  mergeMap, Observable,
  of,
  switchMap,
} from "rxjs";
import {MapquestService} from "./mapquest.service";
import {MapLocation} from "../models/mapquest.models";


export class SearchTypeAheadService {

  private _value = new BehaviorSubject('');

  readonly options$: Observable<MapLocation[] | null> = this._value.pipe(
    filter(arg => typeof arg === 'string'),
    debounceTime(500),
    distinctUntilChanged(),
    mergeMap((arg) =>
      iif(
        () => arg.length > 2,
        of(arg).pipe(
          switchMap((arg) => this._service.search(arg))
        ),
        of(null)
      ),
    )
  );

  constructor(private _service: MapquestService) {}

  search(q: string): void {
    this._value.next(q);
  }
}
