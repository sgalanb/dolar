export type ChartPrices = {
  [key in '10a' | '5a' | '2a' | '1a' | '6m' | '3m' | '1m' | '1s']: {
    ask?: number
    bid?: number
    timestamp: Date
  }[]
}
