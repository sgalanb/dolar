import DolarTypePage from '@/components/DolarTypePage'
import OperaEnCocosButton from '@/components/OperaEnCocosButton'
import { LastPricesInterface, getLastPrices } from '@/lib/firebaseSDK'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dólar Cocos - Precio del dólar Cocos hoy | DólarYa',
  description:
    'Seguí la cotización del dólar Cocos 24/7 hoy en Argentina y mirá los gráficos históricos.',
}

export default async function Cocos() {
  const lastPrices: LastPricesInterface = await getLastPrices()

  return (
    <div className="flex flex-col items-center justify-center gap-9">
      <DolarTypePage type="Cocos" lastPrices={lastPrices.cocos} />
      <OperaEnCocosButton />
    </div>
  )
}
