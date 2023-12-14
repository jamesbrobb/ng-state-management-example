import {inject} from "@angular/core";
import {Store} from "@ngxs/store";
import {DateRepository} from "@jbr/state/shared";
import {Observable} from "rxjs";
import {DateActions} from "./date.actions";
import {DateStore} from "./date.store";


class NGXSDateRepository implements DateRepository {

  readonly #store = inject(Store);

  readonly current$: Observable<string> = this.#store.select(DateStore.current);
  readonly min$: Observable<string> = this.#store.select(DateStore.min);
  readonly max$: Observable<string> = this.#store.select(DateStore.max);

  setCurrent(current: string): void {
    this.#store.dispatch(new DateActions.SetCurrentDate(current));
  }
}

export const dateRepositoryFactory = () => new NGXSDateRepository()
