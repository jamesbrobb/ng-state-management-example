import {Component, inject} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {MapComponent} from "@jbr/shared";
import {MAPQUEST_REPOSITORY} from "@jbr/state/shared";

@Component({
  selector: 'map-container',
  standalone: true,
  imports: [MapComponent, AsyncPipe, MapComponent],
  templateUrl: './map.container.html',
  styleUrls: ['./map.container.scss']
})
export class MapquestMapContainer {
  readonly location = inject(MAPQUEST_REPOSITORY);
}
