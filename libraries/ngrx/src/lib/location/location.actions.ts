import {createAction, props} from "@ngrx/store";
import {MapLocation} from "@jbr/shared";



export const addLocation = createAction(
  '[Location] add',
  props<{location: MapLocation}>()
)

export const setActiveLocation = createAction(
  '[Location] set active',
  props<{activeId: string}>()
)
