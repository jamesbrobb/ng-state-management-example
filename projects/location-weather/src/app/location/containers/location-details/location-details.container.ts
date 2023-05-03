import { Component } from '@angular/core';
import {DatePickerContainer} from "../../../date/containers/date-picker/date-picker.container";

@Component({
  selector: 'location-details-container',
  standalone: true,
  imports: [
    DatePickerContainer
  ],
  templateUrl: './location-details.container.html',
  styleUrls: ['./location-details.container.scss']
})
export class LocationDetailsContainer {

}
