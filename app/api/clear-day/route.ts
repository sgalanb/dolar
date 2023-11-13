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

    const lastPrices = (
      await db.collection('prices').doc('last-prices').get()
    ).data()

    await db
      .collection('prices')
      .doc('last-prices')
      .set(
        {
          oficial: {
            today: [
              {
                ask: lastPrices?.oficial.ask,
              },
            ],
          },
          blue: {
            today: [
              {
                ask: lastPrices?.blue.ask,
              },
            ],
          },
          mep: {
            today: [
              {
                ask: lastPrices?.mep.ask,
              },
            ],
          },
          cocos: {
            today: [
              {
                ask: lastPrices?.cocos.ask,
              },
            ],
          },
          tarjeta: {
            today: [
              {
                ask: lastPrices?.tarjeta.ask,
              },
            ],
          },
          mayorista: {
            today: [
              {
                ask: lastPrices?.mayorista.ask,
              },
            ],
          },
          ccl: {
            today: [
              {
                ask: lastPrices?.ccl.ask,
              },
            ],
          },
          cripto: {
            today: [
              {
                ask: lastPrices?.cripto.ask,
              },
            ],
          },
        },
        { merge: true }
      )
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
