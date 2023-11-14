import admin from '@/lib/firebase-setup/firebaseAdmin'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response(`Not authorized.`, {
      status: 500,
    })
  }

  try {
    const db = admin.firestore()

    const currentDate = new Date()

    let past3MonthsDate = new Date(
      currentDate.setMonth(currentDate.getMonth() - 3)
    )

    const oficialPricesRef = await db
      .collection('historical-prices')
      .where('type', '==', 'oficial')
      .where(
        'timestamp',
        '>=',
        admin.firestore.Timestamp.fromDate(past3MonthsDate)
      )
      .orderBy('timestamp', 'asc')
      .get()
    const bluePricesRef = await db
      .collection('historical-prices')
      .where('type', '==', 'blue')
      .where(
        'timestamp',
        '>=',
        admin.firestore.Timestamp.fromDate(past3MonthsDate)
      )
      .orderBy('timestamp', 'asc')
      .get()
    const mepPricesRef = await db
      .collection('historical-prices')
      .where('type', '==', 'mep')
      .where(
        'timestamp',
        '>=',
        admin.firestore.Timestamp.fromDate(past3MonthsDate)
      )
      .orderBy('timestamp', 'asc')
      .get()
    const cocosPricesRef = await db
      .collection('historical-prices')
      .where('type', '==', 'cocos')
      .where(
        'timestamp',
        '>=',
        admin.firestore.Timestamp.fromDate(past3MonthsDate)
      )
      .orderBy('timestamp', 'asc')
      .get()
    const tarjetaPricesRef = await db
      .collection('historical-prices')
      .where('type', '==', 'tarjeta')
      .where(
        'timestamp',
        '>=',
        admin.firestore.Timestamp.fromDate(past3MonthsDate)
      )
      .orderBy('timestamp', 'asc')
      .get()
    const mayoristaPricesRef = await db
      .collection('historical-prices')
      .where('type', '==', 'mayorista')
      .where(
        'timestamp',
        '>=',
        admin.firestore.Timestamp.fromDate(past3MonthsDate)
      )
      .orderBy('timestamp', 'asc')
      .get()
    const cclPricesRef = await db
      .collection('historical-prices')
      .where('type', '==', 'ccl')
      .where(
        'timestamp',
        '>=',
        admin.firestore.Timestamp.fromDate(past3MonthsDate)
      )
      .orderBy('timestamp', 'asc')
      .get()
    const criptoPricesRef = await db
      .collection('historical-prices')
      .where('type', '==', 'cripto')
      .where(
        'timestamp',
        '>=',
        admin.firestore.Timestamp.fromDate(past3MonthsDate)
      )
      .orderBy('timestamp', 'asc')
      .get()

    const oficialPrices = oficialPricesRef.docs.map((doc) => doc.data())
    const bluePrices = bluePricesRef.docs.map((doc) => doc.data())
    const mepPrices = mepPricesRef.docs.map((doc) => doc.data())
    const cocosPrices = cocosPricesRef.docs.map((doc) => doc.data())
    const tarjetaPrices = tarjetaPricesRef.docs.map((doc) => doc.data())
    const mayoristaPrices = mayoristaPricesRef.docs.map((doc) => doc.data())
    const cclPrices = cclPricesRef.docs.map((doc) => doc.data())
    const criptoPrices = criptoPricesRef.docs.map((doc) => doc.data())

    // Group by date and get the last price of each day
    const oficialPricesPerDay = calculateLatestPricesPerDay(oficialPrices)
    const bluePricesPerDay = calculateLatestPricesPerDay(bluePrices)
    const mepPricesPerDay = calculateLatestPricesPerDay(mepPrices)
    const cocosPricesPerDay = calculateLatestPricesPerDay(cocosPrices)
    const tarjetaPricesPerDay = calculateLatestPricesPerDay(tarjetaPrices)
    const mayoristaPricesPerDay = calculateLatestPricesPerDay(mayoristaPrices)
    const cclPricesPerDay = calculateLatestPricesPerDay(cclPrices)
    const criptoPricesPerDay = calculateLatestPricesPerDay(criptoPrices)

    // Convert to array
    const oficialPricesPerDayArray = Object.values(oficialPricesPerDay)
    const bluePricesPerDayArray = Object.values(bluePricesPerDay)
    const mepPricesPerDayArray = Object.values(mepPricesPerDay)
    const cocosPricesPerDayArray = Object.values(cocosPricesPerDay)
    const tarjetaPricesPerDayArray = Object.values(tarjetaPricesPerDay)
    const mayoristaPricesPerDayArray = Object.values(mayoristaPricesPerDay)
    const cclPricesPerDayArray = Object.values(cclPricesPerDay)
    const criptoPricesPerDayArray = Object.values(criptoPricesPerDay)

    await db
      .collection('charts-data')
      .doc('oficial')
      .set(
        {
          '3m': oficialPricesPerDayArray.map((item: any) => ({
            ask: item.ask,
            timestamp: item.timestamp,
          })),
        },
        { merge: true }
      )

    await db
      .collection('charts-data')
      .doc('blue')
      .set(
        {
          '3m': bluePricesPerDayArray.map((item: any) => ({
            ask: item.ask,
            timestamp: item.timestamp,
          })),
        },
        { merge: true }
      )

    await db
      .collection('charts-data')
      .doc('mep')
      .set(
        {
          '3m': mepPricesPerDayArray.map((item: any) => ({
            ask: item.ask,
            timestamp: item.timestamp,
          })),
        },
        { merge: true }
      )

    await db
      .collection('charts-data')
      .doc('cocos')
      .set(
        {
          '3m': cocosPricesPerDayArray.map((item: any) => ({
            ask: item.ask,
            timestamp: item.timestamp,
          })),
        },
        { merge: true }
      )

    await db
      .collection('charts-data')
      .doc('tarjeta')
      .set(
        {
          '3m': tarjetaPricesPerDayArray.map((item: any) => ({
            ask: item.ask,
            timestamp: item.timestamp,
          })),
        },
        { merge: true }
      )

    await db
      .collection('charts-data')
      .doc('mayorista')
      .set(
        {
          '3m': mayoristaPricesPerDayArray.map((item: any) => ({
            ask: item.ask,
            timestamp: item.timestamp,
          })),
        },
        { merge: true }
      )

    await db
      .collection('charts-data')
      .doc('ccl')
      .set(
        {
          '3m': cclPricesPerDayArray.map((item: any) => ({
            ask: item.ask,
            timestamp: item.timestamp,
          })),
        },
        { merge: true }
      )

    await db
      .collection('charts-data')
      .doc('cripto')
      .set(
        {
          '3m': criptoPricesPerDayArray.map((item: any) => ({
            ask: item.ask,
            timestamp: item.timestamp,
          })),
        },
        { merge: true }
      )
    return new Response('3M Updated', {
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

function calculateLatestPricesPerDay(prices: any) {
  return prices.reduce((acc: any, price: any) => {
    const date = price.timestamp.toDate().toDateString()
    if (!acc[date] || acc[date].timestamp < price.timestamp) {
      acc[date] = price
    }
    return acc
  }, {})
}
