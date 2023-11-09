import DolarTypePage from '@/components/DolarTypePage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dólar Tarjeta | DólarYa',
  description:
    'Seguí la cotización del dólar tarjeta hoy en Argentina. Mirá la cotización histórica.',
}

export default function Tarjeta() {
  return (
    <div className="flex w-full items-center justify-center">
      <DolarTypePage type="Tarjeta" />
    </div>
  )
}
