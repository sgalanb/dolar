import { LastPrices } from '@/app/api/get-last-prices/types'
import DolarTypePage from '@/components/DolarTypePage'
import { getDiff } from '@/lib/utils'
import dayjs from 'dayjs'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const lastPrices: LastPrices = await fetch(
    `https://dolarya.info/api/get-last-prices`,
    { next: { revalidate: 60 } }
  ).then((res) => res.json())

  const cclBid = `$${lastPrices?.ccl?.bid?.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
  const cclAsk = `$${lastPrices?.ccl?.ask?.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
  const cclDiffNumber = getDiff(lastPrices?.ccl)
  const cclDiff = cclDiffNumber.toFixed(2)?.replace('.', ',')
  const fecha = dayjs().subtract(3, 'hour').format('DD/MM - HH:mm')

  const ogImageURL =
    `https://sharepreviews.com/og/96aa1fff-29b4-41cc-9ea0-35fc1b378973?` +
    `${
      cclDiffNumber >= 0
        ? 'positive_diff_isVisible=true'
        : 'negative_diff_isVisible=true'
    }` +
    `&${
      cclDiffNumber >= 0
        ? `positive_diff_value=%2b%20${cclDiff}%25`
        : `negative_diff_value=%20${cclDiff}%25`
    }` +
    `&ask_price_value=${cclAsk}&bid_price_value=${cclBid}&fecha_value=${fecha}&dolar_type_value=Dólar%20CCL`

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
  const lastPrices: LastPrices = await fetch(
    `https://dolarya.info/api/get-last-prices`,
    { next: { revalidate: 60 } }
  ).then((res) => res.json())

  return <DolarTypePage type="CCL" lastPrices={lastPrices} />
}
