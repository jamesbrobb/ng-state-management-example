import {Routes} from "@angular/router";
import {getProviders} from "./weather.providers";
import {WeatherResultsContainer} from "./containers/weather-results/weather-results.container";
import {getWeatherForActiveLocation} from "./weather.guards";


export const WEATHER_ROUTES: Routes = [{
  path: '',
  canActivate:[
    getWeatherForActiveLocation
  ],
  providers: [
    ...getProviders()
  ],
  component: WeatherResultsContainer
}]
