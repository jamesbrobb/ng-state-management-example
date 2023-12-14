import {Action, Selector, State, StateContext, StateToken} from "@ngxs/store";
import {initialLocationState, LocationState, MapLocation, LocationEntities} from "@jbr/shared";
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
  static searchTerm(state: LocationState): string { return state.searchTerm; }
  @Selector([LocationStore])
  static ids(state: LocationState): string[] | number[] { return state.ids; }
  @Selector([LocationStore])
  static entities(state: LocationState): LocationEntities { return state.entities; }

  @Selector([LocationStore.ids, LocationStore.entities])
  static selectAll(ids: string[] | number[], entities: LocationEntities): MapLocation[] {
    return ids.map(id => entities[id])
      .filter((ent): ent is MapLocation => !!ent);
  }

  @Selector([LocationStore])
  static getActiveLocation(state: LocationState): MapLocation | undefined {
    const {entities, activeId} = state;

    if(!activeId) {
      return;
    }

    const location = entities[activeId];

    if(!location) {
      return;
    }

    return location;
  }

  @Action(LocationActions.Search)
  search(ctx: StateContext<LocationState>, action: LocationActions.Search) {
    ctx.patchState({
      searchTerm: action.term,
      activeId: null
    })
  }

  @Action(LocationActions.SearchSuccess)
  searchSuccess(ctx: StateContext<LocationState>, action: LocationActions.SearchSuccess) {
    const locations = action.locations,
      ids = locations.map(loc => loc.id),
      entities = Object.fromEntries(locations.map(loc => [loc.id, loc]));

    ctx.patchState({
      ids,
      entities
    });
  }

  @Action(LocationActions.SetActiveLocation)
  setActive(ctx: StateContext<LocationState>, action: LocationActions.SetActiveLocation) {
    const state = ctx.getState(),
      loc = state.entities[action.activeId];

    ctx.patchState({
      entities: loc ? {[loc.id]: loc} : {},
      ids: loc ? [loc.id] : [],
      activeId: action.activeId
    })
  }
}
