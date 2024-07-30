import { LastPrices, PriceType } from '@/app/api/get-last-prices/types'
import { db } from '@/app/db'
import { historicalPrices } from '@/app/db/schema'
import { startDaysAgo, startToday } from '@/lib/utils'
import { and, asc, desc, eq, gte, lte } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'

export async function GET() {
  try {
    // Oficial
    const lastOficial = await db.query.historicalPrices.findFirst({
      orderBy: [desc(historicalPrices.timestamp)],
      where: eq(historicalPrices.type, 'oficial'),
    })

    const lastOficialPriceObject: PriceType = {
      ask: parseFloat(lastOficial?.ask ?? ''),
      bid: parseFloat(lastOficial?.bid ?? ''),
      timestamp: lastOficial?.timestamp ?? new Date(),
    }

    const todayOficialQuery = unstable_cache(
      async () => {
        const yesterday = await db.query.historicalPrices.findMany({
          orderBy: [asc(historicalPrices.timestamp)],
          where: and(
            eq(historicalPrices.type, 'oficial'),
            gte(historicalPrices.timestamp, startDaysAgo(1)),
            lte(historicalPrices.timestamp, startToday)
          ),
        })
        const today = await db.query.historicalPrices.findMany({
          orderBy: [asc(historicalPrices.timestamp)],
          where: and(
            eq(historicalPrices.type, 'oficial'),
            gte(historicalPrices.timestamp, startToday)
          ),
        })
        return [...yesterday.slice(-1), ...today]
      },
      ['todayOficial'],
      {
        revalidate: 60,
      }
    )
    const todayOficial = await todayOficialQuery()

    // Blue
    const lastBlue = await db.query.historicalPrices.findFirst({
      orderBy: [desc(historicalPrices.timestamp)],
      where: eq(historicalPrices.type, 'blue'),
    })

    const lastBluePriceObject: PriceType = {
      ask: parseFloat(lastBlue?.ask ?? ''),
      bid: parseFloat(lastBlue?.bid ?? ''),
      timestamp: lastBlue?.timestamp ?? new Date(),
    }

    const todayBlueQuery = unstable_cache(
      async () => {
        const yesterday = await db.query.historicalPrices.findMany({
          orderBy: [asc(historicalPrices.timestamp)],
          where: and(
            eq(historicalPrices.type, 'blue'),
            gte(historicalPrices.timestamp, startDaysAgo(1)),
            lte(historicalPrices.timestamp, startToday)
          ),
        })
        const today = await db.query.historicalPrices.findMany({
          orderBy: [asc(historicalPrices.timestamp)],
          where: and(
            eq(historicalPrices.type, 'blue'),
            gte(historicalPrices.timestamp, startToday)
          ),
        })
        return [...yesterday.slice(-1), ...today]
      },
      ['todayBlue'],
      {
        revalidate: 60,
      }
    )
    const todayBlue = await todayBlueQuery()

    // Mep
    const lastMep = await db.query.historicalPrices.findFirst({
      orderBy: [desc(historicalPrices.timestamp)],
      where: eq(historicalPrices.type, 'mep'),
    })

    const lastMepPriceObject: PriceType = {
      ask: parseFloat(lastMep?.ask ?? ''),
      bid: parseFloat(lastMep?.bid ?? ''),
      timestamp: lastMep?.timestamp ?? new Date(),
    }

    const todayMepQuery = unstable_cache(
      async () => {
        const yesterday = await db.query.historicalPrices.findMany({
          orderBy: [asc(historicalPrices.timestamp)],
          where: and(
            eq(historicalPrices.type, 'mep'),
            gte(historicalPrices.timestamp, startDaysAgo(1)),
            lte(historicalPrices.timestamp, startToday)
          ),
        })
        const today = await db.query.historicalPrices.findMany({
          orderBy: [asc(historicalPrices.timestamp)],
          where: and(
            eq(historicalPrices.type, 'mep'),
            gte(historicalPrices.timestamp, startToday)
          ),
        })
        return calculateOnePricePerHalfHour([...yesterday.slice(-1), ...today])
      },
      ['todayMep'],
      {
        revalidate: 60,
      }
    )
    const todayMep = await todayMepQuery()
    const cleanMep = [...todayMep, lastMep]

    // Cocos
    const lastCocos = await db.query.historicalPrices.findFirst({
      orderBy: [desc(historicalPrices.timestamp)],
      where: eq(historicalPrices.type, 'cocos'),
    })

    const lastCocosPriceObject: PriceType = {
      ask: parseFloat(lastCocos?.ask ?? ''),
      bid: parseFloat(lastCocos?.bid ?? ''),
      timestamp: lastCocos?.timestamp ?? new Date(),
    }

    const todayCocosQuery = unstable_cache(
      async () => {
        const yesterday = await db.query.historicalPrices.findMany({
          orderBy: [asc(historicalPrices.timestamp)],
          where: and(
            eq(historicalPrices.type, 'cocos'),
            gte(historicalPrices.timestamp, startDaysAgo(1)),
            lte(historicalPrices.timestamp, startToday)
          ),
        })
        const today = await db.query.historicalPrices.findMany({
          orderBy: [asc(historicalPrices.timestamp)],
          where: and(
            eq(historicalPrices.type, 'cocos'),
            gte(historicalPrices.timestamp, startToday)
          ),
        })
        return [...yesterday.slice(-1), ...today]
      },
      ['todayCocos'],
      {
        revalidate: 60,
      }
    )
    const todayCocos = await todayCocosQuery()

    // Tarjeta
    const lastTarjeta = await db.query.historicalPrices.findFirst({
      orderBy: [desc(historicalPrices.timestamp)],
      where: eq(historicalPrices.type, 'tarjeta'),
    })

    const lastTarjetaPriceObject: PriceType = {
      ask: parseFloat(lastTarjeta?.ask ?? ''),
      bid: parseFloat(lastTarjeta?.bid ?? ''),
      timestamp: lastTarjeta?.timestamp ?? new Date(),
    }

    const todayTarjetaQuery = unstable_cache(
      async () => {
        const yesterday = await db.query.historicalPrices.findMany({
          orderBy: [asc(historicalPrices.timestamp)],
          where: and(
            eq(historicalPrices.type, 'tarjeta'),
            gte(historicalPrices.timestamp, startDaysAgo(1)),
            lte(historicalPrices.timestamp, startToday)
          ),
        })
        const today = await db.query.historicalPrices.findMany({
          orderBy: [asc(historicalPrices.timestamp)],
          where: and(
            eq(historicalPrices.type, 'tarjeta'),
            gte(historicalPrices.timestamp, startToday)
          ),
        })
        return [...yesterday.slice(-1), ...today]
      },
      ['todayTarjeta'],
      {
        revalidate: 60,
      }
    )
    const todayTarjeta = await todayTarjetaQuery()

    // Mayorista
    const lastMayorista = await db.query.historicalPrices.findFirst({
      orderBy: [desc(historicalPrices.timestamp)],
      where: eq(historicalPrices.type, 'mayorista'),
    })

    const lastMayoristaPriceObject: PriceType = {
      ask: parseFloat(lastMayorista?.ask ?? ''),
      bid: parseFloat(lastMayorista?.bid ?? ''),
      timestamp: lastMayorista?.timestamp ?? new Date(),
    }

    const todayMayoristaQuery = unstable_cache(
      async () => {
        const yesterday = await db.query.historicalPrices.findMany({
          orderBy: [asc(historicalPrices.timestamp)],
          where: and(
            eq(historicalPrices.type, 'mayorista'),
            gte(historicalPrices.timestamp, startDaysAgo(1)),
            lte(historicalPrices.timestamp, startToday)
          ),
        })
        const today = await db.query.historicalPrices.findMany({
          orderBy: [asc(historicalPrices.timestamp)],
          where: and(
            eq(historicalPrices.type, 'mayorista'),
            gte(historicalPrices.timestamp, startToday)
          ),
        })
        return [...yesterday.slice(-1), ...today]
      },
      ['todayMayorista'],
      {
        revalidate: 60,
      }
    )
    const todayMayorista = await todayMayoristaQuery()

    // CCL
    const lastCcl = await db.query.historicalPrices.findFirst({
      orderBy: [desc(historicalPrices.timestamp)],
      where: eq(historicalPrices.type, 'ccl'),
    })

    const lastCclPriceObject: PriceType = {
      ask: parseFloat(lastCcl?.ask ?? ''),
      bid: parseFloat(lastCcl?.bid ?? ''),
      timestamp: lastCcl?.timestamp ?? new Date(),
    }

    const todayCclQuery = unstable_cache(
      async () => {
        const yesterday = await db.query.historicalPrices.findMany({
          orderBy: [asc(historicalPrices.timestamp)],
          where: and(
            eq(historicalPrices.type, 'ccl'),
            gte(historicalPrices.timestamp, startDaysAgo(1)),
            lte(historicalPrices.timestamp, startToday)
          ),
        })
        const today = await db.query.historicalPrices.findMany({
          orderBy: [asc(historicalPrices.timestamp)],
          where: and(
            eq(historicalPrices.type, 'ccl'),
            gte(historicalPrices.timestamp, startToday)
          ),
        })

        return calculateOnePricePerHalfHour([...yesterday.slice(-1), ...today])
      },
      ['todayCcl'],
      {
        revalidate: 60,
      }
    )
    const todayCcl = await todayCclQuery()
    const cleanCcl = [...todayCcl, lastCcl]

    // Cripto
    const lastCripto = await db.query.historicalPrices.findFirst({
      orderBy: [desc(historicalPrices.timestamp)],
      where: eq(historicalPrices.type, 'cripto'),
    })

    const lastCriptoPriceObject: PriceType = {
      ask: parseFloat(lastCripto?.ask ?? ''),
      bid: parseFloat(lastCripto?.bid ?? ''),
      timestamp: lastCripto?.timestamp ?? new Date(),
    }

    const todayCriptoQuery = unstable_cache(
      async () => {
        const yesterday = await db.query.historicalPrices.findMany({
          orderBy: [asc(historicalPrices.timestamp)],
          where: and(
            eq(historicalPrices.type, 'cripto'),
            gte(historicalPrices.timestamp, startDaysAgo(1)),
            lte(historicalPrices.timestamp, startToday)
          ),
        })
        const today = await db.query.historicalPrices.findMany({
          orderBy: [asc(historicalPrices.timestamp)],
          where: and(
            eq(historicalPrices.type, 'cripto'),
            gte(historicalPrices.timestamp, startToday)
          ),
        })

        return calculateOnePricePerHalfHour([...yesterday.slice(-1), ...today])
      },
      ['todayCripto'],
      {
        revalidate: 60,
      }
    )
    const todayCripto = await todayCriptoQuery()
    const cleanCripto = [...todayCripto, lastCripto]

    // Return
    const lastPrices: LastPrices = {
      oficial: {
        ...lastOficialPriceObject,
        today:
          todayOficial.length === 0
            ? [lastOficialPriceObject]
            : todayOficial.map((price: any) => ({
                ask: parseFloat(price?.ask ?? ''),
                bid: parseFloat(price?.bid ?? ''),
                timestamp: price.timestamp,
              })),
      },
      blue: {
        ...lastBluePriceObject,
        today:
          todayBlue.length === 0
            ? [lastBluePriceObject]
            : todayBlue.map((price: any) => ({
                ask: parseFloat(price?.ask ?? ''),
                bid: parseFloat(price?.bid ?? ''),
                timestamp: price.timestamp,
              })),
      },
      mep: {
        ...lastMepPriceObject,
        today:
          todayMep.length === 0
            ? [lastMepPriceObject]
            : cleanMep.map((price: any) => ({
                ask: parseFloat(price?.ask ?? ''),
                bid: parseFloat(price?.bid ?? ''),
                timestamp: price.timestamp,
              })),
      },
      cocos: {
        ...lastCocosPriceObject,
        today:
          todayCocos.length === 0
            ? [lastCocosPriceObject]
            : todayCocos.map((price: any) => ({
                ask: parseFloat(price?.ask ?? ''),
                bid: parseFloat(price?.bid ?? ''),
                timestamp: price.timestamp,
              })),
      },
      tarjeta: {
        ...lastTarjetaPriceObject,
        today:
          todayTarjeta.length === 0
            ? [lastTarjetaPriceObject]
            : todayTarjeta.map((price: any) => ({
                ask: parseFloat(price?.ask ?? ''),
                bid: parseFloat(price?.bid ?? ''),
                timestamp: price.timestamp,
              })),
      },
      mayorista: {
        ...lastMayoristaPriceObject,
        today:
          todayMayorista.length === 0
            ? [lastMayoristaPriceObject]
            : todayMayorista.map((price: any) => ({
                ask: parseFloat(price?.ask ?? ''),
                bid: parseFloat(price?.bid ?? ''),
                timestamp: price.timestamp,
              })),
      },
      ccl: {
        ...lastCclPriceObject,
        today:
          todayCcl.length === 0
            ? [lastCclPriceObject]
            : cleanCcl.map((price: any) => ({
                ask: parseFloat(price?.ask ?? ''),
                bid: parseFloat(price?.bid ?? ''),
                timestamp: price.timestamp,
              })),
      },
      cripto: {
        ...lastCriptoPriceObject,
        today:
          todayCripto.length === 0
            ? [lastCriptoPriceObject]
            : cleanCripto.map((price: any) => ({
                ask: parseFloat(price?.ask ?? ''),
                bid: parseFloat(price?.bid ?? ''),
                timestamp: price.timestamp,
              })),
      },
    }

    return new Response(JSON.stringify(lastPrices), {
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

function calculateOnePricePerHalfHour(prices: any) {
  const reduce = prices.reduce((acc: any, price: any) => {
    const dateString = new Date(price.timestamp).toDateString()
    const date = new Date(price.timestamp)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const halfHour = Math.floor(minutes / 30)
    const key = `${dateString}-${hours}-${halfHour}`

    if (!acc[key]) {
      acc[key] = price
    }
    return acc
  }, {})

  // Join all the arrays into one
  return Object.values(reduce).reduce(
    (acc: any, current: any) => acc.concat(current),
    []
  ) as PriceType[]
}
