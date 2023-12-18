import {GetProvidersFn} from "@jbr/shared";
import {DATE_REPOSITORY, LOCATION_REPOSITORY, APP_REPOSITORY, WEATHER_REPOSITORY} from "@jbr/state/shared";

import {dateRepositoryFactory} from "../date/date.repository";
import {locationRepositoryFactory} from "../location/location.repository";
import {appRepositoryFactory} from "./app.repository";
import {weatherRepositoryFactory} from "../weather/weather.repository";


export const getProviders: GetProvidersFn = () => [
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
  },
  {
    provide: WEATHER_REPOSITORY,
    useFactory: weatherRepositoryFactory
  }
]
