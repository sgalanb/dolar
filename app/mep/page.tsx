import { LastPrices } from '@/app/api/get-last-prices/types'
import DolarTypePage from '@/components/DolarTypePage'
import { Separator } from '@/components/ui/separator'
import { domain } from '@/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dólar MEP - Precio del dólar MEP hoy | DólarYa',
  description:
    'Seguí la cotización del dólar bolsa hoy en Argentina y mirá los gráficos históricos.',
  twitter: {
    title: 'Dólar MEP - Precio del dólar MEP hoy | DólarYa',
    description:
      'Seguí la cotización del dólar bolsa hoy en Argentina y mirá los gráficos históricos.',
    card: 'summary_large_image',
    site: '@dolarya_info',
  },
}

export default async function MEP() {
  const lastPrices: LastPrices = await fetch(
    `${domain}/api/get-last-prices`
  ).then((res) => res.json())

  return (
    <div className="flex flex-col items-center justify-center gap-9">
      <DolarTypePage type="MEP" lastPrices={lastPrices} />
      <div className="flex w-full flex-col gap-3 md:grid md:grid-cols-[3fr,1px,1fr]">
        <div className="flex flex-col gap-3 rounded-2xl">
          <h2 className="text-xl font-semibold leading-5">
            ¿Qué es el dólar MEP?
          </h2>
          <p>
            El dólar MEP o dólar bolsa es como se llama a la compra de dólares
            realizada a través del mercado de capitales. La operatoria consiste
            en la compra de un bono en pesos y su posterior venta en dólares.
            Los títulos más elegidos para hacerlo son el AL30 y el GD30.
          </p>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col items-start justify-start gap-3 rounded-2xl">
          <h2 className="text-xl font-semibold leading-5">Fuente de precios</h2>
          <Link
            href="https://app.cocos.capital?ref=dolarya.info"
            className="flex items-center justify-center gap-1 hover:underline"
            target="_blank"
          >
            - Cocos Capital
          </Link>
        </div>
      </div>
    </div>
  )
}
