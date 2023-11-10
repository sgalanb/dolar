import DolarTypePage from '@/components/DolarTypePage'
import OperaEnCocosButton from '@/components/OperaEnCocosButton'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dólar Cocos | DólarYa',
  description:
    'Seguí la cotización del dólar MEP 24/7 de Cocos hoy en Argentina. Mirá la cotización histórica.',
}

export default function Cocos() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-9">
      <DolarTypePage type="Cocos" />
      <OperaEnCocosButton />
    </div>
  )
}
