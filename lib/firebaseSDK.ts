import { db } from '@/lib/firebase-setup/firebase'
import { Timestamp, doc, getDoc, onSnapshot } from 'firebase/firestore'

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
