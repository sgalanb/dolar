import admin from '@/lib/firebase-setup/firebaseAdmin'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  // const authHeader = request.headers.get('authorization')
  // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return new Response(`Not authorized.`, {
  //     status: 500,
  //   })
  // }

  try {
    const db = admin.firestore()

    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)

    const oficialPricesRef = await db
      .collection('historical-prices')
      .where('type', '==', 'oficial')
      .where(
        'timestamp',
        '>=',
        admin.firestore.Timestamp.fromDate(startOfToday)
      )
      .orderBy('timestamp', 'asc')
      .get()
    const bluePricesRef = await db
      .collection('historical-prices')
      .where('type', '==', 'blue')
      .where(
        'timestamp',
        '>=',
        admin.firestore.Timestamp.fromDate(startOfToday)
      )
      .orderBy('timestamp', 'asc')
      .get()
    const mepPricesRef = await db
      .collection('historical-prices')
      .where('type', '==', 'mep')
      .where(
        'timestamp',
        '>=',
        admin.firestore.Timestamp.fromDate(startOfToday)
      )
      .orderBy('timestamp', 'asc')
      .get()
    const cocosPricesRef = await db
      .collection('historical-prices')
      .where('type', '==', 'cocos')
      .where(
        'timestamp',
        '>=',
        admin.firestore.Timestamp.fromDate(startOfToday)
      )
      .orderBy('timestamp', 'asc')
      .get()
    const tarjetaPricesRef = await db
      .collection('historical-prices')
      .where('type', '==', 'tarjeta')
      .where(
        'timestamp',
        '>=',
        admin.firestore.Timestamp.fromDate(startOfToday)
      )
      .orderBy('timestamp', 'asc')
      .get()
    const mayoristaPricesRef = await db
      .collection('historical-prices')
      .where('type', '==', 'mayorista')
      .where(
        'timestamp',
        '>=',
        admin.firestore.Timestamp.fromDate(startOfToday)
      )
      .orderBy('timestamp', 'asc')
      .get()
    const cclPricesRef = await db
      .collection('historical-prices')
      .where('type', '==', 'ccl')
      .where(
        'timestamp',
        '>=',
        admin.firestore.Timestamp.fromDate(startOfToday)
      )
      .orderBy('timestamp', 'asc')
      .get()
    const criptoPricesRef = await db
      .collection('historical-prices')
      .where('type', '==', 'cripto')
      .where(
        'timestamp',
        '>=',
        admin.firestore.Timestamp.fromDate(startOfToday)
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

    await db
      .collection('charts-data')
      .doc('oficial')
      .set(
        {
          '1d': oficialPrices.map((item: any) => ({
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
          '1d': bluePrices.map((item: any) => ({
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
          '1d': mepPrices.map((item: any) => ({
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
          '1d': cocosPrices.map((item: any) => ({
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
          '1d': tarjetaPrices.map((item: any) => ({
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
          '1d': mayoristaPrices.map((item: any) => ({
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
          '1d': cclPrices.map((item: any) => ({
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
          '1d': criptoPrices.map((item: any) => ({
            ask: item.ask,
            timestamp: item.timestamp,
          })),
        },
        { merge: true }
      )

    return new Response('1d Updated', {
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
