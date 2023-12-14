import {GetProvidersFn} from "@jbr/shared";
import {WEATHER_REPOSITORY} from '@jbr/state/shared';

import {weatherRepositoryFactory} from "./weather.repository";


export const getProviders: GetProvidersFn = () => [
  {
    provide: WEATHER_REPOSITORY,
    useFactory: weatherRepositoryFactory
  }
]
