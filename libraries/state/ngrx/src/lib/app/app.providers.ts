import {isDevMode} from "@angular/core";
import {provideState, provideStore} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {provideRouterStore, routerReducer} from "@ngrx/router-store";
import {GetProvidersFn} from "@jbr/shared";
import {DATE_FACADE, LOCATION_FACADE, APP_FACADE} from '@jbr/state/shared';

import {dateFeature} from "../date/date.reducer";
import {locationFeature} from "../location/location.reducers";

import {dateFacadeFactory} from "../date/date.facade";
import {locationFacadeFactory} from "../location/location.facade";
import {appFacadeFactory} from "./app.facade";
import {LocationEffects} from "../location/location.effects";
import {AppEffects} from "./app.effects";


export const getProviders: GetProvidersFn = () => [
  provideStore({
    router: routerReducer,
  }),
  provideRouterStore(),
  provideState(dateFeature),
  provideState(locationFeature),
  provideEffects(AppEffects, LocationEffects),
  provideStoreDevtools({
    maxAge: 25,
    logOnly: !isDevMode(),
  }),
  {
    provide: DATE_FACADE,
    useFactory: dateFacadeFactory
  },
  {
    provide: LOCATION_FACADE,
    useFactory: locationFacadeFactory
  },
  {
    provide: APP_FACADE,
    useFactory: appFacadeFactory
  }
]
