import { LastPrices } from '@/app/api/get-last-prices/types'
import DolarTypePage from '@/components/DolarTypePage'
import { Separator } from '@/components/ui/separator'
import { getDiff } from '@/lib/utils'
import dayjs from 'dayjs'
import { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  const lastPrices: LastPrices = await fetch(
    `https://dolarya.info/api/get-last-prices`,
    { next: { revalidate: 60 } }
  ).then((res) => res.json())

  const blueBid = lastPrices?.blue?.bid?.toFixed(2)?.replace('.', ',')
  const blueAsk = lastPrices?.blue?.ask?.toFixed(2)?.replace('.', ',')
  const blueDiffNumber = getDiff(lastPrices?.blue)
  const blueDiff = blueDiffNumber.toFixed(2)?.replace('.', ',')
  const fecha = dayjs().subtract(3, 'hour').format('DD/MM/YYYY - HH:mm')

  const ogImageURL =
    `https://sharepreviews.com/og/96aa1fff-29b4-41cc-9ea0-35fc1b378973?` +
    `${
      blueDiffNumber >= 0
        ? 'positive_diff_isVisible=true'
        : 'negative_diff_isVisible=true'
    }` +
    `&${
      blueDiffNumber >= 0
        ? `positive_diff_value=%2b%20${blueDiff}%25`
        : `negative_diff_value=%20${blueDiff}%25`
    }` +
    `&ask_price_value=${blueAsk}&bid_price_value=${blueBid}&fecha_value=${fecha}&dolar_type_value=Dólar%20Blue`

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
  const lastPrices: LastPrices = await fetch(
    `https://dolarya.info/api/get-last-prices`,
    { next: { revalidate: 60 } }
  ).then((res) => res.json())

  return (
    <div className="flex flex-col items-center justify-center gap-9">
      <DolarTypePage type="Blue" lastPrices={lastPrices} />
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
            href="https://blueya.com/"
            className="flex items-center justify-center gap-1 hover:underline"
            target="_blank"
          >
            - blueYa
          </Link>
        </div>
      </div>
    </div>
  )
}
