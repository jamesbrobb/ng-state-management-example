import {inject, Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {DateRepository} from "@jbr/shared";
import {setCurrentDate} from "./date.actions";
import {dateFeature} from "./date.reducer";


class NGRXDateRepository implements DateRepository {
  readonly #store = inject(Store);

  readonly current$ = this.#store.select(dateFeature.selectCurrent);
  readonly min$ = this.#store.select(dateFeature.selectMin);
  readonly max$ = this.#store.select(dateFeature.selectMax);

  setCurrent(current: string): void {
    this.#store.dispatch(setCurrentDate({current}));
  }
}

export const dateRepositoryFactory = () => new NGRXDateRepository();
