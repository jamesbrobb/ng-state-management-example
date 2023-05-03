import {CanActivateFn} from "@angular/router";
import {inject} from "@angular/core";
import {combineLatest, map, of, startWith, tap} from "rxjs";
import {MAPQUEST_REPOSITORY, DATE_REPOSITORY} from "@jbr/shared";


export const weatherGuard: CanActivateFn = (route, state) => {

  const location = inject(MAPQUEST_REPOSITORY);
  const date = inject(DATE_REPOSITORY);
  console.log(route, state);
  return of(true);
  return combineLatest(
    location.active$.pipe(startWith(undefined)),
    date.current$
  ).pipe(
    map(([location, date]) => !!(location && date)),
  )
}
