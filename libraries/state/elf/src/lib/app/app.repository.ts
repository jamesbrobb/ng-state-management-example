import {inject} from "@angular/core";
import {MapLocationSummary} from "@jbr/shared";
import {AppRepository, DATE_REPOSITORY, LOCATION_REPOSITORY, WEATHER_REPOSITORY} from "@jbr/state/shared";
import {filter, tap, withLatestFrom} from "rxjs";


class ElfAppRepository implements AppRepository {

  readonly #location = inject(LOCATION_REPOSITORY);
  readonly #date = inject(DATE_REPOSITORY);
  readonly #weather = inject(WEATHER_REPOSITORY);

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

export const appRepositoryFactory = () => new ElfAppRepository();
