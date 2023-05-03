import {createAction, props} from "@ngrx/store";

export const setCurrentDate = createAction(
  '[Date] set current',
  props<{current: string}>()
)
