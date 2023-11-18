import DolarTypePage from '@/components/DolarTypePage'
import { LastPricesInterface, getLastPrices } from '@/lib/firebaseSDK'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dólar Blue - Precio del dólar blue hoy | DólarYa',
  description:
    'Seguí la cotización del dólar informal hoy en Argentina y mirá los gráficos históricos.',
}

export default async function Blue() {
  const lastPrices: LastPricesInterface = await getLastPrices()

  return <DolarTypePage type="Blue" lastPrices={lastPrices.blue} />
}
