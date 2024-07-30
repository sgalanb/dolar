import {
  CocosMEPResponse,
  CriptoYaResponse,
} from '@/app/api/update-prices/types'
import { createClient } from '@/utils/supabase/server'
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

  const supabase = createClient()

  try {
    const criptoYaRates = await getCriptoYa()
    const cocosMEPRates = await getCocosMEP()

    // Always use AL30 and 24hs rates
    // Cripto rates are always from USDC
    const newOficialAsk = criptoYaRates.oficial.price
    const newOficialBid = criptoYaRates.oficial.price
    const newBlueAsk = criptoYaRates.blue.ask
    const newBlueBid = criptoYaRates.blue.bid
    const newMepAsk = criptoYaRates.mep.al30['24hs'].price
    const newMepBid = criptoYaRates.mep.al30['24hs'].price
    const newCocosAsk = cocosMEPRates.overnight.ask
    const newCocosBid = cocosMEPRates.overnight.bid
    const newTarjetaAsk = criptoYaRates.tarjeta.price
    const newTarjetaBid = criptoYaRates.tarjeta.price
    const newMayoristaAsk = criptoYaRates.mayorista.price
    const newMayoristaBid = criptoYaRates.mayorista.price
    const newCclAsk = criptoYaRates.ccl.al30['24hs'].price
    const newCclBid = criptoYaRates.ccl.al30['24hs'].price
    const newCriptoAsk = criptoYaRates.cripto.usdc.ask
    const newCriptoBid = criptoYaRates.cripto.usdc.bid

    async function getLastPrice(type: string) {
      const query = await supabase
        .from('historical-prices')
        .select('ask, bid')
        .eq('type', type)
        .order('timestamp', { ascending: false })
        .single()
      return query.data
    }

    const lastOficial = await getLastPrice('oficial')
    const lastBlue = await getLastPrice('blue')
    const lastMep = await getLastPrice('mep')
    const lastCocos = await getLastPrice('cocos')
    const lastTarjeta = await getLastPrice('tarjeta')
    const lastMayorista = await getLastPrice('mayorista')
    const lastCcl = await getLastPrice('ccl')
    const lastCripto = await getLastPrice('cripto')

    if (
      newOficialAsk !== lastOficial?.ask ||
      newOficialBid !== lastOficial?.bid
    ) {
      await supabase.from('historical-prices').insert({
        type: 'oficial',
        ask: newOficialAsk,
        bid: newOficialBid,
      })
    }

    if (newBlueAsk !== lastBlue?.ask || newBlueBid !== lastBlue?.bid) {
      await supabase.from('historical-prices').insert({
        type: 'blue',
        ask: newBlueAsk,
        bid: newBlueBid,
      })
    }

    if (newMepAsk !== lastMep?.ask || newMepBid !== lastMep?.bid) {
      await supabase
        .from('historical-prices')
        .insert({ type: 'mep', ask: newMepAsk, bid: newMepBid })
    }

    if (newCocosAsk !== lastCocos?.ask || newCocosBid !== lastCocos?.bid) {
      await supabase.from('historical-prices').insert({
        type: 'cocos',
        ask: newCocosAsk,
        bid: newCocosBid,
      })
    }

    if (
      newTarjetaAsk !== lastTarjeta?.ask ||
      newTarjetaBid !== lastTarjeta?.bid
    ) {
      await supabase
        .from('historical-prices')
        .insert({ type: 'tarjeta', ask: newTarjetaAsk, bid: newTarjetaBid })
    }

    if (
      newMayoristaAsk !== lastMayorista?.ask ||
      newMayoristaBid !== lastMayorista?.bid
    ) {
      await supabase
        .from('historical-prices')
        .insert({
          type: 'mayorista',
          ask: newMayoristaAsk,
          bid: newMayoristaBid,
        })
    }

    if (newCclAsk !== lastCcl?.ask || newCclBid !== lastCcl?.bid) {
      await supabase
        .from('historical-prices')
        .insert({ type: 'ccl', ask: newCclAsk, bid: newCclBid })
    }

    if (newCriptoAsk !== lastCripto?.ask || newCriptoBid !== lastCripto?.bid) {
      await supabase.from('historical-prices').insert({
        type: 'cripto',
        ask: newCriptoAsk,
        bid: newCriptoBid,
      })
    }

    return new Response('Updated prices.', {
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

async function getCocosMEP() {
  const res = await fetch(
    'https://api.cocos.capital/api/v1/public/mep-prices',
    {
      cache: 'no-store',
    }
  )
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json() as Promise<CocosMEPResponse>
}

async function getCriptoYa() {
  const res = await fetch('https://criptoya.com/api/dolar', {
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json() as Promise<CriptoYaResponse>
}
