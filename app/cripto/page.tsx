import DolarTypePage from '@/components/DolarTypePage'
import { Separator } from '@/components/ui/separator'
import { LastPricesInterface, getLastPrices } from '@/lib/firebaseSDK'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dólar Cripto - Precio del dólar cripto hoy | DólarYa',
  description:
    'Seguí la cotización del dólar crypto hoy en Argentina y mirá los gráficos históricos.',
  twitter: {
    title: 'Dólar Cripto - Precio del dólar cripto hoy | DólarYa',
    description:
      'Seguí la cotización del dólar crypto hoy en Argentina y mirá los gráficos históricos.',
    card: 'summary_large_image',
    site: '@dolarya_info',
  },
}

export default async function Cripto() {
  const lastPrices: LastPricesInterface = await getLastPrices()

  return (
    <div className="flex flex-col items-center justify-center gap-9">
      <DolarTypePage type="Cripto" lastPrices={lastPrices.cripto} />
      <div className="flex w-full flex-col gap-3 md:grid md:grid-cols-[3fr,1px,1fr]">
        <div className="flex flex-col gap-3 rounded-2xl">
          <h2 className="text-xl font-semibold leading-5">
            ¿Qué es el dólar Cripto?
          </h2>
          <p>
            El dólar Cripto se refiere a un tipo de criptomoneda que está
            vinculada o anclada al valor del dólar estadounidense. Estas monedas
            digitales, conocidas como stablecoins o monedas estables, buscan
            ofrecer la estabilidad del dólar mientras mantienen las ventajas de
            las criptomonedas, como la descentralización y la fácil
            transferencia.
          </p>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col items-start justify-start gap-3 rounded-2xl">
          <h2 className="text-xl font-semibold leading-5">Fuente de precios</h2>
          <Link
            href="https://criptoya.com/"
            className="flex items-center justify-center gap-1 hover:underline"
            target="_blank"
          >
            - CriptoYa (promedio de los principales exchanges)
          </Link>
        </div>
      </div>
    </div>
  )
}
