import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// shadcn/ui setup
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

  const whitelistedExchanges = [
    'belo',
    'lemoncash',
    'ripio',
    'buenbit',
    'letsbit',
    'fiwind',
  ]

  // Filter out non whitelisted exchanges
  const filteredExchangeRates = Object.keys(exchangeRates)
    .filter((key) => whitelistedExchanges.includes(key))
    .reduce((obj, key) => {
      obj[key] = exchangeRates[key]
      return obj
    }, {} as ExchangeRates)

  // Loop through each exchange to sum asks and bids
  for (const key in filteredExchangeRates) {
    if (filteredExchangeRates.hasOwnProperty(key)) {
      totalAsk += filteredExchangeRates[key].ask
      totalBid += filteredExchangeRates[key].bid
      count++
    }
  }

  // Calculate averages
  const averageAsk = totalAsk / count
  const averageBid = totalBid / count

  return { ask: averageAsk, bid: averageBid }
}
