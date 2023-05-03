import {EnvironmentProviders, Provider} from "@angular/core";

export type GetProvidersFn = () => (Provider | EnvironmentProviders)[];

