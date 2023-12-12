import DolarsHome from '@/components/DolarsHome'
import { LastPricesInterface, getLastPrices } from '@/lib/firebaseSDK'
import { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'DólarYa | Precio del dólar hoy en Argentina',
  description:
    'La forma más fácil de seguir las cotizaciones del dólar en Argentina y conocer valores históricos. Todo en tiempo real y sin publicidad.',
  twitter: {
    title: 'DólarYa | Precio del dólar hoy en Argentina',
    description:
      'La forma más fácil de seguir las cotizaciones del dólar en Argentina y conocer valores históricos. Todo en tiempo real y sin publicidad.',
    card: 'summary_large_image',
    site: '@dolarya_info',
  },
}

export default async function Home() {
  const lastPrices: LastPricesInterface = await getLastPrices()

  return (
    <div className="flex flex-col items-center justify-center gap-9">
      <DolarsHome lastPrices={lastPrices} />
      {/* <div className="flex w-full flex-col gap-3">
        <h2 className="w-full text-xl font-semibold tracking-tighter">
          Preguntas Frecuentes
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              ¿Qué es el dólar Oficial?
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-3">
                <p>
                  El dólar oficial es el establecido por el Banco Nación y sirve
                  de base para establecer otros tipos de dólar.
                </p>
                <Link href="/oficial">
                  <Button className="w-fit">Ver más</Button>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">
              ¿Qué es el dólar Blue?
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-3">
                <p>
                  También conocido como dólar informal o dólar paralelo. Es el
                  que se transacciona en las casas de cambio no oficiales,
                  comúnmente llamadas &quot;cuevas&quot;.
                </p>
                <Link href="/blue">
                  <Button className="w-fit">Ver más</Button>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">
              ¿Qué es el dólar MEP?
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-3">
                <p>
                  Dólar mep se llama a la compra de dólares realizada a través
                  del mercado de capitales. La operatoria consiste en comprar un
                  activo contra pesos y vender el mismo activo contra dólares.
                  Es una de las alternativas más populares para dolarizarte, ya
                  que es totalmente legal y podés comprar más de 200 por mes.
                  Podés comprar y vender dólar MEP de lunes a viernes de 11.00 a
                  16 hs.
                </p>
                <Link href="/mep">
                  <Button className="w-fit">Ver más</Button>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left text-cocos-600 dark:text-cocos-500">
              ¿Qué es el dólar Cocos?
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-3">
                <p>
                  El dólar Cocos representa la cotización del dólar MEP en la
                  aplicación de{' '}
                  <Link
                    href="https://cocos.capital/"
                    className="text-cocos-600 dark:text-cocos-500"
                    target="_blank"
                  >
                    Cocos Capital
                  </Link>
                  , la forma más fácil de comprar dólar MEP. Podés comprar y
                  vender dólar Cocos todos los días de la semana, las 24 horas
                  del día.
                </p>
                <Link href="/cocos">
                  <Button className="w-fit">Ver más</Button>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left">
              ¿Qué es el dólar Tarjeta?
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-3">
                <p>
                  Esta cotización representa los siguientes tipos de cambio, que
                  desde el 10 de Octubre del 2023 tienen el mismo valor:
                  <br />
                  - Dólar Ahorro
                  <br />
                  - Dólar Solidario
                  <br />
                  - Dólar Tarjeta
                  <br />
                  - Dólar Turista
                  <br />
                  - Dólar Qatar
                  <br />
                  Su valor es exactamente el doble que el Dólar Oficial, ya que
                  incluye el Impuesto PAIS, una percepción de Ganancias y una
                  percepción de Bienes Personales.
                </p>
                <Link href="/tarjeta">
                  <Button className="w-fit">Ver más</Button>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className="text-left">
              ¿Qué es el dólar Mayorista?
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-3">
                <p></p>
                <Link href="/mayorista">
                  <Button className="w-fit">Ver más</Button>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger className="text-left">
              ¿Qué es el dólar CCL?
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-3">
                <p></p>
                <Link href="/ccl">
                  <Button className="w-fit">Ver más</Button>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-8">
            <AccordionTrigger className="text-left">
              ¿Qué es el dólar Cripto?
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-3">
                <p></p>
                <Link href="/cripto">
                  <Button className="w-fit">Ver más</Button>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div> */}
    </div>
  )
}
