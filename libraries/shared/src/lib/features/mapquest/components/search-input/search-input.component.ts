import {
  ChangeDetectionStrategy,
  Component,
  effect, EnvironmentInjector,
  EventEmitter,
  inject, Injector,
  Output, QueryList,
  Signal,
  ViewChild, ViewChildren
} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {MapquestService} from "../../services/mapquest.service";
import {MatInputModule} from "@angular/material/input";
import {MatAutocomplete, MatAutocompleteModule, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {map} from "rxjs";
import {SearchTypeAheadService} from "../../services/search-type-ahead.service";
import {MapLocation} from "../../models/mapquest.models";
import {toSignal} from "@angular/core/rxjs-interop";
import {MatOption} from "@angular/material/core";

@Component({
  selector: 'place-search-input',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  providers: [{
    provide: SearchTypeAheadService,
    useFactory: (dep: MapquestService) => new SearchTypeAheadService(dep),
    deps: [MapquestService]
  }],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputComponent {

  @ViewChild(MatAutocompleteTrigger, {static:false}) trigger!: MatAutocompleteTrigger;

  @ViewChildren('option')
  private matOptions!: QueryList<MatOption>;

  @ViewChild(MatAutocomplete, {static:false})
  private autoComplete!:MatAutocomplete;

  @Output() selectionChange = new EventEmitter<MapLocation>();

  readonly service = inject(SearchTypeAheadService);
  readonly myControl = new FormControl('');
  readonly options = toSignal(this.service.options$, {initialValue: null});

  private _input: Signal<string> = toSignal(
    this.myControl.valueChanges.pipe(map(arg => arg || '')),
    {initialValue: ''}
  );

  private _options?: Signal<MatOption>;

  constructor(private _injector: EnvironmentInjector) {
    effect(() => this.service.search(this._input()));
  }

  ngAfterViewInit() {
    this._options = this._injector.runInContext(() => toSignal(this.matOptions.changes));
    effect(() => console.log((this._options as Signal<MatOption>)()), {injector: this._injector})
  }

  getLabel(arg: MapLocation | null): string {
    console.log(arg);
    return arg ? arg.displayString : '';
  }
}
