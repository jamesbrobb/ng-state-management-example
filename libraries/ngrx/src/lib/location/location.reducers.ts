import {createFeature, createReducer, createSelector, on} from "@ngrx/store";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {LocationState, MapLocation} from "@jbr/shared";
import * as LocationActions from "./location.actions";


type State = LocationState & EntityState<MapLocation>;

const adapter: EntityAdapter<MapLocation> = createEntityAdapter<MapLocation>();

const initialState: State = adapter.getInitialState({
  activeId: null,
  searchTerm: ''
});


export const locationFeature = createFeature({
  name: 'location',
  reducer: createReducer(
    initialState,
    on(LocationActions.searchForLocation, (state, {term}) => ({
        ...state,
        searchTerm: term,
        activeId: null
      })
    ),
    on(LocationActions.locationSearchSuccess, (state, {locations}) =>
      adapter.setAll(locations, state)
    ),
    on(LocationActions.setActiveLocation, (state, {activeId}) => {
        const loc = state.entities[activeId];
        return adapter.setAll(
          loc ? [loc] : [],
          {
            ...state,
            activeId
          }
        )
      }
    )
  ),
  extraSelectors: ({selectLocationState, selectEntities, selectActiveId}) => ({
    selectAll: createSelector(
      selectLocationState,
      adapter.getSelectors().selectAll
    ),
    getActiveLocation: createSelector(
      selectEntities,
      selectActiveId,
      (locations, activeId): MapLocation | undefined => {

        if(!activeId) {
          return;
        }

        const location = locations[activeId];

        if(!location) {
          return;
        }

        return location;
      }
    )
  })
});
