import { LastPrices } from '@/app/api/get-last-prices/types'
import { twitterClient } from '@/lib/twitterClient'
import { getPercentageChange } from '@/lib/utils'
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

// This endpoint runs at 11:30 AM UTC -3
export async function GET(request: NextRequest) {
  // Only allow Vercel to access this endpoint
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response(`Not authorized.`, {
      status: 500,
    })
  }

  try {
    const lastPrices: LastPrices = await fetch(
      `https://dolarya.info/api/get-last-prices`
    ).then((res) => res.json())

    const oficialTodayPrices: number[] = lastPrices?.oficial.today.map(
      (today: any) => today.ask
    )
    const blueTodayPrices: number[] = lastPrices?.blue.today.map(
      (today: any) => today.ask
    )
    const mepTodayPrices: number[] = lastPrices?.mep.today.map(
      (today: any) => today.ask
    )
    const cocosTodayPrices: number[] = lastPrices?.cocos.today.map(
      (today: any) => today.ask
    )
    const tarjetaTodayPrices: number[] = lastPrices?.tarjeta.today.map(
      (today: any) => today.ask
    )
    const mayoristaTodayPrices: number[] = lastPrices?.mayorista.today.map(
      (today: any) => today.ask
    )
    const cclTodayPrices: number[] = lastPrices?.ccl.today.map(
      (today: any) => today.ask
    )
    const criptoTodayPrices: number[] = lastPrices?.cripto.today.map(
      (today: any) => today.ask
    )

    const oficialChartPrices = [...oficialTodayPrices, lastPrices?.oficial.ask]
    const blueChartPrices = [...blueTodayPrices, lastPrices?.blue.ask]
    const mepChartPrices = [...mepTodayPrices, lastPrices?.mep.ask]
    const cocosChartPrices = [...cocosTodayPrices, lastPrices?.cocos.ask]
    const tarjetaChartPrices = [...tarjetaTodayPrices, lastPrices?.tarjeta.ask]
    const mayoristaChartPrices = [
      ...mayoristaTodayPrices,
      lastPrices?.mayorista.ask,
    ]
    const cclChartPrices = [...cclTodayPrices, lastPrices?.ccl.ask]
    const criptoChartPrices = [...criptoTodayPrices, lastPrices?.cripto.ask]

    const dolarTypes = [
      {
        name: 'Oficial',
        ask: lastPrices?.oficial.ask,
        bid: lastPrices?.oficial.bid,
        percentageChange: getPercentageChange(oficialChartPrices),
      },
      {
        name: 'Blue',
        ask: lastPrices?.blue.ask,
        bid: lastPrices?.blue.bid,
        percentageChange: getPercentageChange(blueChartPrices),
      },
      {
        name: 'MEP',
        ask: lastPrices?.mep.ask,
        bid: lastPrices?.mep.bid,
        percentageChange: getPercentageChange(mepChartPrices),
      },
      {
        name: 'Cocos',
        ask: lastPrices?.cocos.ask,
        bid: lastPrices?.cocos.bid,
        percentageChange: getPercentageChange(cocosChartPrices),
      },
      {
        name: 'Tarjeta',
        ask: lastPrices?.tarjeta.ask,
        bid: lastPrices?.tarjeta.bid,
        percentageChange: getPercentageChange(tarjetaChartPrices),
      },
      {
        name: 'Mayorista',
        ask: lastPrices?.mayorista.ask,
        bid: lastPrices?.mayorista.bid,
        percentageChange: getPercentageChange(mayoristaChartPrices),
      },
      {
        name: 'CCL',
        ask: lastPrices?.ccl.ask,
        bid: lastPrices?.ccl.bid,
        percentageChange: getPercentageChange(cclChartPrices),
      },
      {
        name: 'Cripto',
        ask: lastPrices?.cripto.ask,
        bid: lastPrices?.cripto.bid,
        percentageChange: getPercentageChange(criptoChartPrices),
      },
    ]

    const imageURL = `https://dolarya.info/og/social-post-light?name1=${
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
