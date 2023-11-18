import DolarTypePage from '@/components/DolarTypePage'
import { LastPricesInterface, getLastPrices } from '@/lib/firebaseSDK'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dólar CCL - Precio del dólar contado con liqui hoy | DólarYa',
  description:
    'Seguí la cotización del dólar contado con liquidación hoy en Argentina y mirá los gráficos históricos.',
}

export default async function CCL() {
  const lastPrices: LastPricesInterface = await getLastPrices()

  return <DolarTypePage type="CCL" lastPrices={lastPrices.ccl} />
}
