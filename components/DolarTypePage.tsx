'use client'

import HistoricalCharts from '@/components/HistoricalCharts'
import { getLastPricesSnapshot } from '@/lib/firebaseSDK'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import { useTheme } from 'next-themes'
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

export default function DolarTypePage({
  type,
  lastPrices,
}: {
  type: string
  lastPrices: any
}) {
  const { resolvedTheme } = useTheme()

  const [dolarType, setDolarType] = useState(lastPrices)

  useEffect(() => {
    let unsubscribe: () => void

      // Immediately invoked async function to handle the promise
    ;(async () => {
      unsubscribe = await getLastPricesSnapshot((newPrices) => {
        setDolarType(newPrices[type.toLowerCase()]) // Update the prices state whenever there's a change
      })
    })()

    // Unsubscribe from the snapshot listener when the component unmounts
    return () => {
      if (unsubscribe) unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
          <div className="flex flex-col items-start justify-center text-sm font-normal tracking-wider text-zinc-500 dark:text-zinc-400">
            <p>
              {dayjs.unix(dolarType.timestamp).format('DD/MM/YYYY - HH:mm')}
            </p>
            <p>{dayjs.unix(dolarType.timestamp).locale('es').fromNow()}</p>
          </div>
          {/* </div> */}
        </div>
        {dolarType.bid ? (
          <div className="flex w-40 flex-col items-center justify-center gap-3">
            <div className="flex w-full items-center justify-between">
              <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
                Vendé
              </span>
              <p className="text-xl font-semibold leading-5 text-zinc-500 dark:text-zinc-400">
                {`$${dolarType.bid.toLocaleString('es-AR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
              </p>
            </div>
            <div className="flex w-full items-center justify-between">
              <span className="text-sm font-normal ">Comprá</span>
              <p className="text-xl font-semibold leading-5">{`$${dolarType.ask.toLocaleString(
                'es-AR',
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}`}</p>
            </div>
          </div>
        ) : (
          <div className="flex w-40 flex-col items-center justify-center">
            <div className="flex w-full items-center justify-between">
              <span className="text-sm font-normal">Comprá</span>
              <p className="text-xl font-semibold leading-5">{`$${dolarType.ask.toLocaleString(
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
      <HistoricalCharts type={type} lastPrices={dolarType} />
    </div>
  )
}
