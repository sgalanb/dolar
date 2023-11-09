import DolarTypePage from '@/components/DolarTypePage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dólar Mayorista | DólarYa',
  description:
    'Seguí la cotización del dólar mayorista hoy en Argentina. Mirá la cotización histórica.',
}

export default function Mayorista() {
  return (
    <div className="flex w-full items-center justify-center">
      <DolarTypePage type="Mayorista" />
    </div>
  )
}
