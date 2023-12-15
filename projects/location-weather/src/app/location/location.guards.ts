import {CanActivateFn} from "@angular/router";
import {inject} from "@angular/core";
import {MAPQUEST_REPOSITORY} from "@jbr/state/shared";
import {map, tap, combineLatest, filter, withLatestFrom} from "rxjs";


export const hasActiveLocation: CanActivateFn = (route, state) => {
  const location = inject(MAPQUEST_REPOSITORY);
  return location.active$.pipe(
    tap(arg => console.log('hasActiveLocation', arg)),
    map(arg => !!arg)
  );
}

export const setActiveLocation: CanActivateFn = (route, state) => {
  const mapquest = inject(MAPQUEST_REPOSITORY);
  const slugs = route.url.map((frag) => frag.path);

  return combineLatest([
    mapquest.active$,
    mapquest.options$
  ]).pipe(
    withLatestFrom(mapquest.getLocationBySlug(slugs)),
    map(([[active, locations], location], index) => {
      console.log('active', active);
      console.log('locations', locations);

      /*
        TODO - could all the following logic be shifted into a method on
         the location repos which would return an observable of true/false
         depending on the outcome? OR an operator?
       */

      if(location && location === active) {
        return true;
      }

      if(location) {
        /*
          TODO - this feels odd as it could trigger a side effect
           that we're unaware of... that said we can't go any further
           until the guard completes
         */
        mapquest.setActiveLocation(location);
      }

      if(!location && index === 0) {
        const numCheck = /^-?\d+,?-?\d+$/;
        const q = slugs[slugs.length - 1]
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
