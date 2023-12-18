import {InjectionToken} from "@angular/core";


export interface AppRepository {}

export const APP_REPOSITORY: InjectionToken<AppRepository> = new InjectionToken<AppRepository>('AppRepository');
