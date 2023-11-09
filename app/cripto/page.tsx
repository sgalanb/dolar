import DolarTypePage from '@/components/DolarTypePage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dólar Cripto | DólarYa',
  description:
    'Seguí la cotización del dólar cripto hoy en Argentina. Mirá la cotización histórica.',
}

export default function Cripto() {
  return (
    <div className="flex w-full items-center justify-center">
      <DolarTypePage type="Cripto" />
    </div>
  )
}
