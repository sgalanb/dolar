import { db } from '@/lib/firebase-setup/firebase'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'

export async function getLastPrices() {
  const lastPricesDoc = doc(db, 'prices', 'last-prices')

  const lastPrices = await getDoc(lastPricesDoc)

  return lastPrices.data()
}

export async function getLastPricesSnapshot(callback: (data: any) => void) {
  const unsub = onSnapshot(doc(db, 'prices', 'last-prices'), (doc) => {
    callback(doc.data())
  })

  return unsub
}
