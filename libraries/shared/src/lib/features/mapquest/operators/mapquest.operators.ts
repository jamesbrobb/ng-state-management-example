import {map, Observable} from "rxjs";
import {MapLocation, MapLocationSummary} from "../models/mapquest.models";


export const convertToLocationSummary =
  (): (source$: Observable<MapLocation>) => Observable<MapLocationSummary> => {
    return (source$) =>
      source$.pipe(
        map(res => ({
          type: res.recordType,
          name: res.name,
          city: res.place.properties.city,
          country: res.place.properties.country,
          countryCode: res.place.properties.countryCode,
          lat:res.place.geometry.coordinates[1],
          long: res.place.geometry.coordinates[0],
          slug: res.slug
        }))
      )
  }
