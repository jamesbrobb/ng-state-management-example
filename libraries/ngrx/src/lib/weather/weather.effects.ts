import {inject, Injectable} from "@angular/core";
import {catchError, map, of, switchMap} from "rxjs";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {WEATHER_PARAM, WeatherService} from "@jbr/shared";
import * as WeatherActions from "./weather.actions";

@Injectable()
export class WeatherEffects {

  readonly #actions$ = inject(Actions);
  readonly #service = inject(WeatherService)

  getForLocation$ = createEffect(
    () => this.#actions$.pipe(
      ofType(WeatherActions.getWeatherForLocation),
      switchMap(({validdatetime, lat, lng}) => this.#service.get({
        validdatetime,
        location: `${lat},${lng}`,
        parameters: [WEATHER_PARAM.MSL_PRESSURE, WEATHER_PARAM.PRECIPITATION_24HR]
      }).pipe(
        map(response => WeatherActions.getWeatherSuccess({response})),
        catchError(error => of(WeatherActions.getWeatherError({error})))
      )
    )
  ));
}
