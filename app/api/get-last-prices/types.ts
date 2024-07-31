export type PriceType = {
  ask?: number
  bid?: number
  timestamp: Date
}

export interface LastPrices {
  [key: string]: {
    ask?: number | null
    bid?: number | null
    timestamp?: string | null
    today: number[]
  }
}
