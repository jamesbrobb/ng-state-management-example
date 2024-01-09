import {CanActivateFn} from "@angular/router";
import {inject} from "@angular/core";
import {LOCATION_FACADE} from "@jbr/state/shared";
import {map, tap, combineLatest, filter, withLatestFrom} from "rxjs";


export const hasActiveLocation: CanActivateFn = (route, state) => {
  const location = inject(LOCATION_FACADE);
  return location.active$.pipe(
    tap(arg => console.log('hasActiveLocation', arg)),
    map(arg => !!arg)
  );
}

export const setActiveLocation: CanActivateFn = (route, state) => {
  const locationFacade = inject(LOCATION_FACADE);
  const slugs = route.url.map((frag) => frag.path);

  return combineLatest([
    locationFacade.active$,
    locationFacade.options$
  ]).pipe(
    withLatestFrom(locationFacade.getLocationBySlug(slugs)),
    map(([[active, locations], location], index) => {

      /*
        TODO - could all the following logic be shifted into a method on
         the location facade which would return an observable of true/false
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
        locationFacade.setActiveLocation(location);
      }

      if(!location && index === 0) {
        const numCheck = /^-?\d+,?-?\d+$/;
        const q = slugs[slugs.length - 1]
          .split('-')
          .filter(arg => !numCheck.test(arg))
          .join(' ');
        locationFacade.search(q);
      }

      if(!location && index > 0) {
        return false;
      }

      return null;
    }),
    filter((arg: boolean | null): arg is boolean => arg !== null)
  )
}
