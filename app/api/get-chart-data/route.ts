import { ChartPrices } from '@/app/api/get-chart-data/types'
import { PriceType } from '@/app/api/get-last-prices/types'
import { db } from '@/app/db'
import { historicalPrices } from '@/app/db/schema'
import { startDaysAgo } from '@/lib/utils'
import { and, asc, eq, gte } from 'drizzle-orm'
import { NextRequest } from 'next/server'

export const revalidate = 86400

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const type = searchParams.get('type') as any

    const oneWeekQuery = await db.query.historicalPrices.findMany({
      orderBy: [asc(historicalPrices.timestamp)],
      where: and(
        eq(historicalPrices.type, type),
        gte(historicalPrices.timestamp, startDaysAgo(7))
      ),
    })

    const oneMonthQuery = await db.query.historicalPrices.findMany({
      orderBy: [asc(historicalPrices.timestamp)],
      where: and(
        eq(historicalPrices.type, type),
        gte(historicalPrices.timestamp, startDaysAgo(30))
      ),
    })

    const threeMonthsQuery = await db.query.historicalPrices.findMany({
      orderBy: [asc(historicalPrices.timestamp)],
      where: and(
        eq(historicalPrices.type, type),
        gte(historicalPrices.timestamp, startDaysAgo(90))
      ),
    })

    const sixMonthsQuery = await db.query.historicalPrices.findMany({
      orderBy: [asc(historicalPrices.timestamp)],
      where: and(
        eq(historicalPrices.type, type),
        gte(historicalPrices.timestamp, startDaysAgo(180))
      ),
    })

    const oneYearQuery = await db.query.historicalPrices.findMany({
      orderBy: [asc(historicalPrices.timestamp)],
      where: and(
        eq(historicalPrices.type, type),
        gte(historicalPrices.timestamp, startDaysAgo(365))
      ),
    })

    const twoYearsQuery = await db.query.historicalPrices.findMany({
      orderBy: [asc(historicalPrices.timestamp)],
      where: and(
        eq(historicalPrices.type, type),
        gte(historicalPrices.timestamp, startDaysAgo(730))
      ),
    })

    // const fiveYearsQuery = await db.query.historicalPrices.findMany({
    //   orderBy: [asc(historicalPrices.timestamp)],
    //   where: and(
    //     eq(historicalPrices.type, type),
    //     gte(historicalPrices.timestamp, startDaysAgo(1825))
    //   ),
    // })

    // const tenYearsQuery = await db.query.historicalPrices.findMany({
    //   orderBy: [asc(historicalPrices.timestamp)],
    //   where: and(
    //     eq(historicalPrices.type, type),
    //     gte(historicalPrices.timestamp, startDaysAgo(3650))
    //   ),
    // })

    // Use only the first and last prices of each day
    const oneWeekArray = calculateFirstAndLastPricesPerDay(oneWeekQuery)
    const oneMonthArray = calculateFirstAndLastPricesPerDay(oneMonthQuery)
    // Use only the last price of each day
    const threeMonthsArray = calculateLatestPricesPerDay(threeMonthsQuery)
    const sixMonthsArray = calculateLatestPricesPerDay(sixMonthsQuery)
    const oneYearArray = calculateLatestPricesPerDay(oneYearQuery)
    const twoYearsArray = calculateLatestPricesPerDay(twoYearsQuery)
    // const fiveYearsArray = calculateLatestPricesPerDay(fiveYearsQuery)
    // const tenYearsArray = calculateLatestPricesPerDay(tenYearsQuery)

    const chartPrices: ChartPrices = {
      '1s': oneWeekArray,
      '1m': oneMonthArray,
      '3m': threeMonthsArray,
      '6m': sixMonthsArray,
      '1a': oneYearArray,
      '2a': twoYearsArray,
      // '5a': fiveYearsArray,
      // '10a': tenYearsArray,
    }

    return new Response(JSON.stringify(chartPrices), {
      status: 200,
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(error.message, {
        status: 500,
      })
    } else {
      return new Response(`Unknown error occurred: ${error}`, {
        status: 500,
      })
    }
  }
}

function calculateFirstAndLastPricesPerDay(prices: any) {
  const reduce = prices.reduce((acc: any, price: any) => {
    const date = price.timestamp.toDateString()
    if (!acc[date]) {
      acc[date] = [price]
    } else {
      acc[date][1] = price
    }
    return acc
  }, {})

  // Join all the arrays into one
  return Object.values(reduce).reduce(
    (acc: any, current: any) => acc.concat(current),
    []
  ) as PriceType[]
}

function calculateLatestPricesPerDay(prices: any) {
  const reduce = prices.reduce((acc: any, price: any) => {
    const date = price.timestamp.toDateString()
    if (!acc[date] || acc[date].timestamp < price.timestamp) {
      acc[date] = price
    }
    return acc
  }, {})

  // Join all the arrays into one
  return Object.values(reduce).reduce(
    (acc: any, current: any) => acc.concat(current),
    []
  ) as PriceType[]
}
