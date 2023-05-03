import {enableProdMode, importProvidersFrom, isDevMode} from "@angular/core";
import {bootstrapApplication} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {provideRouter, withDebugTracing} from "@angular/router";
import {APP_CONFIG} from "@jbr/shared";

import {environment} from "./environments/environment";
import {AppComponent} from "./app/app.component";
import {getAppRoutes} from "./app/app.routes";
import {getProviders} from "./app/app.providers";

const config = environment.config;

if (environment.production) {
  enableProdMode();
}

if (isDevMode() && config.forDev) {
  config.forDev();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule
    ),
    {
      provide: APP_CONFIG,
      useValue: config
    },
    provideRouter(
      getAppRoutes(config.type as string),
     // withDebugTracing()
    ),
    ...getProviders()
  ]
}).then(ref =>  {
  if (window['ngRef' as keyof Window]) {
    window['ngRef'as keyof Window].destroy();
  }
  // @ts-ignore
  window['ngRef'] = ref;
})
  .catch(err => console.error(err));
