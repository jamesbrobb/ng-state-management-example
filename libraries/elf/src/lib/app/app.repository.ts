import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {AppRepository, WeatherResponseData, DATE_REPOSITORY, MAPQUEST_REPOSITORY, filterUndefinedOrNull} from "@jbr/shared";
import {Observable, of, tap} from "rxjs";


class ElfAppRepository implements AppRepository {

  readonly #mapquest = inject(MAPQUEST_REPOSITORY);
  readonly #date = inject(DATE_REPOSITORY);

  readonly #router = inject(Router);

  currentWeather$: Observable<WeatherResponseData[] | null> = of(null);

  /*this.#mapquest.active$.pipe(
    switchMap(location => this.#weather.getLocationByKey(`${location.lat}${location.long}`)),
    tap(arg => console.log('1', arg)),
    filter((arg) => !!arg),
    tap(arg => console.log('2', arg))
  )*/

  /*currentWeather$ = combineLatest([
    this.mapquest.active$,
    this.weather.locations$
  ]).pipe(
    map(([location, weather]) => weather[`${location.lat}${location.long}`]),
    filter((arg) => !!arg),
    tap(arg => console.log('old', arg))
  );*/

  constructor() {

    /*this.#mapquest.active$
      .pipe(
        filterUndefinedOrNull(),
        tap((loc) => this.#router.navigate([
          'location',
          ...loc.slug.split('/')
        ])),
      ).subscribe();*/
  }

}

export const appRepositoryFactory = () => new ElfAppRepository();
