// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Environment} from '@jbr/shared';
import {appConfig} from "../app/app.config";
import {METEOMATICS_AUTH} from "../../../../libraries/shared/src/lib/features";


export const environment: Environment = {
  production: false,
  config: appConfig,
  MAPQUEST_KEY: process.env['MAPQUEST_KEY'] || 'MAPQUEST_KEY',
  METEOMATICS_AUTH:  process.env['METEOMATICS_AUTH'] || 'METEOMATICS_AUTH'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
