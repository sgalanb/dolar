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

  const oficialBid = lastPrices?.oficial?.bid?.toFixed(2)?.replace('.', ',')
  const oficialAsk = lastPrices?.oficial?.ask?.toFixed(2)?.replace('.', ',')
  const oficialDiffNumber = getDiff(lastPrices?.oficial)
  const oficialDiff = oficialDiffNumber.toFixed(2)?.replace('.', ',')
  const fecha = dayjs().subtract(3, 'hour').format('DD/MM/YYYY - HH:mm')

  const ogImageURL =
    `https://sharepreviews.com/og/96aa1fff-29b4-41cc-9ea0-35fc1b378973?` +
    `${
      oficialDiffNumber >= 0
        ? 'positive_diff_isVisible=true'
        : 'negative_diff_isVisible=true'
    }` +
    `&${
      oficialDiffNumber >= 0
        ? `positive_diff_value=%2b%20${oficialDiff}%25`
        : `negative_diff_value=%20${oficialDiff}%25`
    }` +
    `&ask_price_value=${oficialAsk}&bid_price_value=${oficialBid}&fecha_value=${fecha}&dolar_type_value=Dólar%20Oficial`

  return {
    title: 'Dólar Oficial - Precio del dólar oficial hoy | DólarYa',
    description:
      'Seguí la cotización del dólar oficial hoy en Argentina y mirá los gráficos históricos.',
    openGraph: {
      title: 'Dólar Oficial - Precio del dólar oficial hoy | DólarYa',
      description:
        'Seguí la cotización del dólar oficial hoy en Argentina y mirá los gráficos históricos.',
      images: [ogImageURL],
      type: 'website',
    },
    twitter: {
      title: 'Dólar Oficial - Precio del dólar oficial hoy | DólarYa',
      description:
        'Seguí la cotización del dólar oficial hoy en Argentina y mirá los gráficos históricos.',
      images: [ogImageURL],
      card: 'summary_large_image',
      site: '@dolarya_info',
      creator: '@sgalanb',
    },
  }
}

export default async function Oficial() {
  const lastPrices: LastPrices = await fetch(
    `https://dolarya.info/api/get-last-prices`,
    { next: { revalidate: 60 } }
  ).then((res) => res.json())

  return <DolarTypePage type="Oficial" lastPrices={lastPrices} />
}
