import {createAction, props} from "@ngrx/store";
import {MapLocation} from "@jbr/shared";

const TYPE = '[Location]';

export const searchForLocation = createAction(
  `${TYPE} search`,
  props<{term: string}>()
)

export const locationSearchSuccess = createAction(
  `${TYPE} search success`,
  props<{locations: MapLocation[]}>()
)

export const locationSearchError = createAction(
  `${TYPE} search error`,
  props<{error: any}>()
)

export const setActiveLocation = createAction(
  `${TYPE} set active`,
  props<{activeId: string}>()
)
