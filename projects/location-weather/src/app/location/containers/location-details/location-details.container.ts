import {Component, inject} from '@angular/core';
import {MatExpansionModule} from "@angular/material/expansion";
import {NavigationCancel, NavigationEnd, Router, RouterLink, RouterOutlet} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";
import {map, startWith} from "rxjs";
import {ofRouterEventType} from "@jbr/shared";

@Component({
  selector: 'location-details-container',
  standalone: true,
  imports: [
    MatExpansionModule,
    RouterOutlet,
    NgIf,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './location-details.container.html',
  styleUrls: ['./location-details.container.scss']
})
export class LocationDetailsContainer {

  readonly #router = inject(Router);

  readonly url = this.#router.events.pipe(
    ofRouterEventType(NavigationEnd),
    map(({url}) => url),
    startWith(this.#router.url),
    map(url => url.split('/').pop())
  );

}
