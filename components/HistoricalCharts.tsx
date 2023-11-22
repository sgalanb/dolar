'use client'

import LastUpdateTime from '@/components/LastUpdateTime'
import LineChart from '@/components/charts/LineChart'
import { getChartsDataSnapshot } from '@/lib/firebaseSDK'
import dayjs from 'dayjs'
import { Timestamp } from 'firebase/firestore'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function HistoricalCharts({
  type,
  lastPrices,
}: {
  type: string
  lastPrices: any
}) {
  const { resolvedTheme } = useTheme()

  type ChartPricesType = {
    [key in '2a' | '1a' | '6m' | '3m' | '1m' | '1s' | '1d']: {
      ask: number | string
      timestamp: Timestamp
    }[]
  }

  const [chartPrices, setChartPrices] = useState<ChartPricesType | undefined>(
    undefined
  )

  useEffect(() => {
    let unsubscribe: () => void

      // Immediately invoked async function to handle the promise
    ;(async () => {
      unsubscribe = await getChartsDataSnapshot(type, (newPrices) => {
        setChartPrices(newPrices) // Update the prices state whenever there's a change
      })
    })()

    // Unsubscribe from the snapshot listener when the component unmounts
    return () => {
      if (unsubscribe) unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [selectedTime, setSelectedTime] = useState<
    '2a' | '1a' | '6m' | '3m' | '1m' | '1s' | '1d'
  >('3m')

  const timeOptions: {
    value: '2a' | '1a' | '6m' | '3m' | '1m' | '1s' | '1d'
    label: string
  }[] = [
    { value: '1d', label: '1D' },
    { value: '1s', label: '1S' },
    { value: '1m', label: '1M' },
    { value: '3m', label: '3M' },
    { value: '6m', label: '6M' },
    { value: '1a', label: '1A' },
    { value: '2a', label: '2A' },
  ]

  const lineData = {
    labels:
      selectedTime == '1d'
        ? [
            ...lastPrices.today.map((data: any) => {
              return dayjs.unix(data.timestamp).format('DD MMM HH:mm')
            }),
            'Actual',
          ]
        : !!chartPrices?.[selectedTime] &&
          chartPrices?.[selectedTime]?.length > 1
        ? selectedTime == '1m' || selectedTime == '1s'
          ? chartPrices?.[selectedTime]
              ?.map((data: any) => {
                return dayjs.unix(data.timestamp.seconds).format('DD MMM HH:mm')
              })
              .concat('Actual')
          : chartPrices?.[selectedTime]
              ?.map((data: any) => {
                return dayjs.unix(data.timestamp.seconds).format("DD MMM 'YY")
              })
              .concat('Actual')
        : [dayjs.unix(lastPrices.timestamp).format('DD MMM HH:mm'), 'Actual'],
    datasets: [
      {
        label: 'Precio',
        data:
          selectedTime == '1d'
            ? [
                ...lastPrices.today.map((data: any) => {
                  return data.ask.toFixed(2)
                }),
                lastPrices.ask.toFixed(2),
              ]
            : !!chartPrices?.[selectedTime] &&
              chartPrices?.[selectedTime]?.length > 1
            ? chartPrices?.[selectedTime]
                ?.map((data: any) => {
                  const ask = data.ask
                  const type = typeof ask
                  return type == 'number' ? ask.toFixed(2) : ask
                })
                .concat(lastPrices.ask.toFixed(2))
            : [lastPrices.ask, lastPrices.ask],
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
        tension: 0.1,
        pointRadius: 0, // No points
        pointHoverRadius: 5,
        borderCapStyle: 'round',
      },
    ],
  }

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-3">
        <div className="flex w-full items-center justify-between gap-3 rounded-2xl bg-zinc-200 p-1 dark:bg-zinc-800">
          {timeOptions.map((option: (typeof timeOptions)[0]) => (
            <button
              key={option.value}
              className={`w-full rounded-2xl px-2 py-1 text-sm font-semibold ${
                selectedTime == option.value
                  ? 'bg-zinc-100 dark:bg-zinc-950'
                  : 'text-black/50 dark:text-white/50'
              }`}
              onClick={() => setSelectedTime(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        {chartPrices ? (
          <LineChart lineData={lineData} />
        ) : (
          <div className="aspect-[2/1] w-full animate-pulse rounded-2xl dark:bg-zinc-800"></div>
        )}
        <LastUpdateTime />
      </div>
    </>
  )
}
