import {MapLocation} from "../models/mapquest.models";

export interface LocationState {
  ids: string[] | number[];
  entities: {[id: string]: MapLocation | undefined};
  activeId: string | null
}

export const initialLocationState: LocationState = {
  ids: [],
  entities: {},
  activeId: null
}
