import {
  WEATHER_REPOSITORY,
  GetProvidersFn
} from "@jbr/shared";

import {weatherRepositoryFactory} from "./weather.repository";
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
    provide: WEATHER_REPOSITORY,
    useFactory: weatherRepositoryFactory
  }
]
