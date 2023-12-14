import {
  WEATHER_REPOSITORY,
  GetProvidersFn
} from "@jbr/shared";

import {weatherRepositoryFactory} from "./weather.repository";


export const getProviders: GetProvidersFn = () => [
  {
    provide: WEATHER_REPOSITORY,
    useFactory: weatherRepositoryFactory
  }
]
