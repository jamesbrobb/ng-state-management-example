import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {SearchInputComponent, MapLocation, getUrlFragsForLocation} from "@jbr/shared";
import {LOCATION_FACADE} from "@jbr/state/shared";
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
  readonly #facade = inject(LOCATION_FACADE);
  readonly #router = inject(Router);

  readonly options$ = this.#facade.options$;
  readonly active$ = this.#facade.active$;

  onInputChange(arg: string): void {

    if(this.#router.routerState.snapshot.url !== '/') {
      this.#router.navigate(['']);
    }

    this.#facade.search(arg);
  }

  onSelectLocation(location: MapLocation): void {
    this.#router.navigate([
      'location',
      ...getUrlFragsForLocation(location)
    ])
  }
}
