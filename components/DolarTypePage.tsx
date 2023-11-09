'use client'

import LineChart from '@/components/charts/LineChart'
import Spinner from '@/components/ui/spinner'
import {
  getHistoricalYearPrices,
  getLastPricesSnapshot,
} from '@/lib/firebaseSDK'
import dayjs from 'dayjs'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function DolarTypePage({ type }: { type: string }) {
  const { resolvedTheme } = useTheme()

  const [dolarType, setDolarType] = useState<any>()

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
  }, [])

  const [historicalYearPrices, setHistoricalYearPrices] = useState<[any] | []>(
    []
  )

  useEffect(() => {
    let unsubscribe: () => void

      // Immediately invoked async function to handle the promise
    ;(async () => {
      unsubscribe = await getHistoricalYearPrices(
        type.toLowerCase(),
        (newPrices) => {
          setHistoricalYearPrices(newPrices) // Update the prices state whenever there's a change
        }
      )
    })()

    // Unsubscribe from the snapshot listener when the component unmounts
    return () => {
      if (unsubscribe) unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const lineData = {
    labels: historicalYearPrices.map((data, index) => {
      return dayjs.unix(data.timestamp.seconds).format("DD MMM 'YY")
    }),
    datasets: [
      {
        label: 'Precio',
        data: historicalYearPrices.map((data, index) => {
          return data.ask
        }),

        fill: false,
        backgroundColor:
          type == 'Cocos'
            ? resolvedTheme == 'dark'
              ? '#3b8df1'
              : '#0062E1'
            : resolvedTheme == 'dark'
            ? 'white'
            : 'black',
        borderColor:
          type == 'Cocos'
            ? resolvedTheme == 'dark'
              ? '#3b8df1'
              : '#0062E1'
            : resolvedTheme == 'dark'
            ? 'white'
            : 'black',
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 0, // No points
        pointHoverRadius: 5,
        borderCapStyle: 'round',
      },
    ],
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-9">
      {dolarType ? (
        <>
          <div
            className={`flex w-full items-center justify-between gap-3 rounded-2xl`}
          >
            <div className="flex w-fit flex-col items-start justify-center gap-3">
              <h2 className={`w-full text-xl font-semibold leading-5`}>
                {`Dólar ${type}`}
              </h2>
              <p className="text-sm font-normal tracking-wider text-zinc-500 dark:text-zinc-400">
                {dayjs
                  .unix(dolarType.timestamp.seconds)
                  .format('DD/MM/YYYY - HH:mm')}
              </p>
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
          <LineChart lineData={lineData} />
        </>
      ) : (
        <Spinner />
      )}
    </div>
  )
}
