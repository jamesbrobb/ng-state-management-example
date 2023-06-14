import { Routes } from '@angular/router';
import {preventDirectAccess} from "./router/router.guards";


export const getAppRoutes = (title: string): Routes => [{
  path:'',
  title,
  children: [{
    path: 'location',
    canActivate: [
      preventDirectAccess
    ],
    loadChildren: () => import('./location/location.routes').then(mod => mod.LOCATION_ROUTES)
  }]
}, {
  path: '**',
  redirectTo: '',
  pathMatch: 'full'
}];
