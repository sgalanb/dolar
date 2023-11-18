import DolarTypePage from '@/components/DolarTypePage'
import { LastPricesInterface, getLastPrices } from '@/lib/firebaseSDK'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dólar MEP - Precio del dólar MEP hoy | DólarYa',
  description:
    'Seguí la cotización del dólar bolsa hoy en Argentina y mirá los gráficos históricos.',
}

export default async function MEP() {
  const lastPrices: LastPricesInterface = await getLastPrices()

  return <DolarTypePage type="MEP" lastPrices={lastPrices.mep} />
}
