'use client'

import LastUpdateTime from '@/components/LastUpdateTime'
import LineChart from '@/components/charts/LineChart'
import { createClient } from '@/utils/supabase/client'
import dayjs from 'dayjs'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function HistoricalCharts({
  type,
  lastPrice,
}: {
  type: string
  lastPrice: {
    ask: number | null
    bid: number | null
    timestamp: string
  } | null
}) {
  const { resolvedTheme } = useTheme()

  const [selectedTime, setSelectedTime] = useState<
    '10a' | '5a' | '2a' | '1a' | '6m' | '3m' | '1m' | '1s' | '1d'
  >('1s')

  const [chartPrices, setChartPrices] = useState<
    | {
        ask: number | null
        timestamp: string
      }[]
    | null
  >(null)

  const supabase = createClient()

  async function getChartPrices(type: string, selectedTime: string) {
    const selectedDays =
      timeOptions.find((option) => option.value == selectedTime)?.days || 1
    const query = await supabase
      .from('historical-prices')
      .select('ask, timestamp')
      .eq('type', type.toLowerCase())
      .gte('timestamp', dayjs().subtract(selectedDays, 'day').toISOString())
      .order('timestamp', { ascending: true })
    return query.data
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getChartPrices(type, selectedTime)
      setChartPrices(data)
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, selectedTime])

  const lineData = {
    labels:
      chartPrices && chartPrices?.length > 1
        ? selectedTime == '1m' || selectedTime == '1s' || selectedTime == '1d'
          ? chartPrices
              ?.map((price) => {
                return dayjs(price.timestamp).format('DD MMM HH:mm')
              })
              .concat('Actual')
          : chartPrices
              ?.map((price) => {
                return dayjs(price.timestamp).format("DD MMM 'YY")
              })
              .concat('Actual')
        : [dayjs(lastPrice?.timestamp).format('DD MMM HH:mm'), 'Actual'],
    datasets: [
      {
        label: 'Precio',
        data:
          chartPrices && chartPrices?.length > 1
            ? chartPrices
                ?.map((price) => {
                  return price.ask?.toFixed(2)
                })
                .concat(lastPrice?.ask?.toFixed(2))
            : [lastPrice?.ask, lastPrice?.ask],
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
        <div className="flex w-full items-center justify-between gap-3 overflow-x-auto rounded-2xl bg-zinc-200 p-1 dark:bg-zinc-800">
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

const timeOptions: {
  value: '10a' | '5a' | '2a' | '1a' | '6m' | '3m' | '1m' | '1s' | '1d'
  label: string
  days: number
}[] = [
  { value: '1d', label: '1D', days: 1 },
  { value: '1s', label: '1S', days: 7 },
  { value: '1m', label: '1M', days: 30 },
  { value: '3m', label: '3M', days: 90 },
  { value: '6m', label: '6M', days: 180 },
  { value: '1a', label: '1A', days: 365 },
  { value: '2a', label: '2A', days: 730 },
  { value: '5a', label: '5A', days: 1825 },
]
