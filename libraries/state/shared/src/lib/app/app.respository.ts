import {Observable} from "rxjs";
import {InjectionToken} from "@angular/core";
import {WeatherLocationData} from "@jbr/shared";

export interface AppRepository {
  readonly currentWeather$:  Observable<WeatherLocationData | null>
}

export const APP_REPOSITORY: InjectionToken<AppRepository> = new InjectionToken<AppRepository>('AppRepository');
