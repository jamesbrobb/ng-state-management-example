import {MapLocation} from "../models/mapquest.models";


export const getUrlFragsForLocation = (location: MapLocation): string[] => {
  const frags = location.slug.slice(location.slug.startsWith('/') ? 1 : 0).split('/');

  if(frags[frags.length - 1].length <= 2) {
    frags.push(
      location.name.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase()
    )
  }

  return frags
}

export const doesLocationMatchPath = (location: MapLocation, frags: string | string[]): boolean => {

  const path = typeof frags === 'string' ? frags : `${frags.join('/')}`,
    locPath = getUrlFragsForLocation(location).join('/');

  return path === locPath;
}
