import {
  filter,
  of,
  switchMap,
  OperatorFunction
} from "rxjs";



export const filterUndefinedOrNull = <T>(): OperatorFunction<T, NonNullable<T>> => {
  return (source$) =>
    source$.pipe(
      filter((res): res is NonNullable<T> => res !== null && res !== undefined),
    )
}

export const ifNonNullElseNull = <T, F>(trueResult: OperatorFunction<T, F>): OperatorFunction<T | undefined | null, F | null> => {
  return (source$) =>
    source$.pipe(
      switchMap(value => !!value ? of(value).pipe(trueResult) : of(null))
    )
}
