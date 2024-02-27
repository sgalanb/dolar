'use client'

import { ChartPrices } from '@/app/api/get-chart-data/types'
import { LastPrices } from '@/app/api/get-last-prices/types'
import HistoricalCharts from '@/components/HistoricalCharts'
import { fetcher } from '@/lib/utils'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import useSWR from 'swr'
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

export default function DolarTypePage({
  type,
  lastPrices,
}: {
  type: string
  lastPrices: LastPrices
}) {
  const {
    data: prices,
    isLoading,
    error,
  }: {
    data: LastPrices
    isLoading: boolean
    error: any
  } = useSWR<any>('/api/get-last-prices', fetcher, {
    refreshInterval: 60000,
    fallbackData: lastPrices,
  })

  const {
    data: chartPrices,
  }: {
    data: ChartPrices
    isLoading: boolean
    error: any
  } = useSWR<any>(`/api/get-chart-data?type=${type.toLowerCase()}`, fetcher, {
    refreshInterval: 60000,
  })

  return (
    <div className="flex w-full flex-col items-center justify-center gap-9">
      <div
        className={`flex w-full items-center justify-between gap-3 rounded-2xl`}
      >
        <div className="flex w-fit flex-col items-start justify-center gap-3">
          <h1
            className={`w-full text-xl font-semibold leading-5`}
          >{`Dólar ${type}`}</h1>
          {/* <div className="flex items-center justify-start gap-2">
          <CalendarClock
            className="h-5 w-5"
            color={resolvedTheme == 'dark' ? '#a1a1aa' : '#71717a'}
          /> */}
          <div className="flex flex-col items-start justify-center text-sm font-normal tracking-wider text-black/50 dark:text-white/50">
            <p>
              {dayjs(prices[type.toLowerCase()]?.timestamp).format(
                'DD/MM/YYYY - HH:mm'
              )}
            </p>
            <p>
              {dayjs(prices[type.toLowerCase()]?.timestamp)
                .locale('es')
                .fromNow()}
            </p>
          </div>
          {/* </div> */}
        </div>
        {prices[type.toLowerCase()]?.bid ? (
          <div className="flex w-40 flex-col items-center justify-center gap-3">
            <div className="flex w-full items-center justify-between">
              <span className="text-sm font-normal text-black/50 dark:text-white/50">
                Vendé
              </span>
              <p className="text-xl font-semibold leading-5 text-black/50 dark:text-white/50">
                {`$${prices[type.toLowerCase()]?.bid?.toLocaleString('es-AR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
              </p>
            </div>
            <div className="flex w-full items-center justify-between">
              <span className="text-sm font-normal ">Comprá</span>
              <p className="text-xl font-semibold leading-5">{`$${prices[
                type.toLowerCase()
              ]?.ask?.toLocaleString('es-AR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}</p>
            </div>
          </div>
        ) : (
          <div className="flex w-40 flex-col items-center justify-center">
            <div className="flex w-full items-center justify-between">
              <span className="text-sm font-normal">Comprá</span>
              <p className="text-xl font-semibold leading-5">{`$${prices[
                type.toLowerCase()
              ]?.ask?.toLocaleString('es-AR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}</p>
            </div>
          </div>
        )}
      </div>
      <HistoricalCharts
        type={type}
        lastPrices={prices}
        chartPrices={chartPrices}
      />
    </div>
  )
}
