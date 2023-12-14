import {createFeature, createReducer, on} from "@ngrx/store";
import {setCurrentDate} from "./date.actions";
import {initialDateState} from "@jbr/state/shared";


export const dateFeature = createFeature({
  name: 'date',
  reducer: createReducer(
    initialDateState,
    on(setCurrentDate, (state, {current}) => ({
      ...state,
      current
    }))
  )
});

