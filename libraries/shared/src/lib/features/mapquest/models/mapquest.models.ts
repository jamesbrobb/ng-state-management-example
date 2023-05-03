
export type MapLocation = {
  id: string
  displayString: string
  name: string
  recordType: string
  slug: string
  place: {
    geometry: {
      coordinates: [number, number]
      type: string
    },
    properties: {
      type: string
      city: string
      county?: string
      state?: string
      stateCode?: string
      country: string
      countryCode: string
    }
  }
}

export type MapLocationSummary = {
  type: string
  name: string
  city: string
  country: string
  countryCode: string
  lat: number
  long: number
  slug: string
}
