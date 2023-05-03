import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {MapquestService, MAPQUEST_REPOSITORY, MapLocation, doesLocationMatchPath} from "@jbr/shared";
import {inject} from "@angular/core";
import {filter, find, from, iif, map, of, switchMap, tap} from "rxjs";


export const locationResolve: ResolveFn<MapLocation | null> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const mapquest = inject(MAPQUEST_REPOSITORY);
    const service = inject(MapquestService)

    const slug = route.url.map((frag) => frag.path)

    return mapquest.getLocationBySlug(slug)
      .pipe(
        switchMap(loc =>
          iif(
            () => !!loc,
            of(loc as MapLocation).pipe(
              tap((loc) => mapquest.setActiveLocation(loc))
            ),
            of(loc).pipe(
              switchMap(() => {
                return service.search(slug[slug.length - 1])
                  .pipe(
                    switchMap((locations) => from(locations).pipe(
                      find(loc => doesLocationMatchPath(loc, slug)),
                      switchMap(loc => iif(
                        () => !!loc,
                        of(loc as MapLocation).pipe(
                          tap((loc) => {
                            mapquest.addLocation(loc);
                            mapquest.setActiveLocation(loc);
                          })
                        ),
                        of(null)
                      )
                      )
                    ))
                  )
              })
            )
          )
        )
      );
}

