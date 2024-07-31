import DolarsHome from '@/components/DolarsHome'
import { createClient } from '@/utils/supabase/server'
import dayjs from 'dayjs'
import { Metadata } from 'next'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const supabase = createClient()

  async function getLastPrice(type: string) {
    const query = await supabase
      .from('historical-prices')
      .select('ask, bid')
      .eq('type', type)
      .order('timestamp', { ascending: false })
      .limit(1)
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
      .limit(1)
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
  const lastCripto = await getLastPrice('cripto')
  const perChangeCripto = await getPercentageChange('cripto')

  const fecha = dayjs().subtract(3, 'hour').format('DD/MM - HH:mm')

  const ogImageURL =
    `https://sharepreviews.com/og/c53d5587-3530-418e-908b-270eb6440c43?` +
    `${
      perChangeOficial >= 0
        ? 'oficial_positive_diff_isVisible=true'
        : 'oficial_negative_diff_isVisible=true'
    }` +
    `&${
      perChangeBlue >= 0
        ? 'blue_positive_diff_isVisible=true'
        : 'blue_negative_diff_isVisible=true'
    }` +
    `&${
      perChangeMep >= 0
        ? 'mep_positive_diff_isVisible=true'
        : 'mep_negative_diff_isVisible=true'
    }` +
    `&${
      perChangeCripto >= 0
        ? 'cripto_positive_diff_isVisible=true'
        : 'cripto_negative_diff_isVisible=true'
    }` +
    `&${
      perChangeOficial >= 0
        ? `oficial_positive_diff_value=%2b%20${perChangeOficial}%25`
        : `oficial_negative_diff_value=%20${perChangeOficial}%25`
    }` +
    `&oficial_ask_value=${lastOficial?.ask}&oficial_bid_value=${lastOficial?.bid}` +
    `&${
      perChangeBlue >= 0
        ? `blue_positive_diff_value=%2b%20${perChangeBlue}%25`
        : `blue_negative_diff_value=%20${perChangeBlue}%25`
    }` +
    `&blue_ask_value=${lastBlue?.ask}&blue_bid_value=${lastBlue?.bid}` +
    `&${
      perChangeMep >= 0
        ? `mep_positive_diff_value=%2b%20${perChangeMep}%25`
        : `mep_negative_diff_value=%20${perChangeMep}%25`
    }` +
    `&mep_ask_value=${lastMep?.ask}&mep_bid_value=${lastMep?.bid}` +
    `&${
      perChangeCripto >= 0
        ? `cripto_positive_diff_value=%2b%20${perChangeCripto}%25`
        : `cripto_negative_diff_value=%20${perChangeCripto}%25`
    }` +
    `&cripto_ask_value=${lastCripto?.ask}&cripto_bid_value=${lastCripto?.bid}&fecha_value=${fecha}`

  return {
    title: 'DólarYa | Precio del dólar hoy en Argentina',
    description:
      'La forma más fácil de seguir las cotizaciones del dólar en Argentina y conocer valores históricos. Todo en tiempo real y sin publicidad.',
    openGraph: {
      title: 'DólarYa | Precio del dólar hoy en Argentina',
      description:
        'La forma más fácil de seguir las cotizaciones del dólar en Argentina y conocer valores históricos. Todo en tiempo real y sin publicidad.',
      images: [ogImageURL],
      type: 'website',
    },
    twitter: {
      title: 'DólarYa | Precio del dólar hoy en Argentina',
      description:
        'La forma más fácil de seguir las cotizaciones del dólar en Argentina y conocer valores históricos. Todo en tiempo real y sin publicidad.',
      images: [ogImageURL],
      card: 'summary_large_image',
      site: '@dolarya_info',
      creator: '@sgalanb',
    },
  }
}

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-9">
      <DolarsHome />
    </div>
  )
}
