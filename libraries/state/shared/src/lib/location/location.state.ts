import {MapLocation} from "@jbr/shared";


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
