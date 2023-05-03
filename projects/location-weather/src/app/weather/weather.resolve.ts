import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {WEATHER_REPOSITORY, MAPQUEST_REPOSITORY, DATE_REPOSITORY} from "@jbr/shared";
import {combineLatest, map, tap} from "rxjs";

export const weatherResolve: ResolveFn<null> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const mapquest = inject(MAPQUEST_REPOSITORY);
    const weather = inject(WEATHER_REPOSITORY);
    const date = inject(DATE_REPOSITORY);

    return combineLatest([
      mapquest.active$,
      date.current$
    ]).pipe(
      tap(([location, date]) => console.log(location, date)),
      tap(([location, date]) => {
        if(!location) {
          return;
        }
        weather.getWeatherForLocation(location.lat, location.long, date)
      }),
      map(() => null)
    )
  }
