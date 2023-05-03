import {InjectionToken} from "@angular/core";

export type APP_TYPES = 'elf' | 'ngrx' | 'ngxs'
export type APP_ICON_TYPES = 'png' | 'jpg' | 'svg'

export type AppConfigType = {
  type: APP_TYPES,
  link: string,
  iconType?: APP_ICON_TYPES,
  forDev?: () => void
}

export const APP_CONFIG = new InjectionToken<AppConfigType>('app config');
