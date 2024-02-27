import { LastPrices } from '@/app/api/get-last-prices/types'
import DolarTypePage from '@/components/DolarTypePage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dólar Tarjeta - Precio del dólar tarjeta hoy | DólarYa',
  description:
    'Seguí la cotización del dólar tarjeta hoy en Argentina y mirá los gráficos históricos.',
  twitter: {
    title: 'Dólar Tarjeta - Precio del dólar tarjeta hoy | DólarYa',
    description:
      'Seguí la cotización del dólar tarjeta hoy en Argentina y mirá los gráficos históricos.',
    card: 'summary_large_image',
    site: '@dolarya_info',
  },
}

export default async function Tarjeta() {
  const lastPrices: LastPrices = await fetch(
    `https://dolarya.info/api/get-last-prices`,
    { next: { revalidate: 60 } }
  ).then((res) => res.json())
  return <DolarTypePage type="Tarjeta" lastPrices={lastPrices} />
}
