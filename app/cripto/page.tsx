import DolarTypePage from '@/components/DolarTypePage'
import { LastPricesInterface, getLastPrices } from '@/lib/firebaseSDK'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dólar Cripto - Precio del dólar cripto hoy | DólarYa',
  description:
    'Seguí la cotización del dólar crypto hoy en Argentina y mirá los gráficos históricos.',
}

export default async function Cripto() {
  const lastPrices: LastPricesInterface = await getLastPrices()

  return <DolarTypePage type="Cripto" lastPrices={lastPrices.cripto} />
}
