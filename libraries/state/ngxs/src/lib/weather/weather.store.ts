import {Action, Selector, State, StateContext, StateToken} from "@ngxs/store";
import {inject, Injectable} from "@angular/core";
import {WEATHER_PARAM, WeatherResponseData, WeatherService} from "@jbr/shared";
import {WeatherState, initialWeatherState, WeatherLocationMap} from '@jbr/state/shared';
import {WeatherActions} from "./weather.actions";
import {tap} from "rxjs";


const WEATHER_STATE_TOKEN = new StateToken<WeatherState>('weather');

@State({
  name: WEATHER_STATE_TOKEN,
  defaults: initialWeatherState
})
@Injectable({providedIn: 'root'})
export class WeatherStore {

  readonly #service = inject(WeatherService);

  @Selector([WeatherStore])
  static locations(state: WeatherState) {
    return state.locations;
  }

  @Selector([WeatherStore.locations])
  static getLocationByKey(locations: WeatherLocationMap) {
    return (key: string): {[datetime: string]:WeatherResponseData[]} | null => locations[key]
  }


  @Action(WeatherActions.GetForLocation, {cancelUncompleted: true})
  getForLocation(ctx: StateContext<WeatherState>, {lat, long, validdatetime}: WeatherActions.GetForLocation) {
    return this.#service.get({
      validdatetime,
      location: `${lat},${long}`,
      parameters: [
        WEATHER_PARAM.WIND_SPEED,
        WEATHER_PARAM.WIND_DIRECTION,
        WEATHER_PARAM.WIND_GUSTS_24HR,
        WEATHER_PARAM.TEMPERATURE_MIN,
        WEATHER_PARAM.TEMPERATURE_MAX,
        WEATHER_PARAM.PRECIPITATION_24HR,
        WEATHER_PARAM.WEATHER_SYMBOL_24H,
        WEATHER_PARAM.SUNRISE,
        WEATHER_PARAM.SUNSET
      ]
    }).pipe(
      tap(response => {
        const state = ctx.getState(),
          coord = response[0].coordinates[0],
          location = `${coord.lat}-${coord.lon}`,
          locations = {
            ...state.locations,
            [location]: {
              ...state.locations[location] || {},
              [validdatetime]: response
            }
          }

        ctx.patchState({
          locations
        });
      })
    )
  }
}
