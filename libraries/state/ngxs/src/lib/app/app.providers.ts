import {importProvidersFrom, isDevMode} from "@angular/core";
import {NgxsModule} from "@ngxs/store";
import {NgxsRouterPluginModule} from "@ngxs/router-plugin";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";

import {GetProvidersFn} from "@jbr/shared";
import {DATE_FACADE, LOCATION_FACADE, APP_FACADE} from '@jbr/state/shared';

import {DateStore} from "../date/date.store";
import {LocationStore} from "../location/location.store";
import {dateFacadeFactory} from "../date/date.facade";
import {locationFacadeFactory} from "../location/location.facade";
import {appFacadeFactory} from "./app.facade";


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
    provide: APP_FACADE,
    useFactory: appFacadeFactory
  },
  {
    provide: DATE_FACADE,
    useFactory: dateFacadeFactory
  },
  {
    provide: LOCATION_FACADE,
    useFactory: locationFacadeFactory
  }
]
