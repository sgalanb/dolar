import DolarTypePage from '@/components/DolarTypePage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dólar Oficial | DólarYa',
  description:
    'Seguí la cotización del dólar oficial hoy en Argentina. Mirá la cotización histórica.',
}

export default function Oficial() {
  return (
    <div className="flex w-full items-center justify-center">
      <DolarTypePage type="Oficial" />
    </div>
  )
}
