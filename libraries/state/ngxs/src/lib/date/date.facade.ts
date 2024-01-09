import {inject} from "@angular/core";
import {Store} from "@ngxs/store";
import {DateFacade} from "@jbr/state/shared";
import {Observable} from "rxjs";
import {DateActions} from "./date.actions";
import {DateStore} from "./date.store";


class NGXSDateFacade implements DateFacade {

  readonly #store = inject(Store);

  readonly current$: Observable<string> = this.#store.select(DateStore.current);
  readonly min$: Observable<string> = this.#store.select(DateStore.min);
  readonly max$: Observable<string> = this.#store.select(DateStore.max);

  setCurrent(current: string): void {
    this.#store.dispatch(new DateActions.SetCurrentDate(current));
  }
}

export const dateFacadeFactory = () => new NGXSDateFacade()
