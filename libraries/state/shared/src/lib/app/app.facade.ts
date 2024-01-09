import {InjectionToken} from "@angular/core";


export interface AppFacade {}

export const APP_FACADE: InjectionToken<AppFacade> = new InjectionToken<AppFacade>('AppFacade');
