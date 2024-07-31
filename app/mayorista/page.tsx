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
      .single()
    return query.data
  }

  async function getPercentageChange(type: string) {
    const { data: basePrice } = await supabase
      .from('historical-prices')
      .select('ask')
      .eq('type', type)
      .lt('timestamp', dayjs().startOf('day').toDate())
      .order('timestamp', { ascending: false })
      .limit(1)
      .single()

    const { data: lastPrice } = await supabase
      .from('historical-prices')
      .select('ask')
      .eq('type', type)
      .gte('timestamp', dayjs().startOf('day').toDate())
      .lte('timestamp', dayjs().toDate())
      .order('timestamp', { ascending: false })
      .single()

    if (basePrice?.ask && lastPrice?.ask) {
      return ((lastPrice.ask - basePrice.ask) / basePrice.ask) * 100
    } else {
      return 0
    }
  }

  const lastMayorista = await getLastPrice('mayorista')
  const perChangeMayorista = await getPercentageChange('mayorista')
  const perChangeString = perChangeMayorista.toFixed(2)?.replace('.', ',')
  const fecha = dayjs().subtract(3, 'hour').format('DD/MM - HH:mm')

  const ogImageURL =
    `https://sharepreviews.com/og/96aa1fff-29b4-41cc-9ea0-35fc1b378973?` +
    `${
      perChangeMayorista >= 0
        ? 'positive_diff_isVisible=true'
        : 'negative_diff_isVisible=true'
    }` +
    `&${
      perChangeMayorista >= 0
        ? `positive_diff_value=%2b%20${perChangeString}%25`
        : `negative_diff_value=%20${perChangeString}%25`
    }` +
    `&ask_price_value=${lastMayorista?.ask}&bid_price_value=${lastMayorista?.bid}&fecha_value=${fecha}&dolar_type_value=Dólar%20Mayorista`

  return {
    title: 'Dólar Mayorista - Precio del dólar mayorista hoy | DólarYa',
    description:
      'Seguí la cotización del dólar mayorista hoy en Argentina y mirá los gráficos históricos.',
    openGraph: {
      title: 'Dólar Mayorista - Precio del dólar mayorista hoy | DólarYa',
      description:
        'Seguí la cotización del dólar mayorista hoy en Argentina y mirá los gráficos históricos.',
      images: [ogImageURL],
      type: 'website',
    },
    twitter: {
      title: 'Dólar Mayorista - Precio del dólar mayorista hoy | DólarYa',
      description:
        'Seguí la cotización del dólar mayorista hoy en Argentina y mirá los gráficos históricos.',
      images: [ogImageURL],
      card: 'summary_large_image',
      site: '@dolarya_info',
      creator: '@sgalanb',
    },
  }
}

export default async function Mayorista() {
  return (
    <div className="flex flex-col items-center justify-center gap-9">
      <DolarTypePage type="Mayorista" />
      <div className="flex w-full flex-col gap-3 md:grid md:grid-cols-[3fr,1px,1fr]">
        <div className="flex flex-col gap-3 rounded-2xl">
          <h2 className="text-xl font-semibold leading-5">
            ¿Qué es el dólar Mayorista?
          </h2>
          <p>
            El dólar Mayorista es el tipo de cambio utilizado para las
            operaciones entre bancos y grandes empresas y para las transacciones
            comerciales internacionales. Este tipo de cambio es regulado por el
            Banco Central de la República Argentina (BCRA).
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
