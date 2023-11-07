import admin from '@/lib/firebase-setup/firebaseAdmin'
import { calculateAverageCryptoDolarPrices } from '@/lib/utils'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response(`Not authorized.`, {
      status: 500,
    })
  }

  let newPrices: any = {
    dolarBNA: null,
    otherDolars: null,
    dolarMEP: null,
    dolarCocos: null,
    dolarCrypto: null,
    dolarMayorista: null,
  }

  try {
    newPrices.dolarBNA = await getDolarBNA()
  } catch (error) {
    console.error('Failed to fetch dolarBNA', error)
  }

  try {
    newPrices.otherDolars = await getOtherDolars()
  } catch (error) {
    console.error('Failed to fetch otherDolars', error)
  }

  try {
    newPrices.dolarMEP = await getDolarMEP()
  } catch (error) {
    console.error('Failed to fetch dolarMEP', error)
  }

  try {
    newPrices.dolarCocos = await getDolarCocos()
  } catch (error) {
    console.error('Failed to fetch dolarCocos', error)
  }

  try {
    newPrices.dolarCrypto = await getDolarCrypto()
  } catch (error) {
    console.error('Failed to fetch dolarCrypto', error)
  }

  try {
    newPrices.dolarMayorista = await getDolarMayorista()
  } catch (error) {
    console.error('Failed to fetch dolarMayorista', error)
  }

  try {
    await endpointsTestUsage()
  } catch (error) {
    console.error('Failed to fetch Test', error)
  }

  try {
    const db = admin.firestore()

    // Last DB prices
    const lastPrices = (
      await db.collection('prices').doc('last-prices').get()
    ).data()
    const lastOficialAsk = lastPrices?.oficial?.ask
    const lastOficialBid = lastPrices?.oficial?.bid
    const lastBlueAsk = lastPrices?.blue?.ask
    const lastBlueBid = lastPrices?.blue?.bid
    const lastMepAsk = lastPrices?.mep?.ask
    const lastMepBid = lastPrices?.mep?.bid
    const lastCocosAsk = lastPrices?.cocos?.ask
    const lastCocosBid = lastPrices?.cocos?.bid
    const lastTarjeta = lastPrices?.tarjeta.ask
    const lastMayoristaAsk = lastPrices?.mayorista?.ask
    const lastMayoristaBid = lastPrices?.mayorista?.bid
    const lastCclAsk = lastPrices?.ccl?.ask
    const lastCclBid = lastPrices?.ccl?.bid
    const lastCriptoAsk = lastPrices?.cripto?.ask
    const lastCriptoBid = lastPrices?.cripto?.bid

    // Prices from sources
    const newOficialAsk = newPrices?.dolarBNA?.ask
    const newOficialBid = newPrices?.dolarBNA?.bid
    const newBlueAsk = newPrices?.otherDolars?.blue
    const newBlueBid = newPrices?.otherDolars?.blue_bid
    const newMepAsk = newPrices?.dolarMEP?.ask
    const newMepBid = newPrices?.dolarMEP?.bid
    const newCocosAsk = newPrices?.dolarCocos?.ask
    const newCocosBid = newPrices?.dolarCocos?.bid
    const newTarjeta = newPrices?.otherDolars?.solidario
    const newMayoristaAsk = newPrices?.dolarMayorista?.venta
    const newMayoristaBid = newPrices?.dolarMayorista?.compra
    const newCclAsk = newPrices?.otherDolars?.ccl
    const newCclBid = newPrices?.otherDolars?.ccl
    const newCriptoAsk = newPrices?.dolarCrypto?.ask
    const newCriptoBid = newPrices?.dolarCrypto?.bid

    // Register new prices on DB only if they are different from the last ones
    if (
      !!newOficialAsk &&
      !!newOficialBid &&
      (newOficialAsk !== lastOficialAsk || newOficialBid !== lastOficialBid)
    ) {
      await db
        .collection('prices')
        .doc('last-prices')
        .set(
          {
            oficial: {
              ask: newOficialAsk,
              bid: newOficialBid,
              timestamp: admin.firestore.FieldValue.serverTimestamp(),
            },
          },
          { merge: true }
        )
      await db.collection('historical-prices').doc().set({
        ask: newOficialAsk,
        bid: newOficialBid,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        type: 'oficial',
      })
    }
    if (
      !!newBlueAsk &&
      !!newBlueBid &&
      (newBlueAsk !== lastBlueAsk || newBlueBid !== lastBlueBid)
    ) {
      await db
        .collection('prices')
        .doc('last-prices')
        .set(
          {
            blue: {
              ask: newBlueAsk,
              bid: newBlueBid,
              timestamp: admin.firestore.FieldValue.serverTimestamp(),
            },
          },
          { merge: true }
        )
      await db.collection('historical-prices').doc().set({
        ask: newBlueAsk,
        bid: newBlueBid,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        type: 'blue',
      })
    }
    if (
      !!newMepAsk &&
      !!newMepBid &&
      (newMepAsk !== lastMepAsk || newMepBid !== lastMepBid)
    ) {
      await db
        .collection('prices')
        .doc('last-prices')
        .set(
          {
            mep: {
              ask: newMepAsk,
              bid: newMepBid,
              timestamp: admin.firestore.FieldValue.serverTimestamp(),
            },
          },
          { merge: true }
        )
      await db.collection('historical-prices').doc().set({
        ask: newMepAsk,
        bid: newMepBid,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        type: 'mep',
      })
    }
    if (
      !!newCocosAsk &&
      !!newCocosBid &&
      (newCocosAsk !== lastCocosAsk || newCocosBid !== lastCocosBid)
    ) {
      await db
        .collection('prices')
        .doc('last-prices')
        .set(
          {
            cocos: {
              ask: newCocosAsk,
              bid: newCocosBid,
              timestamp: admin.firestore.FieldValue.serverTimestamp(),
            },
          },
          { merge: true }
        )
      await db.collection('historical-prices').doc().set({
        ask: newCocosAsk,
        bid: newCocosBid,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        type: 'cocos',
      })
    }
    if (!!newTarjeta && newTarjeta !== lastTarjeta) {
      await db
        .collection('prices')
        .doc('last-prices')
        .set(
          {
            tarjeta: {
              ask: newTarjeta,
              timestamp: admin.firestore.FieldValue.serverTimestamp(),
            },
          },
          { merge: true }
        )
      await db.collection('historical-prices').doc().set({
        ask: newTarjeta,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        type: 'tarjeta',
      })
    }
    if (
      !!newMayoristaAsk &&
      !!newMayoristaBid &&
      (newMayoristaAsk !== lastMayoristaAsk ||
        newMayoristaBid !== lastMayoristaBid)
    ) {
      await db
        .collection('prices')
        .doc('last-prices')
        .set(
          {
            mayorista: {
              ask: newMayoristaAsk,
              bid: newMayoristaBid,
              timestamp: admin.firestore.FieldValue.serverTimestamp(),
            },
          },
          { merge: true }
        )
      await db.collection('historical-prices').doc().set({
        ask: newMayoristaAsk,
        bid: newMayoristaBid,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        type: 'mayorista',
      })
    }
    if (
      !!newCclAsk &&
      !!newCclBid &&
      (newCclAsk !== lastCclAsk || newCclBid !== lastCclBid)
    ) {
      await db
        .collection('prices')
        .doc('last-prices')
        .set(
          {
            ccl: {
              ask: newCclAsk,
              bid: newCclBid,
              timestamp: admin.firestore.FieldValue.serverTimestamp(),
            },
          },
          { merge: true }
        )
      await db.collection('historical-prices').doc().set({
        ask: newCclAsk,
        bid: newCclBid,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        type: 'ccl',
      })
    }
    if (
      !!newCriptoAsk &&
      !!newCriptoBid &&
      (newCriptoAsk !== lastCriptoAsk || newCriptoBid !== lastCriptoBid)
    ) {
      await db
        .collection('prices')
        .doc('last-prices')
        .set(
          {
            cripto: {
              ask: newCriptoAsk,
              bid: newCriptoBid,
              timestamp: admin.firestore.FieldValue.serverTimestamp(),
            },
          },
          { merge: true }
        )
      await db.collection('historical-prices').doc().set({
        ask: newCriptoAsk,
        bid: newCriptoBid,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        type: 'cripto',
      })
    }

    return new Response('Prices updated', {
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

// Fetch functions
async function getDolarBNA() {
  const res = await fetch('https://criptoya.com/api/bna')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

async function getDolarMEP() {
  const res = await fetch(
    'https://api.cocos.capital/api/v1/public/open-dolar-mep'
  )
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

async function getDolarCocos() {
  const res = await fetch('https://api.cocos.capital/api/v1/public/dolar-mep')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
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
