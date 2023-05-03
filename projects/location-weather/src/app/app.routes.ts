import { Routes } from '@angular/router';
import {locationGuard} from "./location/location.guards";

export const getAppRoutes = (title: string): Routes => [{
  path:'',
  title,
  children: [{
    path: 'location',
    canActivate: [locationGuard],
    loadChildren: () => import('./location/location.routes').then(mod => mod.LOCATION_ROUTES)
  }]
}, {
  path: '**',
  redirectTo: '',
  pathMatch: 'full'
}];
