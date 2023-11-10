import { db } from '@/lib/firebase-setup/firebase'
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'

interface PriceData {
  [key: string]: {
    timestamp: number
    bid: number
    ask: number
  }
}

export async function getLastPrices() {
  const lastPricesDoc = doc(db, 'prices', 'last-prices')

  const lastPrices = await getDoc(lastPricesDoc)
  const lastPricesData = lastPrices.data()

  if (!lastPricesData) {
    throw new Error('No data found for last prices.')
  }

  // Function to convert Timestamp to dayjs
  const convertTimestampToDayjs = (timestamp: Timestamp) => {
    return timestamp.seconds
  }

  // Iterate over each property in the lastPricesData object
  const lastPricesFormatted: PriceData = {}
  for (const [key, value] of Object.entries(lastPricesData)) {
    // Copy all properties from the original object
    lastPricesFormatted[key] = { ...value }
    // Replace the timestamp with a dayjs object
    lastPricesFormatted[key].timestamp = convertTimestampToDayjs(
      value.timestamp
    )
  }

  return lastPricesFormatted
}

export async function getLastPricesSnapshot(callback: (data: any) => void) {
  const unsub = onSnapshot(doc(db, 'prices', 'last-prices'), (doc) => {
    callback(doc.data())
  })

  return unsub
}

export async function getMiniLineChartPrices(
  type: string,
  callback: (data: any) => void
) {
  const historicalPricesRef = collection(db, 'historical-prices')

  const typeQuery = query(
    historicalPricesRef,
    where('type', '==', type),
    orderBy('timestamp', 'desc'),
    limit(7)
  )

  const unsub = onSnapshot(typeQuery, (snapshot) => {
    const prices = snapshot.docs.map((doc) => doc.data().ask)
    callback(prices.reverse())
  })

  return unsub
}

export async function getHistoricalYearPrices(
  type: string,
  callback: (data: any) => void
) {
  const historicalPricesRef = collection(db, 'historical-prices')

  let currentDate = new Date()
  let pastYearDate = new Date(
    currentDate.setFullYear(currentDate.getFullYear() - 1)
  )

  const typeQuery = query(
    historicalPricesRef,
    where('type', '==', type),
    where('timestamp', '>=', Timestamp.fromDate(pastYearDate)),
    orderBy('timestamp', 'asc')
  )

  const unsub = onSnapshot(typeQuery, (snapshot) => {
    const allPrices = snapshot.docs.map((doc) => doc.data())

    // Group by date and get the last price of each day
    const lastPricePerDay = allPrices.reduce((acc, price) => {
      const date = price.timestamp.toDate().toDateString()
      if (!acc[date] || acc[date].timestamp < price.timestamp) {
        acc[date] = price
      }
      return acc
    }, {})

    callback(Object.values(lastPricePerDay))
  })

  return unsub
}
