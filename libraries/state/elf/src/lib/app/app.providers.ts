import {GetProvidersFn} from "@jbr/shared";
import {DATE_FACADE, LOCATION_FACADE, APP_FACADE, WEATHER_FACADE} from "@jbr/state/shared";

import {dateFacadeFactory} from "../date/date.facade";
import {locationFacadeFactory} from "../location/location.facade";
import {appFacadeFactory} from "./app.facade";
import {weatherFacadeFactory} from "../weather/weather.facade";


export const getProviders: GetProvidersFn = () => [
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
  },
  {
    provide: WEATHER_FACADE,
    useFactory: weatherFacadeFactory
  }
]
