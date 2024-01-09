
# Angular State Management solution comparison

The project demonstrates the implementation of different state management solutions within a single Angular application.

The following state management solutions are currently implemented:
  - [x] [NgRx](https://ngrx.io/) - app [demo](https://ng-state-management.jamesrobb.work/ngrx/)
  - [x] [NgXs](https://www.ngxs.io/) - app [demo](https://ng-state-management.jamesrobb.work/ngxs/)
  - [x] [Elf](https://github.com/ngneat/elf/)  - app [demo](https://ng-state-management.jamesrobb.work/elf/) - (successor to [Akita](https://github.com/salesforce/akita))


## Build

The project consists of the following:
  - a library (libraries/shared) containing feature and application logic
  - a library (libraries/state) containing
  - a single application (projects/location-weather) with a separate build configuration for each solution.

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

## Location weather application

The application is decoupled from the specific state management solutions and implements the following:
  - application boostrap uses files listed in `"fileReplacements"` to configure state solution specific providers and config
  - routing
  - route guards (for data management and deeplinking)
  - containers for ui state access and updates
  - State I/O occurs through interfaced Injection Tokens implementing a Repository/Facade pattern
