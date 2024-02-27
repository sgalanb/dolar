import { LastPrices, PriceType } from '@/app/api/get-last-prices/types'
import { db } from '@/app/db'
import { historicalPrices } from '@/app/db/schema'
import { startToday } from '@/lib/utils'
import { and, asc, desc, eq, gte } from 'drizzle-orm'

export const revalidate = 30

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

    const todayOficial = await db.query.historicalPrices.findMany({
      orderBy: [asc(historicalPrices.timestamp)],
      where: and(
        eq(historicalPrices.type, 'oficial'),
        gte(historicalPrices.timestamp, startToday)
      ),
    })

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

    const todayBlue = await db.query.historicalPrices.findMany({
      orderBy: [asc(historicalPrices.timestamp)],
      where: and(
        eq(historicalPrices.type, 'blue'),
        gte(historicalPrices.timestamp, startToday)
      ),
    })

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

    const todayMep = await db.query.historicalPrices.findMany({
      orderBy: [asc(historicalPrices.timestamp)],
      where: and(
        eq(historicalPrices.type, 'mep'),
        gte(historicalPrices.timestamp, startToday)
      ),
    })

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

    const todayCocos = await db.query.historicalPrices.findMany({
      orderBy: [asc(historicalPrices.timestamp)],
      where: and(
        eq(historicalPrices.type, 'cocos'),
        gte(historicalPrices.timestamp, startToday)
      ),
    })

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

    const todayTarjeta = await db.query.historicalPrices.findMany({
      orderBy: [asc(historicalPrices.timestamp)],
      where: and(
        eq(historicalPrices.type, 'tarjeta'),
        gte(historicalPrices.timestamp, startToday)
      ),
    })

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

    const todayMayorista = await db.query.historicalPrices.findMany({
      orderBy: [asc(historicalPrices.timestamp)],
      where: and(
        eq(historicalPrices.type, 'mayorista'),
        gte(historicalPrices.timestamp, startToday)
      ),
    })

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

    const todayCcl = await db.query.historicalPrices.findMany({
      orderBy: [asc(historicalPrices.timestamp)],
      where: and(
        eq(historicalPrices.type, 'ccl'),
        gte(historicalPrices.timestamp, startToday)
      ),
    })

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

    const todayCripto = await db.query.historicalPrices.findMany({
      orderBy: [asc(historicalPrices.timestamp)],
      where: and(
        eq(historicalPrices.type, 'cripto'),
        gte(historicalPrices.timestamp, startToday)
      ),
    })

    // Return
    const lastPrices: LastPrices = {
      oficial: {
        ...lastOficialPriceObject,
        today:
          todayOficial.length === 0
            ? [lastOficialPriceObject]
            : todayOficial.map((price) => ({
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
            : todayBlue.map((price) => ({
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
            : todayMep.map((price) => ({
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
            : todayCocos.map((price) => ({
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
            : todayTarjeta.map((price) => ({
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
            : todayMayorista.map((price) => ({
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
            : todayCcl.map((price) => ({
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
            : todayCripto.map((price) => ({
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
