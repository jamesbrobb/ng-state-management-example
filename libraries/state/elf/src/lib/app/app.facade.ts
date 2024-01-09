import {inject} from "@angular/core";
import {MapLocationSummary} from "@jbr/shared";
import {AppFacade, DATE_FACADE, LOCATION_FACADE, WEATHER_FACADE} from "@jbr/state/shared";
import {filter, tap, withLatestFrom} from "rxjs";


class ElfAppFacade implements AppFacade {

  readonly #location = inject(LOCATION_FACADE);
  readonly #date = inject(DATE_FACADE);
  readonly #weather = inject(WEATHER_FACADE);

  constructor() {

    this.#date.current$.pipe(
      withLatestFrom(this.#location.activeSummary$),
      filter((arg: [string, MapLocationSummary | null]): arg is [string, MapLocationSummary] => {
        return !!arg[1];
      }),
      tap(([date, location]) => {
        this.#weather.getWeatherForLocation(location.lat, location.long, date);
      })
    ).subscribe();
  }

}

export const appFacadeFactory = () => new ElfAppFacade();
