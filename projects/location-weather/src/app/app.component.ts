import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {APP_CONFIG} from "@jbr/shared";
import {APP_REPOSITORY} from "@jbr/state/shared";
import {SearchInputContainer} from "./location/containers/search-input/search-input.container";
import {MapquestMapContainer} from "./location/containers/map/map/map.container";
import {DatePickerContainer} from "./date/containers/date-picker/date-picker.container";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    RouterOutlet,
    SearchInputContainer,
    MapquestMapContainer,
    DatePickerContainer
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly #repos = inject(APP_REPOSITORY);
  readonly appConfig = inject(APP_CONFIG);
}
