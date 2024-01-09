import {inject, Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {DateFacade} from '@jbr/state/shared';
import {setCurrentDate} from "./date.actions";
import {dateFeature} from "./date.reducer";


class NGRXDateFacade implements DateFacade {
  readonly #store = inject(Store);

  readonly current$ = this.#store.select(dateFeature.selectCurrent);
  readonly min$ = this.#store.select(dateFeature.selectMin);
  readonly max$ = this.#store.select(dateFeature.selectMax);

  setCurrent(current: string): void {
    this.#store.dispatch(setCurrentDate({current}));
  }
}

export const dateFacadeFactory = () => new NGRXDateFacade();
