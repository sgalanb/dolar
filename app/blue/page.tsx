import { Separator } from '@/components/ui/separator'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dólar Blue - Precio del dólar blue hoy | DólarYa',
  description:
    'Seguí la cotización del dólar informal hoy en Argentina y mirá los gráficos históricos.',
  twitter: {
    title: 'Dólar Blue - Precio del dólar blue hoy | DólarYa',
    description:
      'Seguí la cotización del dólar informal hoy en Argentina y mirá los gráficos históricos.',
    card: 'summary_large_image',
    site: '@dolarya_info',
  },
}

export default async function Blue() {
  // const lastPrices: LastPrices = await fetch(
  //   `${domain}/api/get-last-prices`
  // ).then((res) => res.json())

  return (
    <div className="flex flex-col items-center justify-center gap-9">
      {/* <DolarTypePage type="Blue" lastPrices={lastPrices} /> */}
      <div className="flex w-full flex-col gap-3 md:grid md:grid-cols-[3fr,1px,1fr]">
        <div className="flex flex-col gap-3 rounded-2xl">
          <h2 className="text-xl font-semibold leading-5">
            ¿Qué es el dólar Blue?
          </h2>
          <p>
            El dólar blue o dólar informal es el tipo de cambio que se obtiene
            en el mercado informal de compra y venta de dólares (en
            &quot;cuevas&quot; o &quot;arbolitos&quot;). Surge como una
            alternativa al dólar oficial cuando el gobierno restringe el acceso
            a la compra del mismo.
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
            - CriptoYa
          </Link>
        </div>
      </div>
    </div>
  )
}
