import {
  ChangeDetectionStrategy, Component, DestroyRef,
  EventEmitter, inject, Input, Output, QueryList,
  signal, SimpleChanges, ViewChild
} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatAutocomplete, MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatOption} from "@angular/material/core";
import {debounceTime, distinctUntilChanged, filter, map, MonoTypeOperatorFunction, of, switchMap} from "rxjs";
import {MapLocation} from "../../models/mapquest.models";

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
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputComponent {

  readonly options = signal<MapLocation[] | null>(null);
  readonly myControl = new FormControl<MapLocation | string>('');
  readonly destroyRef = inject(DestroyRef);

  @Input('options') set _options(value: MapLocation[] | null) {
    this.options.set(value)
  }
  @Input() selected: MapLocation | null = null;

  @Output() readonly inputChange = this.myControl.valueChanges.pipe(
    map(arg => arg || ''),
    filter((arg): arg is string => typeof arg === 'string'),
    debounceTime(300),
    distinctUntilChanged()
  );
  @Output() readonly selectionChange = new EventEmitter<MapLocation>();

  @ViewChild(MatAutocomplete, {static:false})
  autoComplete!: MatAutocomplete;

  get showResults(): boolean {
    return typeof this.myControl.value === 'string' && this.myControl.value.length > 2;
  }


  ngOnChanges(changes: SimpleChanges) {

    if(this.myControl.value === this.selected || this.selected === null) {
      return;
    }

    this.myControl.setValue(this.selected);
  }

  ngAfterViewInit() {
    this.autoComplete.options.changes.pipe(
      takeUntilDestroyed(this.destroyRef),
      syncOptionSelection(() => this.selected),
    ).subscribe();
  }

  getLabel(arg: MapLocation | null): string {
    return arg ? arg.displayString : '';
  }
}

const syncOptionSelection = (selected: () => MapLocation | null): MonoTypeOperatorFunction<QueryList<MatOption<any>>> => {
  return (source$) =>
    source$.pipe(
      switchMap(
        (list: QueryList<MatOption<any>>) => {
          list.forEach(
            (opt) => {
              opt.value === selected() ? opt.select() : opt.deselect()
            }
          );

          return of(list);
        }
      )
    )
}
