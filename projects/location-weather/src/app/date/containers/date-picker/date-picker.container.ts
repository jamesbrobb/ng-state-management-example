import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {DATE_REPOSITORY, DatePickerComponent} from "@jbr/shared";

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
  readonly repos = inject(DATE_REPOSITORY);
  onDateChange(value: string): void {
    this.repos.setCurrent(new Date(value).toISOString());
  }
}
