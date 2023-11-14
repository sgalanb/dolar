import DolarTypePage from '@/components/DolarTypePage'
import { LastPricesInterface, getLastPrices } from '@/lib/firebaseSDK'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dólar Mayorista | DólarYa',
  description:
    'Seguí la cotización del dólar mayorista hoy en Argentina. Mirá la cotización histórica.',
}

export default async function Mayorista() {
  const lastPrices: LastPricesInterface = await getLastPrices()

  return <DolarTypePage type="Mayorista" lastPrices={lastPrices.mayorista} />
}
