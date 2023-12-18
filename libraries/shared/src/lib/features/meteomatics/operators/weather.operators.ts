import {map, Observable} from "rxjs";
import {WEATHER_PARAM, WeatherResponseData} from "../services/weather.service";
import {WeatherLocationData} from "../models/meteomatics.models";
import {degToCompass, ISOTimeToTime} from "../utils/utilities";


const param_label_map: {[key: string]: string} = {
  [WEATHER_PARAM.WIND_SPEED]: 'Wind speed',
  [WEATHER_PARAM.WIND_DIRECTION]: 'Wind direction',
  [WEATHER_PARAM.WIND_GUSTS_24HR]: 'Wind gusts',
  [WEATHER_PARAM.TEMPERATURE_MIN]: 'Minimum temperature',
  [WEATHER_PARAM.TEMPERATURE_MAX]: 'Maximum temperature',
  [WEATHER_PARAM.PRECIPITATION_24HR]: 'Rainfall',
  [WEATHER_PARAM.WEATHER_SYMBOL_24H]: 'Symbol',
  [WEATHER_PARAM.SUNRISE]: 'Sunrise',
  [WEATHER_PARAM.SUNSET]: 'Sunset'
}

const param_value_map: {[key: string]: string | ((arg: any) => string)} = {
  [WEATHER_PARAM.WIND_SPEED]: ' m/s',
  [WEATHER_PARAM.WIND_DIRECTION]: degToCompass,
  [WEATHER_PARAM.WIND_GUSTS_24HR]: ' m/s',
  [WEATHER_PARAM.TEMPERATURE_MIN]: '°C',
  [WEATHER_PARAM.TEMPERATURE_MAX]: '°C',
  [WEATHER_PARAM.PRECIPITATION_24HR]: 'mm',
  [WEATHER_PARAM.WEATHER_SYMBOL_24H]: 'Symbol',
  [WEATHER_PARAM.SUNRISE]: ISOTimeToTime,
  [WEATHER_PARAM.SUNSET]: ISOTimeToTime
}


export const convertResponseDataToLocationData =
  (): (source$: Observable<WeatherResponseData[]>) => Observable<WeatherLocationData> => {
    return (source$) =>
      source$.pipe(
        map(responseData => {
          const coord = responseData[0].coordinates[0];
          const location = `${coord.lat}${coord.lon}`;
          return {
            date: coord.dates[0].date,
            parameters: responseData.map((param) => {
              const valConvertor = param_value_map[param.parameter]
              let val = param.coordinates[0].dates[0].value;
              val = typeof valConvertor === 'function' ? valConvertor(val) : `${val}${valConvertor}`;

              return {
                name: param.parameter,
                  label: param_label_map[param.parameter],
                  value: val
              }
            })
          }
        })
      );
  }


