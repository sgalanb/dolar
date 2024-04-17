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

  const tarjetaBid = `$${lastPrices?.tarjeta?.bid?.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
  const tarjetaAsk = `$${lastPrices?.tarjeta?.ask?.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
  const tarjetaDiffNumber = getDiff(lastPrices?.tarjeta)
  const tarjetaDiff = tarjetaDiffNumber.toFixed(2)?.replace('.', ',')
  const fecha = dayjs().subtract(3, 'hour').format('DD/MM - HH:mm')

  const ogImageURL =
    `https://sharepreviews.com/og/96aa1fff-29b4-41cc-9ea0-35fc1b378973?` +
    `${
      tarjetaDiffNumber >= 0
        ? 'positive_diff_isVisible=true'
        : 'negative_diff_isVisible=true'
    }` +
    `&${
      tarjetaDiffNumber >= 0
        ? `positive_diff_value=%2b%20${tarjetaDiff}%25`
        : `negative_diff_value=%20${tarjetaDiff}%25`
    }` +
    `&ask_price_value=${tarjetaAsk}&bid_price_value=${tarjetaBid}&fecha_value=${fecha}&dolar_type_value=Dólar%20Tarjeta`

  return {
    title: 'Dólar Tarjeta - Precio del dólar tarjeta hoy | DólarYa',
    description:
      'Seguí la cotización del dólar tarjeta hoy en Argentina y mirá los gráficos históricos.',
    openGraph: {
      title: 'Dólar Tarjeta - Precio del dólar tarjeta hoy | DólarYa',
      description:
        'Seguí la cotización del dólar tarjeta hoy en Argentina y mirá los gráficos históricos.',
      images: [ogImageURL],
      type: 'website',
    },
    twitter: {
      title: 'Dólar Tarjeta - Precio del dólar tarjeta hoy | DólarYa',
      description:
        'Seguí la cotización del dólar tarjeta hoy en Argentina y mirá los gráficos históricos.',
      images: [ogImageURL],
      card: 'summary_large_image',
      site: '@dolarya_info',
      creator: '@sgalanb',
    },
  }
}

export default async function Tarjeta() {
  const lastPrices: LastPrices = await fetch(
    `https://dolarya.info/api/get-last-prices`,
    { next: { revalidate: 60 } }
  ).then((res) => res.json())
  return <DolarTypePage type="Tarjeta" lastPrices={lastPrices} />
}
