import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {combineLatest, map, tap} from "rxjs";
import {LOCATION_REPOSITORY, DATE_REPOSITORY, WEATHER_REPOSITORY} from "@jbr/state/shared";


export const weatherGuard: CanActivateFn = (route, state) => {
  const location = inject(LOCATION_REPOSITORY);
  const date = inject(DATE_REPOSITORY);

  return combineLatest(
    location.activeSummary$,
    date.current$
  ).pipe(
    map(([location, date]) => !!(location && date)),
  )
}

export const getWeatherForActiveLocation: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const locationRepos = inject(LOCATION_REPOSITORY);
  const weather = inject(WEATHER_REPOSITORY);
  const date = inject(DATE_REPOSITORY);

  return combineLatest([
    locationRepos.activeSummary$,
    date.current$
  ]).pipe(
    tap(([location, date]) => {
      if(!location) {
        return;
      }
      weather.getWeatherForLocation(location.lat, location.long, date)
    }),
    map(() => true)
  )
}
