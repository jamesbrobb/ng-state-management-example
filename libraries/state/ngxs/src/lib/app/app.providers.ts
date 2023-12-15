import {importProvidersFrom, isDevMode} from "@angular/core";
import {NgxsModule} from "@ngxs/store";
import {NgxsRouterPluginModule} from "@ngxs/router-plugin";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";

import {GetProvidersFn} from "@jbr/shared";
import {DATE_REPOSITORY, LOCATION_REPOSITORY, APP_REPOSITORY} from '@jbr/state/shared';

import {DateStore} from "../date/date.store";
import {LocationStore} from "../location/location.store";
import {dateRepositoryFactory} from "../date/date.repository";
import {locationRepositoryFactory} from "../location/location.repository";
import {appRepositoryFactory} from "./app.repository";


export const getProviders: GetProvidersFn = () => [
  importProvidersFrom(
    NgxsModule.forRoot([
      DateStore,
      LocationStore
    ], {
      selectorOptions: {
        suppressErrors: false,
        injectContainerState: false
      },
      developmentMode: isDevMode()
    }),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ),
  {
    provide: APP_REPOSITORY,
    useFactory: appRepositoryFactory
  },
  {
    provide: DATE_REPOSITORY,
    useFactory: dateRepositoryFactory
  },
  {
    provide: LOCATION_REPOSITORY,
    useFactory: locationRepositoryFactory
  }
]
