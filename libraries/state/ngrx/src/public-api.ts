/*
 * Public API Surface of ngrx
 */

import {getProviders as getAppProviders} from "./lib/app/app.providers";
import {getProviders as getWeatherProviders} from "./lib/weather/weather.providers";

export {appConfig} from "./lib/app/app.config";

export {getAppProviders, getWeatherProviders};
