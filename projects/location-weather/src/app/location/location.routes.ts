import {Routes} from "@angular/router";
import {weatherGuard} from "../weather/weather.guards";
import {LocationDetailsContainer} from "./containers/location-details/location-details.container";
import {locationMatcher} from "./location.matcher";
import {locationResolve} from "./location.resolve";


export const LOCATION_ROUTES: Routes = [{
  matcher: locationMatcher,
  resolve: {
    location: locationResolve
  },
  providers: [

  ],
  children: [{
    path: '',
    redirectTo: 'weather',
    pathMatch: 'full'
  },{
    path: 'weather',
    canActivate: [weatherGuard],
    loadChildren: () => import('../weather/weather.routes').then(mod => mod.WEATHER_ROUTES)
  }],
  component: LocationDetailsContainer
}]
