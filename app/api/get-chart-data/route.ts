import { ChartPrices } from '@/app/api/get-chart-data/types'
import { PriceType } from '@/app/api/get-last-prices/types'
import { db } from '@/app/db'
import { historicalPrices } from '@/app/db/schema'
import { startDaysAgo } from '@/lib/utils'
import { and, asc, eq, gte } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const type = req.nextUrl.searchParams.get('type') as any

    const oneWeekQuery = unstable_cache(
      async () => {
        const query = await db.query.historicalPrices.findMany({
          orderBy: [asc(historicalPrices.timestamp)],
          where: and(
            eq(historicalPrices.type, type),
            gte(historicalPrices.timestamp, startDaysAgo(7))
          ),
        })
        return calculateFirstAndLastPricesPerDay(query)
      },
      [`oneWeek ${type}`],
      {
        revalidate: 60,
      }
    )

    const oneMonthQuery = unstable_cache(
      async () => {
        const query = await db.query.historicalPrices.findMany({
          orderBy: [asc(historicalPrices.timestamp)],
          where: and(
            eq(historicalPrices.type, type),
            gte(historicalPrices.timestamp, startDaysAgo(30))
          ),
        })
        return calculateFirstAndLastPricesPerDay(query)
      },
      [`oneMonth ${type}`],
      {
        revalidate: 60,
      }
    )

    const threeMonthsQuery = unstable_cache(
      async () => {
        const query = await db.query.historicalPrices.findMany({
          orderBy: [asc(historicalPrices.timestamp)],
          where: and(
            eq(historicalPrices.type, type),
            gte(historicalPrices.timestamp, startDaysAgo(90))
          ),
        })
        return calculateLatestPricesPerDay(query)
      },
      [`threeMonths ${type}`],
      {
        revalidate: 3600,
      }
    )

    const sixMonthsQuery = unstable_cache(
      async () => {
        const query = await db.query.historicalPrices.findMany({
          orderBy: [asc(historicalPrices.timestamp)],
          where: and(
            eq(historicalPrices.type, type),
            gte(historicalPrices.timestamp, startDaysAgo(180))
          ),
        })
        return calculateLatestPricesPerDay(query)
      },
      [`sixMonths ${type}`],
      {
        revalidate: 3600,
      }
    )

    const oneYearQuery = unstable_cache(
      async () => {
        const query = await db.query.historicalPrices.findMany({
          orderBy: [asc(historicalPrices.timestamp)],
          where: and(
            eq(historicalPrices.type, type),
            gte(historicalPrices.timestamp, startDaysAgo(365))
          ),
        })
        return calculateLatestPricesPerDay(query)
      },
      [`oneYear ${type}`],
      {
        revalidate: 3600,
      }
    )

    const twoYearsQuery = unstable_cache(
      async () => {
        const query = await db.query.historicalPrices.findMany({
          orderBy: [asc(historicalPrices.timestamp)],
          where: and(
            eq(historicalPrices.type, type),
            gte(historicalPrices.timestamp, startDaysAgo(730))
          ),
        })
        return calculateLatestPricesPerDay(query)
      },
      [`twoYears ${type}`],
      {
        revalidate: 3600,
      }
    )

    const fiveYearsQuery = unstable_cache(
      async () => {
        const query = await db.query.historicalPrices.findMany({
          orderBy: [asc(historicalPrices.timestamp)],
          where: and(
            eq(historicalPrices.type, type),
            gte(historicalPrices.timestamp, startDaysAgo(1825))
          ),
        })
        return calculateLatestPricesPerDay(query)
      },
      [`fiveYears ${type}`],
      {
        revalidate: 86400,
      }
    )

    const tenYearsQuery = unstable_cache(
      async () => {
        const query = await db.query.historicalPrices.findMany({
          orderBy: [asc(historicalPrices.timestamp)],
          where: and(
            eq(historicalPrices.type, type),
            gte(historicalPrices.timestamp, startDaysAgo(3650))
          ),
        })
        return calculateLatestPricesPerDay(query)
      },
      [`tenYears ${type}`],
      {
        revalidate: 86400,
      }
    )

    const oneWeekArray = await oneWeekQuery()
    const oneMonthArray = await oneMonthQuery()
    const threeMonthsArray = await threeMonthsQuery()
    const sixMonthsArray = await sixMonthsQuery()
    const oneYearArray = await oneYearQuery()
    const twoYearsArray = await twoYearsQuery()
    const fiveYearsArray = await fiveYearsQuery()
    const tenYearsArray = await tenYearsQuery()

    const chartPrices: ChartPrices = {
      '1s': oneWeekArray,
      '1m': oneMonthArray,
      '3m': threeMonthsArray,
      '6m': sixMonthsArray,
      '1a': oneYearArray,
      '2a': twoYearsArray,
      '5a': fiveYearsArray,
      '10a': tenYearsArray,
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
    const date = new Date(price.timestamp).toDateString()
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
    const date = new Date(price.timestamp).toDateString()
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
