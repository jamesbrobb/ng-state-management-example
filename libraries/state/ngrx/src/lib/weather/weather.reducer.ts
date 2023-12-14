import {createFeature, createReducer, createSelector, on} from "@ngrx/store";
import {initialWeatherState, WeatherState, WeatherResponseData} from "@jbr/shared";
import * as WeatherActions from "./weather.actions";


export const weatherFeature = createFeature({
  name: 'weather',
  reducer: createReducer<WeatherState>(
    initialWeatherState,
    on(WeatherActions.getWeatherSuccess, (state, {response}) => {
      const coord = response[0].coordinates[0];
      const location = `${coord.lat}${coord.lon}`;
      return {
        locations: {
          ...state.locations,
          [location]: response
        }
      }
    })
  ),
  extraSelectors: ({selectLocations}) => ({
    getLocationByKey: (key: string) => createSelector(
      selectLocations,
      (locations): WeatherResponseData[] | null => locations[key]
    )
  })
});
