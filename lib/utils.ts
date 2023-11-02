import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Average crypto dolar ask and bid
interface ExchangeData {
  ask: number
  bid: number
}

interface ExchangeRates {
  [key: string]: ExchangeData
}

export function calculateAverageCryptoDolarPrices(
  exchangeRates: ExchangeRates
): {
  ask: number
  bid: number
} {
  let totalAsk = 0
  let totalBid = 0
  let count = 0

  // Loop through each exchange to sum asks and bids
  for (const key in exchangeRates) {
    if (exchangeRates.hasOwnProperty(key)) {
      totalAsk += exchangeRates[key].ask
      totalBid += exchangeRates[key].bid
      count++
    }
  }

  // Calculate averages
  const averageAsk = totalAsk / count
  const averageBid = totalBid / count

  return { ask: averageAsk, bid: averageBid }
}
