import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {SearchInputComponent, MapLocation, getUrlFragsForLocation} from "@jbr/shared";
import {MAPQUEST_REPOSITORY} from "@jbr/state/shared";
import {AsyncPipe} from "@angular/common";


@Component({
  selector: 'search-input-container',
  standalone: true,
  imports: [SearchInputComponent, AsyncPipe],
  templateUrl: './search-input.container.html',
  styleUrls: ['./search-input.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputContainer {
  readonly #repos = inject(MAPQUEST_REPOSITORY);
  readonly #router = inject(Router);

  readonly options$ = this.#repos.options$;
  readonly active$ = this.#repos.active$;

  onInputChange(arg: string): void {

    if(this.#router.routerState.snapshot.url !== '/') {
      this.#router.navigate(['']);
    }

    this.#repos.search(arg);
  }

  onSelectLocation(location: MapLocation): void {
    this.#router.navigate([
      'location',
      ...getUrlFragsForLocation(location)
    ])
  }
}
