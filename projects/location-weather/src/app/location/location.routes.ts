import {Routes} from "@angular/router";
import {LocationDetailsContainer} from "./containers/location-details/location-details.container";
import {locationMatcher} from "./location.matcher";
import {hasActiveLocation, setActiveLocation} from "./location.guards";


export const LOCATION_ROUTES: Routes = [{
  matcher: locationMatcher,
  canActivate: [
    setActiveLocation
  ],
  providers: [

  ],
  component: LocationDetailsContainer,
  children: [{
    path: '',
    redirectTo: 'weather',
    pathMatch: 'full'
  },{
    path: 'weather',
    canActivate: [
      hasActiveLocation
    ],
    loadChildren: () => import('../weather/weather.routes').then(mod => mod.WEATHER_ROUTES)
  }, {
    path: 'eating-out',
    canActivate: [
      hasActiveLocation
    ],
    loadChildren: () => import('../eating-out/eating-out.routes').then(mod => mod.EATING_OUT_ROUTES)
  }]
}]
