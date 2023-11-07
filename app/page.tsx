import { dolar } from '@/app/api/update-prices/route'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { kv } from '@vercel/kv'
import { Grid2X2, Rows } from 'lucide-react'
import Link from 'next/link'

export default async function Home() {
  const dolar: dolar | null = await kv.get('dolar')

  const rates = [
    {
      name: 'Oficial',
      bid: `${dolar?.oficial.bid.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      ask: `${dolar?.oficial.ask.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      name: 'Blue',
      bid: `${dolar?.blue.bid.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      ask: `${dolar?.blue.ask.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      name: 'MEP',
      bid: `${dolar?.mep.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      ask: `${dolar?.mep.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      name: 'Cocos',
      bid: `${dolar?.cocos.bid.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      ask: `${dolar?.cocos.ask.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      name: 'Tarjeta',
      ask: `${dolar?.solidario.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      name: 'Mayorista',
      ask: `${dolar?.solidario.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      name: 'CCL',
      bid: `${dolar?.ccl.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      ask: `${dolar?.ccl.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      name: 'Cripto',
      bid: `${dolar?.cripto.bid.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      ask: `${dolar?.cripto.ask.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center gap-9">
      <Tabs defaultValue="grid" className="flex w-full flex-col gap-3">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tighter">
            Cotización del dólar hoy
          </h1>
          <div className="flex h-full">
            <TabsList className="grid w-fit grid-cols-2 self-end">
              <TabsTrigger value="grid">
                <Grid2X2 className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="list">
                <Rows className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="grid" className="w-full self-center">
          <div className="grid w-full grid-cols-1 items-center justify-center gap-3 xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {rates.map((rate, index) => (
              <Link href={`/${rate.name.toLowerCase()}`} key={index}>
                <div
                  className={`${
                    rate.name == 'Cocos'
                      ? 'border-2 border-cocos-600 dark:border-cocos-500'
                      : ''
                  } flex aspect-square w-full flex-col items-center justify-between gap-3 rounded-2xl bg-white p-3 hover:opacity-80 dark:bg-zinc-800`}
                >
                  <h2
                    className={`${
                      rate.name == 'Cocos'
                        ? 'text-cocos-600 dark:text-cocos-500'
                        : ''
                    } w-full text-xl font-semibold leading-5`}
                  >
                    {rate.name}
                  </h2>
                  <div className="hidden w-fit xxs:flex">Chart</div>
                  {rate.bid ? (
                    <div className="flex w-full flex-col items-center justify-center gap-3">
                      <div className="flex w-full items-center justify-between">
                        <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
                          Vendé
                        </span>
                        <p className="text-xl font-semibold leading-5">
                          {rate.bid}
                        </p>
                      </div>
                      <div className="flex w-full items-center justify-between">
                        <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
                          Comprá
                        </span>
                        <p className="text-xl font-semibold leading-5">
                          {rate.ask}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-[3.25rem] w-full flex-col items-center justify-center">
                      <div className="flex w-full items-center justify-between">
                        <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
                          Comprá
                        </span>
                        <p className="text-xl font-semibold leading-5">
                          {rate.ask}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="list">
          <div className="flex w-full grid-cols-1 flex-col items-center justify-center gap-3">
            {rates.map((rate, index) => (
              <div
                className={`${
                  rate.name == 'Cocos'
                    ? 'border-2 border-cocos-600 dark:border-cocos-500'
                    : ''
                } flex h-20 w-full items-center justify-between gap-3 rounded-2xl bg-white p-3 dark:bg-zinc-800`}
                key={index}
              >
                <h2
                  className={`${
                    rate.name == 'Cocos'
                      ? 'text-cocos-600 dark:text-cocos-500'
                      : ''
                  } min-w-[6.5rem] text-xl font-semibold leading-5`}
                >
                  {rate.name}
                </h2>
                <div className="hidden w-fit xxs:flex">Chart</div>
                {rate.bid ? (
                  <div className="flex h-full w-full max-w-[10rem] flex-col items-center justify-between">
                    <div className="flex w-full items-center justify-between">
                      <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
                        Vendé
                      </span>
                      <p className="text-xl font-semibold leading-5">
                        {rate.bid}
                      </p>
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
                        Comprá
                      </span>
                      <p className="text-xl font-semibold leading-5">
                        {rate.ask}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full w-full max-w-[10rem] flex-col items-center justify-center">
                    <div className="flex w-full items-center justify-between">
                      <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
                        Comprá
                      </span>
                      <p className="text-xl font-semibold leading-5">
                        {rate.ask}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      <div className="flex w-full flex-col gap-3">
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
      </div>
    </div>
  )
}
