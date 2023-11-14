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

    let pastWeekDate = new Date(currentDate.setDate(currentDate.getDate() - 7))

    const oficialPricesRef = await db
      .collection('historical-prices')
      .where('type', '==', 'oficial')
      .where(
        'timestamp',
        '>=',
        admin.firestore.Timestamp.fromDate(pastWeekDate)
      )
      .orderBy('timestamp', 'asc')
      .get()
    const bluePricesRef = await db
      .collection('historical-prices')
      .where('type', '==', 'blue')
      .where(
        'timestamp',
        '>=',
        admin.firestore.Timestamp.fromDate(pastWeekDate)
      )
      .orderBy('timestamp', 'asc')
      .get()
    const mepPricesRef = await db
      .collection('historical-prices')
      .where('type', '==', 'mep')
      .where(
        'timestamp',
        '>=',
        admin.firestore.Timestamp.fromDate(pastWeekDate)
      )
      .orderBy('timestamp', 'asc')
      .get()
    const cocosPricesRef = await db
      .collection('historical-prices')
      .where('type', '==', 'cocos')
      .where(
        'timestamp',
        '>=',
        admin.firestore.Timestamp.fromDate(pastWeekDate)
      )
      .orderBy('timestamp', 'asc')
      .get()
    const tarjetaPricesRef = await db
      .collection('historical-prices')
      .where('type', '==', 'tarjeta')
      .where(
        'timestamp',
        '>=',
        admin.firestore.Timestamp.fromDate(pastWeekDate)
      )
      .orderBy('timestamp', 'asc')
      .get()
    const mayoristaPricesRef = await db
      .collection('historical-prices')
      .where('type', '==', 'mayorista')
      .where(
        'timestamp',
        '>=',
        admin.firestore.Timestamp.fromDate(pastWeekDate)
      )
      .orderBy('timestamp', 'asc')
      .get()
    const cclPricesRef = await db
      .collection('historical-prices')
      .where('type', '==', 'ccl')
      .where(
        'timestamp',
        '>=',
        admin.firestore.Timestamp.fromDate(pastWeekDate)
      )
      .orderBy('timestamp', 'asc')
      .get()
    const criptoPricesRef = await db
      .collection('historical-prices')
      .where('type', '==', 'cripto')
      .where(
        'timestamp',
        '>=',
        admin.firestore.Timestamp.fromDate(pastWeekDate)
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

    // Convert to array
    const oficialPricesArray = calculateFirstAndLastPricesPerDay(
      oficialPrices
    ) as any[]
    const bluePricesArray = calculateFirstAndLastPricesPerDay(
      bluePrices
    ) as any[]
    const mepPricesArray = calculateFirstAndLastPricesPerDay(mepPrices) as any[]
    const cocosPricesArray = calculateFirstAndLastPricesPerDay(
      cocosPrices
    ) as any[]
    const tarjetaPricesArray = calculateFirstAndLastPricesPerDay(
      tarjetaPrices
    ) as any[]
    const mayoristaPricesArray = calculateFirstAndLastPricesPerDay(
      mayoristaPrices
    ) as any[]
    const cclPricesArray = calculateFirstAndLastPricesPerDay(cclPrices) as any[]
    const criptoPricesArray = calculateFirstAndLastPricesPerDay(
      criptoPrices
    ) as any[]

    await db
      .collection('charts-data')
      .doc('oficial')
      .set(
        {
          '1s': oficialPricesArray.map((item: any) => ({
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
          '1s': bluePricesArray.map((item: any) => ({
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
          '1s': mepPricesArray.map((item: any) => ({
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
          '1s': cocosPricesArray.map((item: any) => ({
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
          '1s': tarjetaPricesArray.map((item: any) => ({
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
          '1s': mayoristaPricesArray.map((item: any) => ({
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
          '1s': cclPricesArray.map((item: any) => ({
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
          '1s': criptoPricesArray.map((item: any) => ({
            ask: item.ask,
            timestamp: item.timestamp,
          })),
        },
        { merge: true }
      )

    return new Response('1s Updated', {
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
    const date = price.timestamp.toDate().toDateString()
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
  )
}
