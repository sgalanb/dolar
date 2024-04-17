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

  const mepBid = `$${lastPrices?.mep?.bid?.toFixed(2)?.replace('.', ',')}`
  const mepAsk = `$${lastPrices?.mep?.ask?.toFixed(2)?.replace('.', ',')}`
  const mepDiffNumber = getDiff(lastPrices?.mep)
  const mepDiff = mepDiffNumber.toFixed(2)?.replace('.', ',')
  const fecha = dayjs().subtract(3, 'hour').format('DD/MM - HH:mm')

  const ogImageURL =
    `https://sharepreviews.com/og/96aa1fff-29b4-41cc-9ea0-35fc1b378973?` +
    `${
      mepDiffNumber >= 0
        ? 'positive_diff_isVisible=true'
        : 'negative_diff_isVisible=true'
    }` +
    `&${
      mepDiffNumber >= 0
        ? `positive_diff_value=%2b%20${mepDiff}%25`
        : `negative_diff_value=%20${mepDiff}%25`
    }` +
    `&ask_price_value=${mepAsk}&bid_price_value=${mepBid}&fecha_value=${fecha}&dolar_type_value=Dólar%20MEP`

  return {
    title: 'Dólar MEP - Precio del dólar MEP hoy | DólarYa',
    description:
      'Seguí la cotización del dólar bolsa hoy en Argentina y mirá los gráficos históricos.',
    openGraph: {
      title: 'Dólar MEP - Precio del dólar MEP hoy | DólarYa',
      description:
        'Seguí la cotización del dólar bolsa hoy en Argentina y mirá los gráficos históricos.',
      images: [ogImageURL],
      type: 'website',
    },
    twitter: {
      title: 'Dólar MEP - Precio del dólar MEP hoy | DólarYa',
      description:
        'Seguí la cotización del dólar bolsa hoy en Argentina y mirá los gráficos históricos.',
      images: [ogImageURL],
      card: 'summary_large_image',
      site: '@dolarya_info',
      creator: '@sgalanb',
    },
  }
}

export default async function MEP() {
  const lastPrices: LastPrices = await fetch(
    `https://dolarya.info/api/get-last-prices`,
    { next: { revalidate: 60 } }
  ).then((res) => res.json())

  return (
    <div className="flex flex-col items-center justify-center gap-9">
      <DolarTypePage type="MEP" lastPrices={lastPrices} />
      <div className="flex w-full flex-col gap-3 md:grid md:grid-cols-[3fr,1px,1fr]">
        <div className="flex flex-col gap-3 rounded-2xl">
          <h2 className="text-xl font-semibold leading-5">
            ¿Qué es el dólar MEP?
          </h2>
          <p>
            El dólar MEP o dólar bolsa es como se llama a la compra de dólares
            realizada a través del mercado de capitales. La operatoria consiste
            en la compra de un bono en pesos y su posterior venta en dólares.
            Los títulos más elegidos para hacerlo son el AL30 y el GD30.
          </p>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col items-start justify-start gap-3 rounded-2xl">
          <h2 className="text-xl font-semibold leading-5">Fuente de precios</h2>
          <Link
            href="https://mepya.com/"
            className="flex items-center justify-center gap-1 hover:underline"
            target="_blank"
          >
            - mepYa
          </Link>
        </div>
      </div>
    </div>
  )
}
