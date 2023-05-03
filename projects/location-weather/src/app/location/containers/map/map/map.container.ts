import {Component, inject} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {MAPQUEST_REPOSITORY, MapComponent} from "@jbr/shared";

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
