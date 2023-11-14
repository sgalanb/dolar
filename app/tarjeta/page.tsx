import DolarTypePage from '@/components/DolarTypePage'
import { LastPricesInterface, getLastPrices } from '@/lib/firebaseSDK'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dólar Tarjeta | DólarYa',
  description:
    'Seguí la cotización del dólar tarjeta hoy en Argentina. Mirá la cotización histórica.',
}

export default async function Tarjeta() {
  const lastPrices: LastPricesInterface = await getLastPrices()

  return <DolarTypePage type="Tarjeta" lastPrices={lastPrices.tarjeta} />
}
