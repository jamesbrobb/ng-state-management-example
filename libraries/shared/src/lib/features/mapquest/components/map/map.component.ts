import {Component, Input, OnChanges, Renderer2} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LatLngExpression, Map, Marker} from "leaflet";
import {ResourceLoaderService} from "../../../../utils/resource-loader.service";


@Component({
  selector: 'mapquest-map',
  standalone: true,
  imports: [CommonModule],
  providers: [{
    provide: ResourceLoaderService,
    useFactory: (rnd: Renderer2) => new ResourceLoaderService(rnd),
    deps: [Renderer2]
  }],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges {

  @Input() currentLocation?: any;

  #leaflet: any;
  #map?: Map;
  constructor(
    private loader: ResourceLoaderService
  ) {}
  ngOnInit() {
    this.loader.loadFile('https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.css')
      .catch((err) => console.log(err));

    this.loader.loadFile('https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.js')
      .then(() => this.#mapLoaded())
      .catch((err) => console.log(err));
  }

  ngOnChanges(): void {
    if(!this.#map || !this.currentLocation) {
      return;
    }

    const coords: LatLngExpression = [this.currentLocation.lat, this.currentLocation.long];

    this.#map.setView(coords, 14);

    const marker: Marker = this.#leaflet.marker(coords);
    marker.addTo(this.#map);
  }

  #mapLoaded() {
    this.#leaflet = window['L'];

    const mapquest = this.#leaflet.mapquest;
    mapquest.key = '8hyjFGdGNNpSaV4MrCbVE7cnBbVZYSUZ';
    this.#map = mapquest.map('my-map', {
      center: [0, 0],
      layers: mapquest.tileLayer('map'),
      zoom: 2
    });

    mapquest.control().addTo(this.#map);
  }
}

