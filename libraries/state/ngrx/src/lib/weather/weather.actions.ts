import {createAction, props} from "@ngrx/store";
import {WeatherResponseData} from "@jbr/shared";


export const getWeatherForLocation = createAction(
  '[Weather] get for location',
  props<{lat: number, lng: number, validdatetime: string}>()
)

export const getWeatherSuccess = createAction(
  '[Weather] get success',
  props<{validdatetime: string, response: WeatherResponseData[]}>()
)

export const getWeatherError = createAction(
  '[Weather] get error',
  props<{error: any}>()
)
