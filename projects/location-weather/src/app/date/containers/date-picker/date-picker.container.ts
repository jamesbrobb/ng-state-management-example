import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {DatePickerComponent} from "@jbr/shared";
import {DATE_FACADE} from "@jbr/state/shared";

@Component({
  selector: 'date-picker-container',
  standalone: true,
  imports: [
    DatePickerComponent,
    AsyncPipe
  ],
  templateUrl: './date-picker.container.html',
  styleUrls: ['./date-picker.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerContainer {
  readonly facade = inject(DATE_FACADE);
  onDateChange(value: string): void {
    this.facade.setCurrent(new Date(value).toISOString());
  }
}
