import {provideState} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";

import {GetProvidersFn} from "@jbr/shared";
import {WEATHER_REPOSITORY} from '@jbr/state/shared';

import {weatherRepositoryFactory} from "./weather.repository";
import {weatherFeature} from "./weather.reducer";
import {WeatherEffects} from "./weather.effects";


export const getProviders: GetProvidersFn = () => [
  provideState(weatherFeature),
  provideEffects(WeatherEffects),
  {
    provide: WEATHER_REPOSITORY,
    useFactory: weatherRepositoryFactory
  }
]
