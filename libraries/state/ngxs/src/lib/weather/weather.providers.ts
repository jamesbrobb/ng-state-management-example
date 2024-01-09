import {GetProvidersFn} from "@jbr/shared";
import {WEATHER_FACADE} from '@jbr/state/shared';

import {weatherFacadeFactory} from "./weather.facade";
import {importProvidersFrom} from "@angular/core";
import {NgxsModule} from "@ngxs/store";
import {WeatherStore} from "./weather.store";


export const getProviders: GetProvidersFn = () => [
  importProvidersFrom(
    NgxsModule.forFeature([
      WeatherStore
    ])
  ),
  {
    provide: WEATHER_FACADE,
    useFactory: weatherFacadeFactory
  }
]
