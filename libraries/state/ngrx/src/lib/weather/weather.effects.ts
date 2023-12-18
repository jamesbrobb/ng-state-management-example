import {inject, Injectable} from "@angular/core";
import {catchError, map, of, switchMap} from "rxjs";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {WEATHER_PARAM, WeatherService} from "@jbr/shared";
import {getWeatherError, getWeatherForLocation, getWeatherSuccess} from "./weather.actions";

@Injectable()
export class WeatherEffects {

  readonly #actions$ = inject(Actions);
  readonly #service = inject(WeatherService)

  getForLocation$ = createEffect(
    () => this.#actions$.pipe(
      ofType(getWeatherForLocation),
      switchMap(({validdatetime, lat, lng}) => this.#service.get({
        validdatetime,
        location: `${lat},${lng}`,
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
        map(response => getWeatherSuccess({validdatetime, response})),
        catchError(error => of(getWeatherError({error})))
      )
    )
  ));
}
