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

  let newPrices: {
    dolarOficial: any
    dolarBlue: any
    dolarMEP: any
    dolarCocos: any
    dolarTarjeta: any
    dolarMayorista: any
    dolarCCL: any
    dolarCrypto: any
  } = {
    dolarOficial: null,
    dolarBlue: null,
    dolarMEP: null,
    dolarCocos: null,
    dolarTarjeta: null,
    dolarMayorista: null,
    dolarCCL: null,
    dolarCrypto: null,
  }

  try {
    const otherDolars = await getOtherDolars()
    newPrices.dolarOficial = otherDolars?.oficial?.price
    newPrices.dolarBlue = otherDolars?.blue
    newPrices.dolarTarjeta = otherDolars?.tarjeta?.price
    newPrices.dolarMayorista = otherDolars?.mayorista?.price
    newPrices.dolarCCL = otherDolars?.ccl?.al30['48hs']?.price
  } catch (error) {
    console.error('Failed to fetch otherDolars', error)
  }

  try {
    const MEPs = await getDolarMEP()
    newPrices.dolarMEP = MEPs?.open
    newPrices.dolarCocos = MEPs?.overnight
  } catch (error) {
    console.error('Failed to fetch dolarMEP', error)
  }

  try {
    newPrices.dolarCrypto = await getDolarCrypto()
  } catch (error) {
    console.error('Failed to fetch dolarCrypto', error)
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
    const newOficialAsk = newPrices?.dolarOficial
    const newOficialBid = newPrices?.dolarOficial
    const newBlueAsk = newPrices?.dolarBlue?.ask
    const newBlueBid = newPrices?.dolarBlue?.bid
    const newMepAsk = newPrices?.dolarMEP?.ask
    const newMepBid = newPrices?.dolarMEP?.bid
    const newCocosAsk = newPrices?.dolarCocos?.ask
    const newCocosBid = newPrices?.dolarCocos?.bid
    const newTarjeta = newPrices?.dolarTarjeta
    const newMayoristaAsk = newPrices?.dolarMayorista
    const newMayoristaBid = newPrices?.dolarMayorista
    const newCclAsk = newPrices?.dolarCCL
    const newCclBid = newPrices?.dolarCCL
    const newCriptoAsk = newPrices?.dolarCrypto?.ask
    const newCriptoBid = newPrices?.dolarCrypto?.bid

    // Update today arrays
    if (true) {
      let shouldUpdateOficial = true
      if (todayOficial.length > 0) {
        const lastTimestamp =
          todayOficial[todayOficial.length - 1].timestamp.seconds

        if (dayjs.unix(lastTimestamp).isAfter(dayjs().subtract(30, 'minute'))) {
          shouldUpdateOficial = false
        }
      }

      let shouldUpdateBlue = true
      if (todayBlue.length > 0) {
        const lastTimestamp = todayBlue[todayBlue.length - 1].timestamp.seconds

        if (dayjs.unix(lastTimestamp).isAfter(dayjs().subtract(30, 'minute'))) {
          shouldUpdateBlue = false
        }
      }

      let shouldUpdateMep = true
      if (todayMep.length > 0) {
        const lastTimestamp = todayMep[todayMep.length - 1].timestamp.seconds

        if (dayjs.unix(lastTimestamp).isAfter(dayjs().subtract(30, 'minute'))) {
          shouldUpdateMep = false
        }
      }

      let shouldUpdateCocos = true
      if (todayCocos.length > 0) {
        const lastTimestamp =
          todayCocos[todayCocos.length - 1].timestamp.seconds

        if (dayjs.unix(lastTimestamp).isAfter(dayjs().subtract(30, 'minute'))) {
          shouldUpdateCocos = false
        }
      }

      let shouldUpdateTarjeta = true
      if (todayTarjeta.length > 0) {
        const lastTimestamp =
          todayTarjeta[todayTarjeta.length - 1].timestamp.seconds

        if (dayjs.unix(lastTimestamp).isAfter(dayjs().subtract(30, 'minute'))) {
          shouldUpdateTarjeta = false
        }
      }

      let shouldUpdateMayorista = true
      if (todayMayorista.length > 0) {
        const lastTimestamp =
          todayMayorista[todayMayorista.length - 1].timestamp.seconds

        if (dayjs.unix(lastTimestamp).isAfter(dayjs().subtract(30, 'minute'))) {
          shouldUpdateMayorista = false
        }
      }

      let shouldUpdateCcl = true
      if (todayCcl.length > 0) {
        const lastTimestamp = todayCcl[todayCcl.length - 1].timestamp.seconds

        if (dayjs.unix(lastTimestamp).isAfter(dayjs().subtract(30, 'minute'))) {
          shouldUpdateCcl = false
        }
      }

      let shouldUpdateCripto = true
      if (todayCripto.length > 0) {
        const lastTimestamp =
          todayCripto[todayCripto.length - 1].timestamp.seconds

        if (dayjs.unix(lastTimestamp).isAfter(dayjs().subtract(30, 'minute'))) {
          shouldUpdateCripto = false
        }
      }

      const updateObject: any = {}

      if (shouldUpdateOficial && !!newOficialAsk) {
        updateObject.oficial = {
          today: [
            ...todayOficial,
            {
              ask: newOficialAsk,
              timestamp: admin.firestore.Timestamp.now(),
            },
          ],
        }
      }

      if (shouldUpdateBlue && !!newBlueAsk) {
        updateObject.blue = {
          today: [
            ...todayBlue,
            {
              ask: newBlueAsk,
              timestamp: admin.firestore.Timestamp.now(),
            },
          ],
        }
      }

      if (shouldUpdateMep && !!newMepAsk) {
        updateObject.mep = {
          today: [
            ...todayMep,
            {
              ask: newMepAsk,
              timestamp: admin.firestore.Timestamp.now(),
            },
          ],
        }
      }

      if (shouldUpdateCocos && !!newCocosAsk) {
        updateObject.cocos = {
          today: [
            ...todayCocos,
            {
              ask: newCocosAsk,
              timestamp: admin.firestore.Timestamp.now(),
            },
          ],
        }
      }

      if (shouldUpdateTarjeta && !!newTarjeta) {
        updateObject.tarjeta = {
          today: [
            ...todayTarjeta,
            {
              ask: newTarjeta,
              timestamp: admin.firestore.Timestamp.now(),
            },
          ],
        }
      }

      if (shouldUpdateMayorista && !!newMayoristaAsk) {
        updateObject.mayorista = {
          today: [
            ...todayMayorista,
            {
              ask: newMayoristaAsk,
              timestamp: admin.firestore.Timestamp.now(),
            },
          ],
        }
      }

      if (shouldUpdateCcl && !!newCclAsk) {
        updateObject.ccl = {
          today: [
            ...todayCcl,
            {
              ask: newCclAsk,
              timestamp: admin.firestore.Timestamp.now(),
            },
          ],
        }
      }

      if (shouldUpdateCripto && !!newCriptoAsk) {
        updateObject.cripto = {
          today: [
            ...todayCripto,
            {
              ask: newCriptoAsk,
              timestamp: admin.firestore.Timestamp.now(),
            },
          ],
        }
      }

      await db
        .collection('prices')
        .doc('last-prices')
        .set(updateObject, { merge: true })
    }

    // Oficial
    if (
      !!newOficialAsk &&
      !!newOficialBid &&
      (newOficialAsk !== lastOficialAsk || newOficialBid !== lastOficialBid)
    ) {
      const updateDataOficial: any = {
        oficial: {
          ask: newOficialAsk,
          bid: newOficialBid,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        },
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
      const updateDataBlue: any = {
        blue: {
          ask: newBlueAsk,
          bid: newBlueBid,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        },
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
      const updateDataMep: any = {
        mep: {
          ask: newMepAsk,
          bid: newMepBid,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        },
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
      const updateDataCocos: any = {
        cocos: {
          ask: newCocosAsk,
          bid: newCocosBid,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        },
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
      const updateDataTarjeta: any = {
        tarjeta: {
          ask: newTarjeta,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        },
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
      const updateDataMayorista: any = {
        mayorista: {
          ask: newMayoristaAsk,
          bid: newMayoristaBid,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        },
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
      const updateDataCcl: any = {
        ccl: {
          ask: newCclAsk,
          bid: newCclBid,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        },
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
      const updateDataCripto: any = {
        cripto: {
          ask: newCriptoAsk,
          bid: newCriptoBid,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        },
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
async function getDolarMEP() {
  const res = await fetch('https://api.cocos.capital/api/v1/public/mep-prices')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()
  return data
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
