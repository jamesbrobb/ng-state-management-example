import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {WeatherLocationData} from "../../models/meteomatics.models";


@Component({
  selector: 'weather-results',
  standalone: true,
  imports: [],
  templateUrl: './weather-results.component.html',
  styleUrls: ['./weather-results.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherResultsComponent {
  @Input() locationData?: WeatherLocationData;
}
