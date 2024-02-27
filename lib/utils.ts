import { clsx, type ClassValue } from 'clsx'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { twMerge } from 'tailwind-merge'
dayjs.extend(utc)

// shadcn/ui setup
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Get today's date at 00:00:00 in UTC -3
export const startToday = dayjs().utcOffset(-3).startOf('day').toDate()

// Get today's date - X days at 00:00:00 in UTC -3
export const startDaysAgo = (days: number) =>
  dayjs().utcOffset(-3).subtract(days, 'day').startOf('day').toDate()

// Standard fetcher for SWR
interface SWRError extends Error {
  status: number
}
export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)

  if (!res.ok) {
    const error = await res.text()
    const err = new Error(error) as SWRError
    err.status = res.status
    throw err
  }

  return res.json()
}

// Get the percentage change between the first and last element of an array
export const getPercentageChange = (chartPricesArray: any[]) => {
  return (
    ((chartPricesArray[chartPricesArray.length - 1] - chartPricesArray[0]) /
      chartPricesArray[0]) *
    100
  )
}
