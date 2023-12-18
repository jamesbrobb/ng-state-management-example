import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {WeatherLocationData} from "../../models/meteomatics.models";
import {NgForOf, NgIf} from "@angular/common";
import {MatTableModule} from "@angular/material/table";


@Component({
  selector: 'weather-results',
  standalone: true,
  imports: [
    NgForOf,
    MatTableModule,
    NgIf
  ],
  templateUrl: './weather-results.component.html',
  styleUrls: ['./weather-results.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherResultsComponent {
  @Input() locationData?: WeatherLocationData;

  displayedColumns: string[] = ['label', 'value'];
}
