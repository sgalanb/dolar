import { db } from '@/app/db'
import { historicalPrices } from '@/app/db/schema'
import { eq } from 'drizzle-orm'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export const maxDuration = 300

// This endpoint runs every minute with a Vercel cron job
export async function GET(request: NextRequest) {
  try {
    // const dbFirebase = admin.firestore()

    // // Last DB prices
    // const lastPrices = await dbFirebase
    //   .collection('historical-prices')
    //   .where('type', '==', 'oficial')
    //   .get()

    // const lastPricesData = lastPrices.docs.map((doc) => doc.data())

    // const data = lastPricesData.map((price) => {
    //   const firebaseTimestamp = price.timestamp.toDate() as Date

    //   return {
    //     type: price.type,
    //     ask: price.ask ?? null,
    //     bid: price.bid ?? null,
    //     timestamp: firebaseTimestamp,
    //   }
    // })

    // const insertPromises = lastPricesData.map((price) => {
    //   const firebaseTimestamp = price.timestamp.toDate() as Date
    //   const isAskNumber = typeof price.ask === 'number'
    //   const isBidNumber = typeof price.bid === 'number'
    //   const isType =
    //     price.type === 'oficial' ||
    //     price.type === 'blue' ||
    //     price.type === 'mep' ||
    //     price.type === 'cocos' ||
    //     price.type === 'tarjeta' ||
    //     price.type === 'mayorista' ||
    //     price.type === 'ccl' ||
    //     price.type === 'cripto'

    //   if ((isAskNumber || isBidNumber) && isType) {
    //     return db.insert(historicalPrices).values({
    //       type: price.type,
    //       ask: isAskNumber ? price.ask : null,
    //       bid: isBidNumber ? price.bid : null,
    //       timestamp: firebaseTimestamp,
    //     })
    //   } else {
    //     return Promise.resolve()
    //   }
    // })

    // await Promise.all(insertPromises)

    // Find and delete duplicates
    const allRows = await db.query.historicalPrices.findMany({
      where: eq(historicalPrices.type, 'cripto'),
    })

    let duplicates: any[] = []

    allRows.forEach((row, index) => {
      const isDuplicate = allRows.findIndex(
        (r) => r.timestamp.getTime() === row.timestamp.getTime()
      )

      if (isDuplicate !== -1 && isDuplicate !== index) {
        duplicates.push(row)
      }
    })

    const duplicatesIds = duplicates.map((price) => price.id)

    const deletePromises = duplicatesIds.map((id, index) => {
      console.log(index)
      return db.delete(historicalPrices).where(eq(historicalPrices.id, id))
    })

    await Promise.all(deletePromises)

    return new Response(JSON.stringify('Success!'), {
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
