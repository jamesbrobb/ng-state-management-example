import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeatherLocationData} from "../../state/weather.state";

@Component({
  selector: 'weather-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-results.component.html',
  styleUrls: ['./weather-results.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherResultsComponent {
  @Input() locationData?: WeatherLocationData;
}
