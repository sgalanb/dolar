import DolarsHome from '@/components/DolarsHome'
import { createClient } from '@/utils/supabase/server'
import { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'DólarYa | Precio del dólar hoy en Argentina',
  description:
    'La forma más fácil de seguir las cotizaciones del dólar en Argentina y conocer valores históricos. Todo en tiempo real y sin publicidad.',
  openGraph: {
    title: 'DólarYa | Precio del dólar hoy en Argentina',
    description:
      'La forma más fácil de seguir las cotizaciones del dólar en Argentina y conocer valores históricos. Todo en tiempo real y sin publicidad.',
    type: 'website',
  },
  twitter: {
    title: 'DólarYa | Precio del dólar hoy en Argentina',
    description:
      'La forma más fácil de seguir las cotizaciones del dólar en Argentina y conocer valores históricos. Todo en tiempo real y sin publicidad.',
    card: 'summary_large_image',
    site: '@dolarya_info',
    creator: '@sgalanb',
  },
}

export type Prices = Record<
  string,
  {
    ask: number | null
    bid?: number | null
    timestamp: string
    today: number[]
  }
>

export default async function Home() {
  const supabase = createClient()

  async function getTodayPrices(type: string) {
    const query = await supabase
      .from('last-prices')
      .select('ask, bid, timestamp')
      .eq('type', type)
      .order('timestamp', { ascending: true })
    return query.data as Prices['oficial'][]
  }

  const oficialToday = await getTodayPrices('oficial')
  const blueToday = await getTodayPrices('blue')
  const mepToday = await getTodayPrices('mep')
  const cocosToday = await getTodayPrices('cocos')
  const tarjetaToday = await getTodayPrices('tarjeta')
  const mayoristaToday = await getTodayPrices('mayorista')
  const cclToday = await getTodayPrices('ccl')
  const criptoToday = await getTodayPrices('cripto')

  const prices = {
    oficial: {
      ask: oficialToday[oficialToday.length - 1].ask,
      bid: oficialToday[oficialToday.length - 1].bid,
      timestamp: oficialToday[oficialToday.length - 1].timestamp,
      today: oficialToday.map((price: any) => price.ask),
    },
    blue: {
      ask: blueToday[blueToday.length - 1].ask,
      bid: blueToday[blueToday.length - 1].bid,
      timestamp: blueToday[blueToday.length - 1].timestamp,
      today: blueToday.map((price: any) => price.ask),
    },
    mep: {
      ask: mepToday[mepToday.length - 1].ask,
      bid: mepToday[mepToday.length - 1].bid,
      timestamp: mepToday[mepToday.length - 1].timestamp,
      today: mepToday.map((price: any) => price.ask),
    },
    cocos: {
      ask: cocosToday[cocosToday.length - 1].ask,
      bid: cocosToday[cocosToday.length - 1].bid,
      timestamp: cocosToday[cocosToday.length - 1].timestamp,
      today: cocosToday.map((price: any) => price.ask),
    },
    tarjeta: {
      ask: tarjetaToday[tarjetaToday.length - 1].ask,
      timestamp: tarjetaToday[tarjetaToday.length - 1].timestamp,
      today: tarjetaToday.map((price: any) => price.ask),
    },
    mayorista: {
      ask: mayoristaToday[mayoristaToday.length - 1].ask,
      bid: mayoristaToday[mayoristaToday.length - 1].bid,
      timestamp: mayoristaToday[mayoristaToday.length - 1].timestamp,
      today: mayoristaToday.map((price: any) => price.ask),
    },
    ccl: {
      ask: cclToday[cclToday.length - 1].ask,
      bid: cclToday[cclToday.length - 1].bid,
      timestamp: cclToday[cclToday.length - 1].timestamp,
      today: cclToday.map((price: any) => price.ask),
    },
    cripto: {
      ask: criptoToday[criptoToday.length - 1].ask,
      bid: criptoToday[criptoToday.length - 1].bid,
      timestamp: criptoToday[criptoToday.length - 1].timestamp,
      today: criptoToday.map((price: any) => price.ask),
    },
  }

  return (
    <div className="flex flex-col items-center justify-center gap-9">
      <DolarsHome prices={prices} />
    </div>
  )
}
