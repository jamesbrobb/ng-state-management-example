import {isDevMode} from "@angular/core";
import {provideState, provideStore} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {provideRouterStore, routerReducer} from "@ngrx/router-store";
import {GetProvidersFn} from "@jbr/shared";
import {DATE_REPOSITORY, MAPQUEST_REPOSITORY, APP_REPOSITORY} from '@jbr/state/shared';

import {dateFeature} from "../date/date.reducer";
import {locationFeature} from "../location/location.reducers";

import {dateRepositoryFactory} from "../date/date.repository";
import {locationRepositoryFactory} from "../location/location.repository";
import {appRepositoryFactory} from "./app.repository";
import {LocationEffects} from "../location/location.effects";



export const getProviders: GetProvidersFn = () => [
  provideStore({
    router: routerReducer,
  }),
  provideRouterStore(),
  provideState(dateFeature),
  provideState(locationFeature),
  provideEffects(LocationEffects),
  provideStoreDevtools({
    maxAge: 25,
    logOnly: !isDevMode(),
  }),
  {
    provide: DATE_REPOSITORY,
    useFactory: dateRepositoryFactory
  },
  {
    provide: MAPQUEST_REPOSITORY,
    useFactory: locationRepositoryFactory
  },
  {
    provide: APP_REPOSITORY,
    useFactory: appRepositoryFactory
  }
]
