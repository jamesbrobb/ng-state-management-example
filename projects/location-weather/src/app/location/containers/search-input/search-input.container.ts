import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {MAPQUEST_REPOSITORY, SearchInputComponent, MapLocation, getUrlFragsForLocation} from "@jbr/shared";


@Component({
  selector: 'search-input-container',
  standalone: true,
  imports: [SearchInputComponent],
  templateUrl: './search-input.container.html',
  styleUrls: ['./search-input.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputContainer {
  readonly #repos = inject(MAPQUEST_REPOSITORY);
  readonly #router = inject(Router);

  selectLocation(location: MapLocation): void {
    this.#repos.addLocation(location);
    this.#router.navigate([
      'location',
      ...getUrlFragsForLocation(location)
    ])
  }
}
