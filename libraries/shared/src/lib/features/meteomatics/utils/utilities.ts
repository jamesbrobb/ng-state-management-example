

const DIRECTIONS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]

export function degToCompass(val: number) {
  return DIRECTIONS[(Math.floor((val / 22.5) + 0.5) % 16)];
}

export function ISOTimeToTime(val: string): string {
  return new Date(val).toLocaleTimeString('en-GB');
}
