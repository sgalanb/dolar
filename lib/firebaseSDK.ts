import { db } from '@/lib/firebase-setup/firebase'
import { Timestamp, doc, getDoc, onSnapshot } from 'firebase/firestore'

interface TodayData {
  ask: string
  timestamp: Timestamp
}

interface PriceData {
  [key: string]: {
    bid?: number
    ask: number
    timestamp: Timestamp
    today: TodayData[]
  }
}

export interface LastPricesInterface {
  [key: string]: {
    bid?: number
    ask: number
    timestamp: number // seconds from epoch
    today: LastPricesTodayInterface[]
  }
}

export interface LastPricesTodayInterface {
  ask: string
  timestamp: number // seconds from epoch
}

// Function to convert Timestamp to dayjs
const convertTimestampToDayjs = (timestamp: Timestamp) => {
  return timestamp.seconds as number
}

export async function getLastPrices() {
  const lastPricesDoc = doc(db, 'prices', 'last-prices')

  const lastPrices = await getDoc(lastPricesDoc)
  const lastPricesData = lastPrices.data()

  if (!lastPricesData) {
    throw new Error('No data found for last prices.')
  }

  // Iterate over each property in the lastPricesData object
  const lastPricesFormatted: LastPricesInterface = {}
  for (const [key, value] of Object.entries(lastPricesData)) {
    // Copy all properties from the original object
    lastPricesFormatted[key] = { ...value }
    // Replace the timestamp with a dayjs object
    lastPricesFormatted[key].timestamp = convertTimestampToDayjs(
      value.timestamp
    )

    // Convert each timestamp in the today array
    lastPricesFormatted[key].today = value.today.map(
      (todayItem: TodayData) => ({
        ...todayItem,
        timestamp: convertTimestampToDayjs(todayItem.timestamp),
      })
    )
  }

  return lastPricesFormatted
}

export async function getLastPricesSnapshot(
  callback: (data: LastPricesInterface) => void
) {
  const unsub = onSnapshot(doc(db, 'prices', 'last-prices'), (docSnapshot) => {
    const lastPricesData = docSnapshot.data()

    if (!lastPricesData) {
      throw new Error('No data found for last prices.')
    }

    const lastPricesFormatted: LastPricesInterface = {}
    for (const [key, value] of Object.entries(lastPricesData)) {
      lastPricesFormatted[key] = { ...value }
      lastPricesFormatted[key].timestamp = convertTimestampToDayjs(
        value.timestamp
      )

      lastPricesFormatted[key].today = value.today.map(
        (todayItem: TodayData) => ({
          ...todayItem,
          timestamp: convertTimestampToDayjs(todayItem.timestamp),
        })
      )
    }

    callback(lastPricesFormatted)
  })

  return unsub
}

export async function getChartsDataSnapshot(
  type: string,
  callback: (data: any) => void
) {
  const unsub = onSnapshot(
    doc(db, 'charts-data', type.toLowerCase()),
    (docSnapshot) => {
      const data = docSnapshot.data()

      if (!data) {
        throw new Error('No data found for charts data.')
      }

      callback(data)
    }
  )

  return unsub
}
