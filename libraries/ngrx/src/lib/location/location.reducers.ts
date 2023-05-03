import {createFeature, createReducer, createSelector, on} from "@ngrx/store";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {LocationState, MapLocation} from "@jbr/shared";
import * as LocationActions from "./location.actions";


type State = LocationState & EntityState<MapLocation>;

const adapter: EntityAdapter<MapLocation> = createEntityAdapter<MapLocation>();

const initialState: State = adapter.getInitialState({
  activeId: null,
});


export const locationFeature = createFeature({
  name: 'location',
  reducer: createReducer(
    initialState,
    on(LocationActions.addLocation, (state, {location}) => {
      return adapter.addOne(location, state);
    }),
    on(LocationActions.setActiveLocation, (state, {activeId}) => ({
        ...state,
        activeId
      })
    )
  ),
  extraSelectors: ({selectEntities, selectActiveId}) => ({
    getActiveLocation: createSelector(
      selectEntities,
      selectActiveId,
      (locations, activeId): MapLocation | null => {

        if(!activeId) {
          return null;
        }

        const location = locations[activeId];

        if(!location) {
          return null
        }

        return location
      }
    )
  })
});
