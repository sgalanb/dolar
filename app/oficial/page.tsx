import DolarTypePage from '@/components/DolarTypePage'
import { LastPricesInterface, getLastPrices } from '@/lib/firebaseSDK'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dólar Oficial | DólarYa',
  description:
    'Seguí la cotización del dólar oficial hoy en Argentina. Mirá la cotización histórica.',
}

export default async function Oficial() {
  const lastPrices: LastPricesInterface = await getLastPrices()

  return <DolarTypePage type="Oficial" lastPrices={lastPrices.oficial} />
}
