import { calculateAverageCryptoDolarPrices } from '@/lib/utils'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

export interface dolar {
  oficial: {
    ask: number
    bid: number
  }
  solidario: number
  blue: {
    ask: number
    bid: number
  }
  mep: number
  cocos: {
    ask: number
    bid: number
  }
  ccl: number
  cripto: {
    ask: number
    bid: number
  }
}

export async function GET() {
  try {
    const dolarBNA = await getDolarBNA()
    const otherDolars = await getOtherDolars()
    const dolarCocos = await getDolarCocos()
    const dolarCrypto = await getDolarCrypto()
    const test = await endpointsTestUsage()

    const dolar = await kv.set('dolar', {
      oficial: dolarBNA, // ask & bid
      solidario: otherDolars.solidario, // single value
      blue: {
        // ask & bid
        ask: otherDolars.blue,
        bid: otherDolars.blue_bid,
      },
      mep: otherDolars.mep, // single value
      cocos: dolarCocos, // ask & bid
      ccl: otherDolars.ccl, // single value
      cripto: dolarCrypto, // ask & bid
    })

    return new Response('SUCCESS', {
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

async function getDolarBNA() {
  const res = await fetch('https://criptoya.com/api/bna')

  // test this in prod
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

async function getDolarCocos() {
  const res = await fetch('https://api.cocos.capital/api/v1/public/dolar-mep')

  // test this in prod
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

async function getDolarCrypto() {
  const res = await fetch('https://criptoya.com/api/usdc/ars/0.1')

  // test this in prod
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = res.json()

  return calculateAverageCryptoDolarPrices(await data)
}

async function getOtherDolars() {
  const res = await fetch('https://criptoya.com/api/dolar')

  // test this in prod
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

async function endpointsTestUsage() {
  const res = await fetch('https://www.pretzeldiary.com/api/counter-endpoint')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return
}
