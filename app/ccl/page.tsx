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

  const lastCCL = await getLastPrice('ccl')
  const perChangeCCL = await getPercentageChange('ccl')
  const perChangeString = perChangeCCL.toFixed(2)?.replace('.', ',')
  const fecha = dayjs().subtract(3, 'hour').format('DD/MM - HH:mm')

  const ogImageURL =
    `https://sharepreviews.com/og/96aa1fff-29b4-41cc-9ea0-35fc1b378973?` +
    `${
      perChangeCCL >= 0
        ? 'positive_diff_isVisible=true'
        : 'negative_diff_isVisible=true'
    }` +
    `&${
      perChangeCCL >= 0
        ? `positive_diff_value=%2b%20${perChangeString}%25`
        : `negative_diff_value=%20${perChangeString}%25`
    }` +
    `&ask_price_value=${lastCCL?.ask}&bid_price_value=${lastCCL?.bid}&fecha_value=${fecha}&dolar_type_value=Dólar%20CCL`

  return {
    title: 'Dólar CCL - Precio del dólar contado con liqui hoy | DólarYa',
    description:
      'Seguí la cotización del dólar contado con liquidación hoy en Argentina y mirá los gráficos históricos.',
    openGraph: {
      title: 'Dólar CCL - Precio del dólar contado con liqui hoy | DólarYa',
      description:
        'Seguí la cotización del dólar contado con liquidación hoy en Argentina y mirá los gráficos históricos.',
      images: [ogImageURL],
      type: 'website',
    },
    twitter: {
      title: 'Dólar CCL - Precio del dólar contado con liqui hoy | DólarYa',
      description:
        'Seguí la cotización del dólar contado con liquidación hoy en Argentina y mirá los gráficos históricos.',
      images: [ogImageURL],
      card: 'summary_large_image',
      site: '@dolarya_info',
      creator: '@sgalanb',
    },
  }
}

export default async function CCL() {
  return (
    <div className="flex flex-col items-center justify-center gap-9">
      <DolarTypePage type="CCL" />
      <div className="flex w-full flex-col gap-3 md:grid md:grid-cols-[3fr,1px,1fr]">
        <div className="flex flex-col gap-3 rounded-2xl">
          <h2 className="text-xl font-semibold leading-5">
            ¿Qué es el dólar CCL?
          </h2>
          <p>
            El dólar CCL (Contado con Liquidación) es un mecanismo financiero
            utilizado en Argentina para obtener dólares de manera legal,
            evitando las restricciones del mercado cambiario oficial. Esta
            operatoria implica la compra de activos financieros (como bonos o
            acciones) en pesos en el mercado local, su transferencia a una
            cuenta en el exterior, y su posterior venta por dólares en el
            mercado internacional. El valor resultante de esta operación suele
            ser más alto que el del dólar oficial, reflejando más fielmente el
            precio de mercado de la divisa estadounidense en el país.
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
