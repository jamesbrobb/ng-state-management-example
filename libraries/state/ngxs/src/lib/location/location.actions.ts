import {MapLocation} from "@jbr/shared";

export namespace LocationActions {

  const TYPE = '[Location]';

  export class Search {
    static readonly type = `${TYPE} search`;
    constructor(readonly term: string) {}
  }

  export class SearchSuccess {
    static readonly type = `${TYPE} search success`;
    constructor(readonly locations: MapLocation[]) {}
  }

  export class SearchError {
    static readonly type = `${TYPE} search error`;
    constructor(readonly error: any) {}
  }

  export class SetActiveLocation {
    static readonly type = `${TYPE} set active`;
    constructor(readonly activeId: string) {}
  }
}
