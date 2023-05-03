import {MapLocation} from "@jbr/shared";

export namespace LocationActions {

  const TYPE = '[Location]';

  export class Add {
    static readonly type = `${TYPE} Add Location`;
    constructor(readonly location: MapLocation) {}
  }

  export class SetActive {
    static readonly type = `${TYPE} set active`;
    constructor(readonly activeId: string) {}
  }
}
