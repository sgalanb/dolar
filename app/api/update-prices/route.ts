import admin from '@/lib/firebase-setup/firebaseAdmin'
import { calculateAverageCryptoDolarPrices } from '@/lib/utils'
import dayjs from 'dayjs'
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

    // All ask prices from today
    const todayOficial = lastPrices?.oficial?.today || ([] as [any] | [])
    const todayBlue = lastPrices?.blue?.today || ([] as [any] | [])
    const todayMep = lastPrices?.mep?.today || ([] as [any] | [])
    const todayCocos = lastPrices?.cocos?.today || ([] as [any] | [])
    const todayTarjeta = lastPrices?.tarjeta?.today || ([] as [any] | [])
    const todayMayorista = lastPrices?.mayorista?.today || ([] as [any] | [])
    const todayCcl = lastPrices?.ccl?.today || ([] as [any] | [])
    const todayCripto = lastPrices?.cripto?.today || ([] as [any] | [])

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

    // Oficial
    if (
      !!newOficialAsk &&
      !!newOficialBid &&
      (newOficialAsk !== lastOficialAsk || newOficialBid !== lastOficialBid)
    ) {
      let shouldUpdateOficial = true
      if (todayOficial.length > 0) {
        const lastTimestamp =
          todayOficial[todayOficial.length - 1].timestamp.seconds

        if (dayjs.unix(lastTimestamp).isAfter(dayjs().subtract(30, 'minute'))) {
          shouldUpdateOficial = false
        }
      }

      const updateDataOficial: any = {
        oficial: {
          ask: newOficialAsk,
          bid: newOficialBid,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        },
      }

      if (shouldUpdateOficial) {
        updateDataOficial.oficial.today = [
          ...todayOficial,
          {
            ask: newOficialAsk,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
          },
        ]
      }

      await db
        .collection('prices')
        .doc('last-prices')
        .set(updateDataOficial, { merge: true })

      await db.collection('historical-prices').doc().set({
        ask: newOficialAsk,
        bid: newOficialBid,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        type: 'oficial',
      })
    }
    // Blue
    if (
      !!newBlueAsk &&
      !!newBlueBid &&
      (newBlueAsk !== lastBlueAsk || newBlueBid !== lastBlueBid)
    ) {
      let shouldUpdateBlue = true
      if (todayBlue.length > 0) {
        const lastTimestamp = todayBlue[todayBlue.length - 1].timestamp.seconds

        if (dayjs.unix(lastTimestamp).isAfter(dayjs().subtract(30, 'minute'))) {
          shouldUpdateBlue = false
        }
      }

      const updateDataBlue: any = {
        blue: {
          ask: newBlueAsk,
          bid: newBlueBid,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        },
      }

      if (shouldUpdateBlue) {
        updateDataBlue.blue.today = [
          ...todayBlue,
          {
            ask: newBlueAsk,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
          },
        ]
      }

      await db
        .collection('prices')
        .doc('last-prices')
        .set(updateDataBlue, { merge: true })

      await db.collection('historical-prices').doc().set({
        ask: newBlueAsk,
        bid: newBlueBid,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        type: 'blue',
      })
    }
    // MEP
    if (
      !!newMepAsk &&
      !!newMepBid &&
      (newMepAsk !== lastMepAsk || newMepBid !== lastMepBid)
    ) {
      let shouldUpdateMep = true
      if (todayMep.length > 0) {
        const lastTimestamp = todayMep[todayMep.length - 1].timestamp.seconds

        if (dayjs.unix(lastTimestamp).isAfter(dayjs().subtract(30, 'minute'))) {
          shouldUpdateMep = false
        }
      }

      const updateDataMep: any = {
        mep: {
          ask: newMepAsk,
          bid: newMepBid,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        },
      }

      if (shouldUpdateMep) {
        updateDataMep.mep.today = [
          ...todayMep,
          {
            ask: newMepAsk,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
          },
        ]
      }

      await db
        .collection('prices')
        .doc('last-prices')
        .set(updateDataMep, { merge: true })
      await db.collection('historical-prices').doc().set({
        ask: newMepAsk,
        bid: newMepBid,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        type: 'mep',
      })
    }
    // Cocos
    if (
      !!newCocosAsk &&
      !!newCocosBid &&
      (newCocosAsk !== lastCocosAsk || newCocosBid !== lastCocosBid)
    ) {
      let shouldUpdateCocos = true
      if (todayCocos.length > 0) {
        const lastTimestamp =
          todayCocos[todayCocos.length - 1].timestamp.seconds

        if (dayjs.unix(lastTimestamp).isAfter(dayjs().subtract(30, 'minute'))) {
          shouldUpdateCocos = false
        }
      }

      const updateDataCocos: any = {
        cocos: {
          ask: newCocosAsk,
          bid: newCocosBid,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        },
      }

      if (shouldUpdateCocos) {
        updateDataCocos.cocos.today = [
          ...todayCocos,
          {
            ask: newCocosAsk,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
          },
        ]
      }

      await db
        .collection('prices')
        .doc('last-prices')
        .set(updateDataCocos, { merge: true })
      await db.collection('historical-prices').doc().set({
        ask: newCocosAsk,
        bid: newCocosBid,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        type: 'cocos',
      })
    }
    // Tarjeta
    if (!!newTarjeta && newTarjeta !== lastTarjeta) {
      let shouldUpdateTarjeta = true
      if (todayTarjeta.length > 0) {
        const lastTimestamp =
          todayTarjeta[todayTarjeta.length - 1].timestamp.seconds

        if (dayjs.unix(lastTimestamp).isAfter(dayjs().subtract(30, 'minute'))) {
          shouldUpdateTarjeta = false
        }
      }

      const updateDataTarjeta: any = {
        tarjeta: {
          ask: newTarjeta,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        },
      }

      if (shouldUpdateTarjeta) {
        updateDataTarjeta.tarjeta.today = [
          ...todayTarjeta,
          {
            ask: newTarjeta,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
          },
        ]
      }

      await db
        .collection('prices')
        .doc('last-prices')
        .set(updateDataTarjeta, { merge: true })
      await db.collection('historical-prices').doc().set({
        ask: newTarjeta,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        type: 'tarjeta',
      })
    }
    // Mayorista
    if (
      !!newMayoristaAsk &&
      !!newMayoristaBid &&
      (newMayoristaAsk !== lastMayoristaAsk ||
        newMayoristaBid !== lastMayoristaBid)
    ) {
      let shouldUpdateMayorista = true
      if (todayMayorista.length > 0) {
        const lastTimestamp =
          todayMayorista[todayMayorista.length - 1].timestamp.seconds

        if (dayjs.unix(lastTimestamp).isAfter(dayjs().subtract(30, 'minute'))) {
          shouldUpdateMayorista = false
        }
      }

      const updateDataMayorista: any = {
        mayorista: {
          ask: newMayoristaAsk,
          bid: newMayoristaBid,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        },
      }

      if (shouldUpdateMayorista) {
        updateDataMayorista.mayorista.today = [
          ...todayMayorista,
          {
            ask: newMayoristaAsk,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
          },
        ]
      }

      await db
        .collection('prices')
        .doc('last-prices')
        .set(updateDataMayorista, { merge: true })
      await db.collection('historical-prices').doc().set({
        ask: newMayoristaAsk,
        bid: newMayoristaBid,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        type: 'mayorista',
      })
    }
    // CCL
    if (
      !!newCclAsk &&
      !!newCclBid &&
      (newCclAsk !== lastCclAsk || newCclBid !== lastCclBid)
    ) {
      let shouldUpdateCcl = true
      if (todayCcl.length > 0) {
        const lastTimestamp = todayCcl[todayCcl.length - 1].timestamp.seconds

        if (dayjs.unix(lastTimestamp).isAfter(dayjs().subtract(30, 'minute'))) {
          shouldUpdateCcl = false
        }
      }

      const updateDataCcl: any = {
        ccl: {
          ask: newCclAsk,
          bid: newCclBid,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        },
      }

      if (shouldUpdateCcl) {
        updateDataCcl.ccl.today = [
          ...todayCcl,
          {
            ask: newCclAsk,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
          },
        ]
      }

      await db
        .collection('prices')
        .doc('last-prices')
        .set(updateDataCcl, { merge: true })
      await db.collection('historical-prices').doc().set({
        ask: newCclAsk,
        bid: newCclBid,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        type: 'ccl',
      })
    }
    // Cripto
    if (
      !!newCriptoAsk &&
      !!newCriptoBid &&
      (newCriptoAsk !== lastCriptoAsk || newCriptoBid !== lastCriptoBid)
    ) {
      let shouldUpdateCripto = true
      if (todayCripto.length > 0) {
        const lastTimestamp =
          todayCripto[todayCripto.length - 1].timestamp.seconds

        if (dayjs.unix(lastTimestamp).isAfter(dayjs().subtract(30, 'minute'))) {
          shouldUpdateCripto = false
        }
      }

      const updateDataCripto: any = {
        cripto: {
          ask: newCriptoAsk,
          bid: newCriptoBid,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        },
      }

      if (shouldUpdateCripto) {
        updateDataCripto.cripto.today = [
          ...todayCripto,
          {
            ask: newCriptoAsk,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
          },
        ]
      }

      await db
        .collection('prices')
        .doc('last-prices')
        .set(updateDataCripto, { merge: true })
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
  const res = await fetch('https://api.cocos.capital/api/v1/public/mep-prices')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()

  return data?.overnight
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
