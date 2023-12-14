import {Action, Selector, State, StateContext, StateToken} from "@ngxs/store";
import {inject, Injectable} from "@angular/core";
import {
  WEATHER_PARAM,
  WeatherResponseData,
  WeatherService,
  initialWeatherState,
  WeatherLocationMap,
  WeatherState
} from "@jbr/shared";
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
    return (key: string):WeatherResponseData[] | null => locations[key]
  }


  @Action(WeatherActions.GetForLocation, {cancelUncompleted: true})
  getForLocation(ctx: StateContext<WeatherState>, {lat, long, validdatetime}: WeatherActions.GetForLocation) {
    return this.#service.get({
      validdatetime,
      location: `${lat},${long}`,
      parameters: [WEATHER_PARAM.MSL_PRESSURE, WEATHER_PARAM.PRECIPITATION_24HR]
    }).pipe(
      tap(response => {
        const state = ctx.getState(),
          coord = response[0].coordinates[0],
          locations = {
            ...state.locations,
            [`${coord.lat}${coord.lon}`]: response
          }

        ctx.patchState({
          locations
        });
      })
    )
  }
}
