import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'eating-out-results-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eating-out-results.container.html',
  styleUrls: ['./eating-out-results.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EatingOutResultsContainer {

}
