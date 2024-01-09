import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {combineLatest, map, tap} from "rxjs";
import {LOCATION_FACADE, DATE_FACADE, WEATHER_FACADE} from "@jbr/state/shared";


export const weatherGuard: CanActivateFn = (route, state) => {
  const location = inject(LOCATION_FACADE);
  const date = inject(DATE_FACADE);

  return combineLatest(
    location.activeSummary$,
    date.current$
  ).pipe(
    map(([location, date]) => !!(location && date)),
  )
}

export const getWeatherForActiveLocation: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const locationFacade = inject(LOCATION_FACADE);
  const weather = inject(WEATHER_FACADE);
  const date = inject(DATE_FACADE);

  return combineLatest([
    locationFacade.activeSummary$,
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
