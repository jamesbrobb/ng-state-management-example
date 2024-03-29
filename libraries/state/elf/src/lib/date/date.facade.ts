import {createStore, select, withProps} from "@ngneat/elf";
import {DateState, initialDateState, DateFacade} from "@jbr/state/shared";


const store = createStore(
  {name: 'date'},
  withProps<DateState>(initialDateState)
)


class ElfDateFacade implements DateFacade {

  readonly current$ = store.pipe(select((state) => state.current));
  readonly min$ = store.pipe(select((state) => state.min));
  readonly max$ = store.pipe(select((state) => state.max));

  setCurrent(current: string): void {

    store.update((state) => {

      if(new Date(current) < new Date(state.min)) {
        current = state.min;
      }

      if(new Date(current) > new Date(state.max)) {
        current = state.max;
      }

      return {
      ...state,
        current
      }
    });
  }
}

export const dateFacadeFactory = () => new ElfDateFacade();
