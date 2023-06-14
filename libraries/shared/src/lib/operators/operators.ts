import {
  filter,
  of,
  switchMap,
  OperatorFunction, iif, MonoTypeOperatorFunction, tap
} from "rxjs";
import {Event} from "@angular/router";
import {Type} from "@angular/core";


export const log = <T>(...args: unknown[]): MonoTypeOperatorFunction<T> => {
  return tap(arg => console.log(arg, ...args))
}


export const filterUndefinedOrNull = <T>(): OperatorFunction<T, NonNullable<T>> => {
  return filter((res): res is NonNullable<T> => res !== null && res !== undefined)
}

export const ifTruthyElseNull = <T>(condition: (arg: T) => boolean): OperatorFunction<T, T | null> => {
  return switchMap(value => iif(
    () => condition(value),
    of(value),
    of(null))
  )
}

export const ifNonNullElseNull = <T, F>(trueResult: OperatorFunction<T, F>): OperatorFunction<T | undefined | null, F | null> => {
  return switchMap(value => !!value ? of(value).pipe(trueResult) : of(null))
}

export const ofRouterEventType =
  <T extends Event, R extends Event[]>(...events: [...{ [K in keyof R]: Type<R[K]> }]): OperatorFunction<T, R[number]> => {
    return filter((event: T) => events.some((evt) => event instanceof evt))
  }

