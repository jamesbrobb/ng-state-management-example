import {Component, inject, Input} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {WeatherLocationData, WeatherResultsComponent} from "@jbr/shared";
import {WEATHER_REPOSITORY} from "@jbr/state/shared";
import {Observable} from "rxjs";
import {DatePickerContainer} from "../../../date/containers/date-picker/date-picker.container";

@Component({
  selector: 'weather-results-container',
  standalone: true,
  imports: [WeatherResultsComponent, AsyncPipe, WeatherResultsComponent, DatePickerContainer],
  templateUrl: './weather-results.container.html',
  styleUrls: ['./weather-results.container.css']
})
export class WeatherResultsContainer {

  @Input() set latlng(value: string) {
    this.weather$ = this.#repos.getLocationDataByKey(value);
  }

  readonly #repos = inject(WEATHER_REPOSITORY);
  weather$?: Observable<WeatherLocationData | null>;
}
