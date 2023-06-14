import {ActionCreator, Creator, TypedAction} from "@ngrx/store/src/models";
import {createAction, props} from "@ngrx/store";


export type APIAction<T extends string> = {
  id: number
} & TypedAction<T>;

const id = 1;

export function createApiAction<T extends string, C extends Creator>(type: T, config?: { _as: 'props' } | C): ActionCreator<T, C> {
  return createAction(type, props<>())
}
