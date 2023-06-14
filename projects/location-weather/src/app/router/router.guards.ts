import {CanActivateFn} from "@angular/router";
import {of} from "rxjs";


export const preventDirectAccess: CanActivateFn = (route, state) => {

  const frags = state.url.split('/');

  return of(frags[frags.length - 1] !== route.routeConfig?.path);
}
