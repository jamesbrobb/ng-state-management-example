import {Action, Selector, State, StateContext, StateToken} from "@ngxs/store";
import {initialLocationState, LocationState} from "@jbr/shared";
import {Injectable} from "@angular/core";
import {LocationActions} from "./location.actions";


const LOCATION_STATE_TOKEN = new StateToken<LocationState>('location');

@State({
  name: LOCATION_STATE_TOKEN,
  defaults: initialLocationState
})
@Injectable({providedIn: 'root'})
export class LocationStore {

  @Selector([LocationStore])
  static active(state: LocationState) {
    if(!state.activeId) {
      return null;
    }

    const location = state.entities[state.activeId];

    if(!location) {
      return null
    }

    return location;
  }

  @Action(LocationActions.Add)
  add(ctx: StateContext<LocationState>, action: LocationActions.Add) {
    const state = ctx.getState(),
      location = action.location,
      index = state.ids.findIndex(id => location.id === id),
      ids = [...state.ids] as string[] | number[];

    ids.splice(index > -1 ? index : ids.length, index > -1 ? 1 : 0, location.id);

    ctx.setState({
      ids,
      entities: {
        ...state.entities,
        [action.location.id]: action.location
      },
      activeId: state.activeId
    })
  }

  @Action(LocationActions.SetActive)
  setActive(ctx: StateContext<LocationState>, action: LocationActions.SetActive) {
    ctx.patchState({
      activeId: action.activeId
    })
  }
}
