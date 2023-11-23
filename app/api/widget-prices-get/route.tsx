import admin from '@/lib/firebase-setup/firebaseAdmin'
import { calculateAverageCryptoDolarPrices } from '@/lib/utils'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type')

  try {
    const db = admin.firestore()

    // Last DB prices
    const lastPrices = (
      await db.collection('prices').doc('last-prices').get()
    ).data()

    if (!lastPrices || !type) {
      throw new Error('Failed to fetch data')
    }

    const selectedType = lastPrices[type]

    const todayPrices = selectedType.today
      ? selectedType.today.map((today: any) => ({
          value: today?.ask?.toFixed(2),
          date: today.timestamp.seconds,
        }))
      : []

    const chartPrices = [
      ...todayPrices,
      {
        value: selectedType?.ask?.toFixed(2),
        date: selectedType.timestamp.seconds,
      },
    ]

    const porcentualChange =
      ((chartPrices[chartPrices.length - 1]?.value - chartPrices[0]?.value) /
        chartPrices[0].value) *
      100

    const returnData = {
      ask: selectedType?.ask?.toFixed(2),
      bid: selectedType?.bid?.toFixed(2),
      percentageChange:
        type == 'mayorista'
          ? porcentualChange?.toFixed(0)
          : porcentualChange?.toFixed(2),
      today:
        selectedType.ask == todayPrices[todayPrices.length - 1]?.value
          ? todayPrices.length == 1
            ? [todayPrices[0], todayPrices[0]]
            : todayPrices
          : chartPrices,
    }

    return new Response(JSON.stringify(returnData), {
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
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

// Fetch functions
async function getDolarBNA() {
  const res = await fetch('https://criptoya.com/api/bna')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

async function getDolarMEP() {
  const res = await fetch('https://api.cocos.capital/api/v1/public/mep-prices')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()
  return data
}

async function getDolarCrypto() {
  const res = await fetch('https://criptoya.com/api/usdc/ars/0.1')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = res.json()

  return calculateAverageCryptoDolarPrices(await data)
}

async function getOtherDolars() {
  const res = await fetch('https://criptoya.com/api/dolar')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

async function getDolarMayorista() {
  const res = await fetch('https://dolarapi.com/v1/dolares/mayorista')
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
