'use client'

import { DolarType } from '@/components/DolarsHome'
import MiniLineChart from '@/components/charts/MiniLineChart'
import { getMiniLineChartPrices } from '@/lib/firebaseSDK'
import dayjs from 'dayjs'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function DolarTypeList({ dolarType }: { dolarType: DolarType }) {
  const { resolvedTheme } = useTheme()

  const [miniLineChartPrices, setMiniLineChartPrices] = useState<[number] | []>(
    []
  )

  useEffect(() => {
    let unsubscribe: () => void

      // Immediately invoked async function to handle the promise
    ;(async () => {
      unsubscribe = await getMiniLineChartPrices(
        dolarType.name.toLowerCase(),
        (newPrices) => {
          setMiniLineChartPrices(newPrices) // Update the prices state whenever there's a change
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
    labels: new Array(7).fill(''), // Replace with your actual labels if needed
    datasets: [
      {
        label: 'Prices',
        data: miniLineChartPrices, // Replace with your actual data
        borderColor:
          dolarType.name == 'Cocos' && resolvedTheme == 'light'
            ? '#0062E1'
            : dolarType.name == 'Cocos' && resolvedTheme == 'dark'
            ? '#3b8df1'
            : miniLineChartPrices?.length > 1 &&
              miniLineChartPrices[miniLineChartPrices.length - 1] >
                miniLineChartPrices[miniLineChartPrices.length - 2]
            ? '#65C567'
            : 'red',
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 0, // No points
        //pointBorderColor: 'white',
        borderCapStyle: 'round',
      },
    ],
  }

  return (
    <Link
      href={`/${dolarType.name.toLowerCase()}`}
      className={`${
        dolarType.name == 'Cocos'
          ? 'border-2 border-cocos-600 dark:border-cocos-500'
          : ''
      } grid h-20 w-full grid-cols-[104px,1fr,100px] grid-rows-1 items-center gap-3 rounded-2xl bg-white p-3 dark:bg-zinc-800 md:h-[5.15625rem]`}
    >
      <div className="flex h-full flex-col justify-between">
        <h2
          className={`${
            dolarType.name == 'Cocos'
              ? 'text-cocos-600 dark:text-cocos-500'
              : ''
          } w-full text-xl font-semibold leading-5`}
        >
          {dolarType.name}
        </h2>
        <p className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
          {dayjs.unix(dolarType.timestamp).format('HH:mm')}
        </p>
      </div>
      <div className="h-full w-full">
        {miniLineChartPrices?.length > 1 ? (
          <MiniLineChart lineData={lineData} />
        ) : (
          <div className="h-full w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-700" />
        )}
      </div>
      {dolarType.bid ? (
        <div className="flex h-full w-full flex-col items-end justify-between">
          <p className="text-xl font-semibold leading-5 text-zinc-500 dark:text-zinc-400">
            {dolarType.bid}
          </p>
          <p className="text-xl font-semibold leading-5">{dolarType.ask}</p>
        </div>
      ) : (
        <div className="flex h-full w-full max-w-[10rem] flex-col items-end justify-center">
          <p className="text-xl font-semibold leading-5">{dolarType.ask}</p>
        </div>
      )}
    </Link>
  )
}
