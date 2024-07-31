import { createClient } from '@/utils/supabase/server'
import { twitterClient } from '@/utils/twitterClient'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import updateLocale from 'dayjs/plugin/updateLocale'
import { NextRequest } from 'next/server'
dayjs.extend(updateLocale)
dayjs.locale('es')
dayjs.updateLocale('es', {
  months: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
})

export const dynamic = 'force-dynamic'

// This endpoint runs at 5:30 PM UTC -3
export async function GET(request: NextRequest) {
  // Only allow Vercel to access this endpoint
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response(`Not authorized.`, {
      status: 500,
    })
  }

  try {
    const supabase = createClient()

    async function getLastPrice(type: string) {
      const query = await supabase
        .from('historical-prices')
        .select('ask, bid')
        .eq('type', type)
        .order('timestamp', { ascending: false })
        .single()
      return query.data
    }

    async function getPercentageChange(type: string) {
      const { data: basePrice } = await supabase
        .from('historical-prices')
        .select('ask')
        .eq('type', type)
        .lt('timestamp', dayjs().startOf('day').toISOString())
        .order('timestamp', { ascending: false })
        .limit(1)
        .single()

      const { data: lastPrice } = await supabase
        .from('historical-prices')
        .select('ask')
        .eq('type', type)
        .gte('timestamp', dayjs().startOf('day').toISOString())
        .lte('timestamp', dayjs().toISOString())
        .order('timestamp', { ascending: false })
        .single()

      if (basePrice?.ask && lastPrice?.ask) {
        return ((lastPrice.ask - basePrice.ask) / basePrice.ask) * 100
      } else {
        return 0
      }
    }

    const lastOficial = await getLastPrice('oficial')
    const perChangeOficial = await getPercentageChange('oficial')
    const lastBlue = await getLastPrice('blue')
    const perChangeBlue = await getPercentageChange('blue')
    const lastMep = await getLastPrice('mep')
    const perChangeMep = await getPercentageChange('mep')
    const lastCocos = await getLastPrice('cocos')
    const perChangeCocos = await getPercentageChange('cocos')
    const lastTarjeta = await getLastPrice('tarjeta')
    const perChangeTarjeta = await getPercentageChange('tarjeta')
    const lastMayorista = await getLastPrice('mayorista')
    const perChangeMayorista = await getPercentageChange('mayorista')
    const lastCcl = await getLastPrice('ccl')
    const perChangeCcl = await getPercentageChange('ccl')
    const lastCripto = await getLastPrice('cripto')
    const perChangeCripto = await getPercentageChange('cripto')

    const dolarTypes = [
      {
        name: 'Oficial',
        ask: lastOficial?.ask,
        bid: lastOficial?.bid,
        percentageChange: perChangeOficial,
      },
      {
        name: 'Blue',
        ask: lastBlue?.ask,
        bid: lastBlue?.bid,
        percentageChange: perChangeBlue,
      },
      {
        name: 'MEP',
        ask: lastMep?.ask,
        bid: lastMep?.bid,
        percentageChange: perChangeMep,
      },
      {
        name: 'Cocos',
        ask: lastCocos?.ask,
        bid: lastCocos?.bid,
        percentageChange: perChangeCocos,
      },
      {
        name: 'Tarjeta',
        ask: lastTarjeta?.ask,
        bid: lastTarjeta?.bid,
        percentageChange: perChangeTarjeta,
      },
      {
        name: 'Mayorista',
        ask: lastMayorista?.ask,
        bid: lastMayorista?.bid,
        percentageChange: perChangeMayorista,
      },
      {
        name: 'CCL',
        ask: lastCcl?.ask,
        bid: lastCcl?.bid,
        percentageChange: perChangeCcl,
      },
      {
        name: 'Cripto',
        ask: lastCripto?.ask,
        bid: lastCripto?.bid,
        percentageChange: perChangeCripto,
      },
    ]

    const imageURL = `https://dolarya.info/og/social-post-dark?name1=${
      dolarTypes[0].name
    }&name2=${dolarTypes[1].name}&name3=${dolarTypes[2].name}&name4=${
      dolarTypes[3].name
    }&name5=${dolarTypes[4].name}&name6=${dolarTypes[5].name}&name7=${
      dolarTypes[6].name
    }&name8=${dolarTypes[7].name}&ask1=${dolarTypes[0].ask}&ask2=${
      dolarTypes[1].ask
    }&ask3=${dolarTypes[2].ask}&ask4=${dolarTypes[3].ask}&ask5=${
      dolarTypes[4].ask
    }&ask6=${dolarTypes[5].ask}&ask7=${dolarTypes[6].ask}&ask8=${
      dolarTypes[7].ask
    }&bid1=${dolarTypes[0].bid}&bid2=${dolarTypes[1].bid}&bid3=${
      dolarTypes[2].bid
    }&bid4=${dolarTypes[3].bid}&bid5=${dolarTypes[4].bid}&bid6=${
      dolarTypes[5].bid
    }&bid7=${dolarTypes[6].bid}&bid8=${dolarTypes[7].bid}&percentageChange1=${
      dolarTypes[0].percentageChange
    }&percentageChange2=${dolarTypes[1].percentageChange}&percentageChange3=${
      dolarTypes[2].percentageChange
    }&percentageChange4=${dolarTypes[3].percentageChange}&percentageChange5=${
      dolarTypes[4].percentageChange
    }&percentageChange6=${dolarTypes[5].percentageChange}&percentageChange7=${
      dolarTypes[6].percentageChange
    }&percentageChange8=${dolarTypes[7].percentageChange}&date=${dayjs().format(
      'D MMMM YYYY'
    )}&time=${dayjs().locale('es').subtract(3, 'hour').format('HH:mm')}`

    const imageBuffer = await downloadImage(imageURL)
    const mediaId = await twitterClient.v1.uploadMedia(imageBuffer, {
      type: 'image/png',
    })

    await twitterClient.v2.tweet({
      media: {
        media_ids: [mediaId],
      },
    })

    return new Response('Tweeted. Lights out and away we go!', {
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

  async function downloadImage(url: string) {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to download image')
      }
      const imageData = await response.arrayBuffer()
      return Buffer.from(imageData)
    } catch (error) {
      throw new Error('Failed to download image')
    }
  }
}
