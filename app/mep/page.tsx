import DolarTypePage from '@/components/DolarTypePage'
import { LastPricesInterface, getLastPrices } from '@/lib/firebaseSDK'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dólar MEP | DólarYa',
  description:
    'Seguí la cotización del dólar MEP hoy en Argentina. Mirá la cotización histórica.',
}

export default async function MEP() {
  const lastPrices: LastPricesInterface = await getLastPrices()

  return <DolarTypePage type="MEP" lastPrices={lastPrices.mep} />
}
