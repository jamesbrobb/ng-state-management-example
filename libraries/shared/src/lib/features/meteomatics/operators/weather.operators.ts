import {map, Observable} from "rxjs";
import {WeatherResponseData} from "../services/weather.service";
import {WeatherLocationData} from "../state/weather.state";


export const convertResponseDataToLocationData =
  (): (source$: Observable<WeatherResponseData[]>) => Observable<WeatherLocationData> => {
    return (source$) =>
      source$.pipe(
        map(responseData => {
          const coord = responseData[0].coordinates[0];
          const location = `${coord.lat}${coord.lon}`;
          return {
            date: coord.dates[0].date,
            parameters: responseData.map((param) => ({
              name: param.parameter,
              value: param.coordinates[0].dates[0].value
            }))
          }
        })
      );
  }


