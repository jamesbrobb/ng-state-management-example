import {Route, UrlSegment, UrlSegmentGroup} from "@angular/router";

export const locationMatcher = (segments: UrlSegment[], group: UrlSegmentGroup, route: Route) => {

  if(!segments.length) {
    return null;
  }

  let matchedChild = false

  segments = segments
    .filter(seg => !!seg.path)
    .filter(seg => {
      if(matchedChild) {
        return false;
      }

      if(!route.children) {
        return true;
      }

      matchedChild = !!route.children.find((child) => child.path === seg.path);

      return !matchedChild;
    });

  if(segments.length > 0) {
    return {
      consumed: segments
    }
  }

  return null;
}
