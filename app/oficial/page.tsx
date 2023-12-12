import DolarTypePage from '@/components/DolarTypePage'
import { LastPricesInterface, getLastPrices } from '@/lib/firebaseSDK'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dólar Oficial - Precio del dólar oficial hoy | DólarYa',
  description:
    'Seguí la cotización del dólar oficial hoy en Argentina y mirá los gráficos históricos.',
  twitter: {
    title: 'Dólar Oficial - Precio del dólar oficial hoy | DólarYa',
    description:
      'Seguí la cotización del dólar oficial hoy en Argentina y mirá los gráficos históricos.',
  },
}

export default async function Oficial() {
  const lastPrices: LastPricesInterface = await getLastPrices()

  return <DolarTypePage type="Oficial" lastPrices={lastPrices.oficial} />
}
