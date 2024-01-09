import {Component, inject, Input} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {WeatherResultsComponent} from "@jbr/shared";
import {LOCATION_FACADE, DATE_FACADE, WEATHER_FACADE} from "@jbr/state/shared";
import {combineLatest, of, switchMap} from "rxjs";
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

  readonly #location = inject(LOCATION_FACADE);
  readonly #date = inject(DATE_FACADE);
  readonly #weather = inject(WEATHER_FACADE);

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
