
export namespace DateActions {

  const TYPE = '[Date]';
  export class SetCurrentDate {
    static readonly type = `${TYPE} set current`;
    constructor(readonly current: string) {
    }
  }

}
