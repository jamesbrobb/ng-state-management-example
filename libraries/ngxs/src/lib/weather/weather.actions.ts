
export namespace WeatherActions {

  const TYPE = '[WEATHER]';
  export class GetForLocation {
    static readonly type = `${TYPE} get for location`;
    constructor(
      readonly lat: number,
      readonly long: number,
      readonly validdatetime: string
    ) {}
  }
}
