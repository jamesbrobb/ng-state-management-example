import {CanActivateFn} from "@angular/router";
import {inject} from "@angular/core";
import {MAPQUEST_REPOSITORY} from "@jbr/shared";
import {map, tap, combineLatest, filter, withLatestFrom} from "rxjs";


export const hasActiveLocation: CanActivateFn = (route, state) => {
  const location = inject(MAPQUEST_REPOSITORY);
  return location.active$.pipe(
    tap(arg => console.log(arg)),
    map(arg => !!arg)
  );
}

export const setActiveLocation: CanActivateFn = (route, state) => {
  const mapquest = inject(MAPQUEST_REPOSITORY);
  const slug = route.url.map((frag) => frag.path);

  return combineLatest([
    mapquest.active$,
    mapquest.options$
  ]).pipe(
    withLatestFrom(mapquest.getLocationBySlug(slug)),
    map(([[active, locations], location], index) => {

      if(location && location === active) {
        return true;
      }

      if(location && location !== active) {
        mapquest.setActiveLocation(location);
      }

      if(!location && index === 0) {
        const numCheck = /^-?\d+,?-?\d+$/;
        const q = slug[slug.length - 1]
          .split('-')
          .filter(arg => !numCheck.test(arg))
          .join(' ');
        mapquest.search(q);
      }

      if(!location && index > 0) {
        return false;
      }

      return null;
    }),
    filter((arg: boolean | null): arg is boolean => arg !== null)
  )
}
