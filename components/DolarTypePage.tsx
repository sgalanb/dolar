'use client'

import HistoricalCharts from '@/components/HistoricalCharts'
import { createClient } from '@/utils/supabase/client'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import { useEffect, useState } from 'react'
require('dayjs/locale/es')

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

dayjs.updateLocale('es', {
  relativeTime: {
    future: 'en %s',
    past: 'Hace %s',
    s: 'unos segundos',
    m: 'un minuto',
    mm: '%d minutos',
    h: 'una hora',
    hh: '%d horas',
    d: 'un día',
    dd: '%d días',
    M: 'un mes',
    MM: '%d meses',
    y: 'un año',
    yy: '%d años',
  },
})

export default function DolarTypePage({ type }: { type: string }) {
  const supabase = createClient()

  async function getLastPrice(type: string) {
    const query = await supabase
      .from('historical-prices')
      .select('ask, bid, timestamp')
      .eq('type', type.toLowerCase())
      .order('timestamp', { ascending: false })
      .limit(1)
      .single()
    return query.data
  }

  const [lastPrice, setLastPrice] = useState<{
    ask: number | null
    bid: number | null
    timestamp: string
  } | null>(null)

  useEffect(() => {
    async function fetchData() {
      const lastPrice = await getLastPrice(type)
      setLastPrice(lastPrice)
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  return (
    <div className="flex w-full flex-col items-center justify-center gap-9">
      <div
        className={`flex w-full items-center justify-between gap-3 rounded-2xl`}
      >
        <div className="flex w-fit flex-col items-start justify-center gap-3">
          <h1 className={`flex w-full gap-2 text-xl font-semibold leading-5`}>
            {`Dólar ${type}`}
            <span className="hidden text-black/50 dark:text-white/50 sm:block">
              {type === 'MEP' || type === 'CCL'
                ? '(AL30 24HS)'
                : type === 'Cripto'
                  ? '(USDC)'
                  : ''}
            </span>
          </h1>
          <div className="flex flex-col items-start justify-center text-sm font-normal tracking-wider text-black/50 dark:text-white/50">
            <p className="block sm:hidden">
              {type === 'MEP' || type === 'CCL'
                ? 'AL30 | 24HS'
                : type === 'Cripto'
                  ? 'USDC'
                  : ''}
            </p>
            <p
              className={`${
                type === 'MEP' || type === 'CCL' || type === 'Cripto'
                  ? 'hidden sm:block'
                  : ''
              }`}
            >
              {dayjs(lastPrice?.timestamp).format('DD/MM/YYYY - HH:mm')}
            </p>
            <p>
              {dayjs(lastPrice?.timestamp)
                .locale('es')
                .fromNow()}
            </p>
          </div>
          {/* </div> */}
        </div>
        {lastPrice?.bid ? (
          <div className="flex w-40 flex-col items-center justify-center gap-3">
            <div className="flex w-full items-center justify-between">
              <span className="text-sm font-normal ">Comprá</span>
              <p className="text-xl font-semibold leading-5">{`$${lastPrice?.ask?.toLocaleString(
                'es-AR',
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}`}</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <span className="text-sm font-normal text-black/50 dark:text-white/50">
                Vendé
              </span>
              <p className="text-xl font-semibold leading-5 text-black/50 dark:text-white/50">
                {`$${lastPrice?.bid?.toLocaleString('es-AR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex w-40 flex-col items-center justify-center">
            <div className="flex w-full items-center justify-between">
              <span className="text-sm font-normal">Comprá</span>
              <p className="text-xl font-semibold leading-5">{`$${lastPrice?.ask?.toLocaleString(
                'es-AR',
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}`}</p>
            </div>
          </div>
        )}
      </div>
      <HistoricalCharts type={type} lastPrice={lastPrice} />
    </div>
  )
}
