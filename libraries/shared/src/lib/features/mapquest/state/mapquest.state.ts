import {MapLocation} from "../models/mapquest.models";

export type LocationEntities = {
  [id: string]: MapLocation | undefined
}

export interface LocationState {
  ids: string[] | number[]
  entities: LocationEntities
  activeId: string | null
  searchTerm: string
}

export const initialLocationState: LocationState = {
  ids: [],
  entities: {},
  activeId: null,
  searchTerm: ''
}
