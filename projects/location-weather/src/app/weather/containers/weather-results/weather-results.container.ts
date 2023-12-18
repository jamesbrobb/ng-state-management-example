import {Component, inject, Input} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {WeatherLocationData, WeatherResultsComponent} from "@jbr/shared";
import {LOCATION_REPOSITORY, DATE_REPOSITORY, WEATHER_REPOSITORY} from "@jbr/state/shared";
import {combineLatest, Observable, of, switchMap} from "rxjs";
import {DatePickerContainer} from "../../../date/containers/date-picker/date-picker.container";
import {MatDividerModule} from "@angular/material/divider";

@Component({
  selector: 'weather-results-container',
  standalone: true,
  imports: [WeatherResultsComponent, AsyncPipe, WeatherResultsComponent, DatePickerContainer, MatDividerModule],
  templateUrl: './weather-results.container.html',
  styleUrls: ['./weather-results.container.scss']
})
export class WeatherResultsContainer {

  readonly #location = inject(LOCATION_REPOSITORY);
  readonly #date = inject(DATE_REPOSITORY);
  readonly #weather = inject(WEATHER_REPOSITORY);

  readonly weather$ = combineLatest([
    this.#location.activeSummary$,
    this.#date.current$
  ]).pipe(
    switchMap(([location, date]) => {
      if(!location) {
        return of(null);
      }
      return this.#weather.getLocationDataByKey(`${location.lat}-${location.long}`, date);
    })
  );
}
