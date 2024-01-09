import {provideState} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";

import {GetProvidersFn} from "@jbr/shared";
import {WEATHER_FACADE} from '@jbr/state/shared';

import {weatherFacadeFactory} from "./weather.facade";
import {weatherFeature} from "./weather.reducer";
import {WeatherEffects} from "./weather.effects";


export const getProviders: GetProvidersFn = () => [
  provideState(weatherFeature),
  provideEffects(WeatherEffects),
  {
    provide: WEATHER_FACADE,
    useFactory: weatherFacadeFactory
  }
]
