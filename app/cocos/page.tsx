import DolarTypePage from '@/components/DolarTypePage'
import { LastPricesInterface, getLastPrices } from '@/lib/firebaseSDK'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dólar Cocos | DólarYa',
  description:
    'Seguí la cotización del dólar MEP 24/7 de Cocos hoy en Argentina. Mirá la cotización histórica.',
}

export default async function Cocos() {
  const lastPrices: LastPricesInterface = await getLastPrices()

  return <DolarTypePage type="Cocos" lastPrices={lastPrices.cocos} />
}
