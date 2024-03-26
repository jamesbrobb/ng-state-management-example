
# Angular State Management solution comparison

## What.

The project demonstrates various Angular state management solutions by illustrating their implementation styles and logic through a non-trivial example.

The following state management solutions are currently implemented:
  - [NgRx](https://ngrx.io/) - app [demo](https://ng-state-management.jamesrobb.work/ngrx/)
  - [NgXs](https://www.ngxs.io/) - app [demo](https://ng-state-management.jamesrobb.work/ngxs/)
  - [Elf](https://github.com/ngneat/elf/)  - app [demo](https://ng-state-management.jamesrobb.work/elf/) - (successor to [Akita](https://github.com/salesforce/akita))

---

The project is a mono-repos consisting of the following:

5 libraries:
  - [shared](https://github.com/jamesbrobb/ng-state-management-example/tree/main/libraries/shared) - shared (state agnostic) application, feature (components/models/services/etc) and utility logic
  - [shared state](https://github.com/jamesbrobb/ng-state-management-example/tree/main/libraries/state/shared) - app and feature state slices and state facade type definitions
  - [elf state](https://github.com/jamesbrobb/ng-state-management-example/tree/main/libraries/state/elf) - concrete elf specific app config, app/feature providers, state and facade implementation
  - [ngrx state](https://github.com/jamesbrobb/ng-state-management-example/tree/main/libraries/state/ngrx) - concrete ngrx specific app config, app/feature providers, state and facade implementation
  - [ngxs state](https://github.com/jamesbrobb/ng-state-management-example/tree/main/libraries/state/ngxs) - concrete ngxs specific app config, app/feature providers, state and facade implementation
  
2 applications:
  - [home](https://github.com/jamesbrobb/ng-state-management-example/tree/main/projects/home) - a simple page to display the project readme
  - [location-weather](https://github.com/jamesbrobb/ng-state-management-example/tree/main/projects/location-weather) - concrete application implementation
<br/><br/>


## Location weather application.

The application is decoupled from any specific state management solution and implements the following:
- application boostrap uses files listed in `"fileReplacements"` to configure state management solution specific providers, facade tokens and config
- routing and route guards
- state changes/updates driven by navigation/url changes, creating a single logic flow for user interaction and deeplinking
- containers for ui state access and user triggered updates
- State I/O occurs through interfaced Injection Tokens implementing a Facade pattern


## Build.

Each individual build can be created with the following command:

```
ng build location-weather --configuration <solution-name>-prod
```

Where `<solution-name>-prod` is the listed within the projects `build` `configurations` settings in `angular.json`.

Each build configuration specifies the following file replacements:
- `app.config.ts` - the application configuration
- `app.providers.ts` - the application providers
- `weather.providers.ts` - the weather feature providers

```json
{
  "build": {
    "configurations": {
      "<solution-name>-prod": {
        "outputPath": "dist/location-weather/<solution-name>",
        "baseHref": "/<solution-name>/",
        "outputHashing": "all",
        "fileReplacements": [
          {
            "replace": "projects/location-weather/src/app/app.config.ts",
            "with": "projects/location-weather/src/configurations/<solution-name>/app.config.ts"
          },
          {
            "replace": "projects/location-weather/src/app/app.providers.ts",
            "with": "projects/location-weather/src/configurations/<solution-name>/app.providers.ts"
          },
          {
            "replace": "projects/location-weather/src/app/weather/weather.providers.ts",
            "with": "projects/location-weather/src/configurations/<solution-name>/weather.providers.ts"
          }
        ]
      }
    }
  }
}
```
