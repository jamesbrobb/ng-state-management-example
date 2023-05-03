import {Routes} from "@angular/router";
import {getProviders} from "./weather.providers";
import {weatherResolve} from "./weather.resolve";
import {WeatherResultsContainer} from "./containers/weather-results/weather-results.container";


export const WEATHER_ROUTES: Routes = [{
  path: '',
  providers: [
    ...getProviders()
  ],
  resolve: {
    data: weatherResolve
  },
  component: WeatherResultsContainer
}]
