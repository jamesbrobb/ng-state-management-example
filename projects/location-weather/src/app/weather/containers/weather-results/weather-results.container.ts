import {Component, inject, Input} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {WEATHER_REPOSITORY, WeatherLocationData, WeatherResultsComponent} from "@jbr/shared";
import {Observable} from "rxjs";

@Component({
  selector: 'weather-results-container',
  standalone: true,
  imports: [WeatherResultsComponent, AsyncPipe, WeatherResultsComponent],
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
