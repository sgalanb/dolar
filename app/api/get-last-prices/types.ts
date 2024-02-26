export type PriceType = {
  ask?: number
  bid?: number
  timestamp: Date
}

export interface LastPrices {
  [key: string]: {
    ask?: number
    bid?: number
    timestamp: Date
    today: PriceType[]
  }
}
