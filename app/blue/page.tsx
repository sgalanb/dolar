import DolarTypePage from '@/components/DolarTypePage'
import { LastPricesInterface, getLastPrices } from '@/lib/firebaseSDK'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dólar Blue | DólarYa',
  description:
    'Seguí la cotización del dólar blue hoy en Argentina. Mirá la cotización histórica.',
}

export default async function Blue() {
  const lastPrices: LastPricesInterface = await getLastPrices()

  return <DolarTypePage type="Blue" lastPrices={lastPrices.blue} />
}
