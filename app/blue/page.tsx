import DolarTypePage from '@/components/DolarTypePage'
import { Separator } from '@/components/ui/separator'
import { createClient } from '@/utils/supabase/server'
import dayjs from 'dayjs'
import { Metadata } from 'next'
import Link from 'next/link'

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

  const lastBlue = await getLastPrice('blue')
  const perChangeBlue = await getPercentageChange('blue')
  const perChangeString = perChangeBlue.toFixed(2)?.replace('.', ',')
  const fecha = dayjs().subtract(3, 'hour').format('DD/MM - HH:mm')

  const ogImageURL =
    `https://sharepreviews.com/og/96aa1fff-29b4-41cc-9ea0-35fc1b378973?` +
    `${
      perChangeBlue >= 0
        ? 'positive_diff_isVisible=true'
        : 'negative_diff_isVisible=true'
    }` +
    `&${
      perChangeBlue >= 0
        ? `positive_diff_value=%2b%20${perChangeString}%25`
        : `negative_diff_value=%20${perChangeString}%25`
    }` +
    `&ask_price_value=${lastBlue?.ask}&bid_price_value=${lastBlue?.bid}&fecha_value=${fecha}&dolar_type_value=Dólar%20Blue`

  return {
    title: 'Dólar Blue - Precio del dólar blue hoy | DólarYa',
    description:
      'Seguí la cotización del dólar informal hoy en Argentina y mirá los gráficos históricos.',
    openGraph: {
      title: 'Dólar Blue - Precio del dólar blue hoy | DólarYa',
      description:
        'Seguí la cotización del dólar informal hoy en Argentina y mirá los gráficos históricos.',
      images: [ogImageURL],
      type: 'website',
    },
    twitter: {
      title: 'Dólar Blue - Precio del dólar blue hoy | DólarYa',
      description:
        'Seguí la cotización del dólar informal hoy en Argentina y mirá los gráficos históricos.',
      images: [ogImageURL],
      card: 'summary_large_image',
      site: '@dolarya_info',
      creator: '@sgalanb',
    },
  }
}

export default async function Blue() {
  return (
    <div className="flex flex-col items-center justify-center gap-9">
      <DolarTypePage type="Blue" />
      <div className="flex w-full flex-col gap-3 md:grid md:grid-cols-[3fr,1px,1fr]">
        <div className="flex flex-col gap-3 rounded-2xl">
          <h2 className="text-xl font-semibold leading-5">
            ¿Qué es el dólar Blue?
          </h2>
          <p>
            El dólar blue o dólar informal es el tipo de cambio que se obtiene
            en el mercado informal de compra y venta de dólares (en
            &quot;cuevas&quot; o &quot;arbolitos&quot;). Surge como una
            alternativa al dólar oficial cuando el gobierno restringe el acceso
            a la compra del mismo.
          </p>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col items-start justify-start gap-3 rounded-2xl">
          <h2 className="text-xl font-semibold leading-5">Fuente de precios</h2>
          <Link
            href="https://criptoya.com/"
            className="flex items-center justify-center gap-1 hover:underline"
            target="_blank"
          >
            - CriptoYa
          </Link>
        </div>
      </div>
    </div>
  )
}
