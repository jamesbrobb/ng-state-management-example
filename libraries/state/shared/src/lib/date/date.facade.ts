import {Observable} from "rxjs";
import {InjectionToken} from "@angular/core";


export interface DateFacade {
  readonly current$: Observable<string>;
  readonly min$: Observable<string>;
  readonly max$: Observable<string>;

  setCurrent(current: string): void;
}

export const DATE_FACADE = new InjectionToken<DateFacade>('DateFacade');
