import {
  CocosMEPResponse,
  CriptoYaResponse,
} from '@/app/api/update-prices/types'
import { db } from '@/app/db'
import { historicalPrices } from '@/app/db/schema'
import { desc, eq } from 'drizzle-orm'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

// This endpoint runs every minute with a Vercel cron job
export async function GET(request: NextRequest) {
  // Only allow Vercel to access this endpoint
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response(`Not authorized.`, {
      status: 500,
    })
  }

  async function getCocosMEP() {
    const res = await fetch(
      'https://api.cocos.capital/api/v1/public/mep-prices'
    )
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json() as Promise<CocosMEPResponse>
  }

  async function getCriptoYa() {
    const res = await fetch('https://criptoya.com/api/dolar')
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json() as Promise<CriptoYaResponse>
  }

  try {
    const criptoYaRates = await getCriptoYa()
    const cocosMEPRates = await getCocosMEP()

    // Always use AL30 and 24hs rates
    // Cripto rates are always from USDC
    const newOficialAsk = criptoYaRates.oficial.price.toString()
    const newOficialBid = criptoYaRates.oficial.price.toString()
    const newBlueAsk = criptoYaRates.blue.ask.toString()
    const newBlueBid = criptoYaRates.blue.bid.toString()
    const newMepAsk = criptoYaRates.mep.al30['24hs'].price.toString()
    const newMepBid = criptoYaRates.mep.al30['24hs'].price.toString()
    const newCocosAsk = cocosMEPRates.overnight.ask.toString()
    const newCocosBid = cocosMEPRates.overnight.bid.toString()
    const newTarjetaAsk = criptoYaRates.tarjeta.price.toString()
    const newTarjetaBid = criptoYaRates.tarjeta.price.toString()
    const newMayoristaAsk = criptoYaRates.mayorista.price.toString()
    const newMayoristaBid = criptoYaRates.mayorista.price.toString()
    const newCclAsk = criptoYaRates.ccl.al30['24hs'].price.toString()
    const newCclBid = criptoYaRates.ccl.al30['24hs'].price.toString()
    const newCriptoAsk = criptoYaRates.cripto.usdc.ask.toString()
    const newCriptoBid = criptoYaRates.cripto.usdc.bid.toString()

    const lastOficial = await db.query.historicalPrices.findFirst({
      orderBy: [desc(historicalPrices.timestamp)],
      where: eq(historicalPrices.type, 'oficial'),
    })
    const lastBlue = await db.query.historicalPrices.findFirst({
      orderBy: [desc(historicalPrices.timestamp)],
      where: eq(historicalPrices.type, 'blue'),
    })
    const lastMep = await db.query.historicalPrices.findFirst({
      orderBy: [desc(historicalPrices.timestamp)],
      where: eq(historicalPrices.type, 'mep'),
    })
    const lastCocos = await db.query.historicalPrices.findFirst({
      orderBy: [desc(historicalPrices.timestamp)],
      where: eq(historicalPrices.type, 'cocos'),
    })
    const lastTarjeta = await db.query.historicalPrices.findFirst({
      orderBy: [desc(historicalPrices.timestamp)],
      where: eq(historicalPrices.type, 'tarjeta'),
    })
    const lastMayorista = await db.query.historicalPrices.findFirst({
      orderBy: [desc(historicalPrices.timestamp)],
      where: eq(historicalPrices.type, 'mayorista'),
    })
    const lastCcl = await db.query.historicalPrices.findFirst({
      orderBy: [desc(historicalPrices.timestamp)],
      where: eq(historicalPrices.type, 'ccl'),
    })
    const lastCripto = await db.query.historicalPrices.findFirst({
      orderBy: [desc(historicalPrices.timestamp)],
      where: eq(historicalPrices.type, 'cripto'),
    })

    if (
      newOficialAsk !== lastOficial?.ask ||
      newOficialBid !== lastOficial?.bid
    ) {
      await db.insert(historicalPrices).values({
        type: 'oficial',
        ask: newOficialAsk,
        bid: newOficialBid,
      })
    }

    if (newBlueAsk !== lastBlue?.ask || newBlueBid !== lastBlue?.bid) {
      await db.insert(historicalPrices).values({
        type: 'blue',
        ask: newBlueAsk,
        bid: newBlueBid,
      })
    }

    if (newMepAsk !== lastMep?.ask || newMepBid !== lastMep?.bid) {
      await db.insert(historicalPrices).values({
        type: 'mep',
        ask: newMepAsk,
        bid: newMepBid,
      })
    }

    if (newCocosAsk !== lastCocos?.ask || newCocosBid !== lastCocos?.bid) {
      await db.insert(historicalPrices).values({
        type: 'cocos',
        ask: newCocosAsk,
        bid: newCocosBid,
      })
    }

    if (
      newTarjetaAsk !== lastTarjeta?.ask ||
      newTarjetaBid !== lastTarjeta?.bid
    ) {
      await db.insert(historicalPrices).values({
        type: 'tarjeta',
        ask: newTarjetaAsk,
        bid: newTarjetaBid,
      })
    }

    if (
      newMayoristaAsk !== lastMayorista?.ask ||
      newMayoristaBid !== lastMayorista?.bid
    ) {
      await db.insert(historicalPrices).values({
        type: 'mayorista',
        ask: newMayoristaAsk,
        bid: newMayoristaBid,
      })
    }

    if (newCclAsk !== lastCcl?.ask || newCclBid !== lastCcl?.bid) {
      await db.insert(historicalPrices).values({
        type: 'ccl',
        ask: newCclAsk,
        bid: newCclBid,
      })
    }

    if (newCriptoAsk !== lastCripto?.ask || newCriptoBid !== lastCripto?.bid) {
      await db.insert(historicalPrices).values({
        type: 'cripto',
        ask: newCriptoAsk,
        bid: newCriptoBid,
      })
    }

    return new Response('Prices updated', {
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
