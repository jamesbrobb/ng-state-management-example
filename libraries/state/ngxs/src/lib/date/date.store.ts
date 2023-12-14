import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {StateToken} from "@ngxs/store";
import {DateState, initialDateState} from "@jbr/state/shared";
import {DateActions} from "./date.actions";

const DATE_STATE_TOKEN = new StateToken<DateState>('date');

@State({
  name: DATE_STATE_TOKEN,
  defaults: initialDateState
})
@Injectable({providedIn: 'root'})
export class DateStore {
  @Selector([DateStore])
  static current(state: DateState) { return state.current }
  @Selector([DateStore])
  static min(state: DateState) { return state.min }
  @Selector([DateStore])
  static max(state: DateState) { return state.max }

  @Action(DateActions.SetCurrentDate)
  setCurrent(ctx: StateContext<DateState>, action: DateActions.SetCurrentDate):void {
    ctx.patchState({
      current: action.current
    })
  }

}
