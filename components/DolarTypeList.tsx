'use client'

import { DolarType } from '@/components/DolarsHome'
import MiniLineChart from '@/components/charts/MiniLineChart'
import { useTheme } from 'next-themes'
import Link from 'next/link'

export default function DolarTypeList({ dolarType }: { dolarType: DolarType }) {
  const { resolvedTheme } = useTheme()

  const todayPrices: number[] = dolarType.today
    ? dolarType.today.map((today) => parseFloat(today.ask))
    : []

  const chartPrices = [
    ...todayPrices,
    parseFloat(dolarType.ask.replace(',', '.')),
  ]

  const porcentualChange =
    ((chartPrices[chartPrices.length - 1] - chartPrices[0]) / chartPrices[0]) *
    100

  const lineData = {
    labels: new Array(
      parseFloat(dolarType.ask.replace(',', '.')) ==
      todayPrices[todayPrices.length - 1]
        ? todayPrices.length
        : chartPrices.length
    ).fill(''),
    datasets: [
      {
        label: 'Prices',
        data:
          parseFloat(dolarType.ask.replace(',', '.')) ==
          todayPrices[todayPrices.length - 1]
            ? todayPrices
            : chartPrices,
        borderColor:
          dolarType.name == 'Cocos' && resolvedTheme == 'light'
            ? '#0062E1'
            : dolarType.name == 'Cocos' && resolvedTheme == 'dark'
            ? '#3b8df1'
            : chartPrices[0] <= chartPrices[chartPrices.length - 1]
            ? '#49ca4b'
            : '#D83141',
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
      } grid h-20 w-full grid-cols-[104px,1fr,100px] grid-rows-1 items-center gap-3 rounded-2xl bg-white p-3 shadow dark:bg-zinc-800 dark:shadow-none md:h-[5.15625rem]`}
    >
      <div className="flex h-full flex-col justify-between">
        <h2
          className={`${
            dolarType.name == 'Cocos'
              ? 'text-cocos-600 dark:text-cocos-500'
              : ''
          } w-full text-xl font-semibold leading-5 tracking-tight`}
        >
          {dolarType.name}
        </h2>
        <span
          className={`${
            dolarType.name == 'Cocos' && resolvedTheme == 'light'
              ? 'bg-cocos-600/20 text-cocos-600'
              : dolarType.name == 'Cocos' && resolvedTheme == 'dark'
              ? 'bg-cocos-500/20 text-cocos-500'
              : chartPrices[0] <= chartPrices[chartPrices.length - 1]
              ? 'bg-[#49ca4b]/20 text-[#49ca4b]'
              : 'bg-[#D83141]/20 text-[#D83141]'
          } w-fit rounded p-1 px-2 text-sm font-normal`}
        >
          {porcentualChange >= 0
            ? `+${porcentualChange.toFixed(2).replace('.', ',')} %`
            : `-${Math.abs(porcentualChange).toFixed(2).replace('.', ',')} %`}
        </span>
      </div>
      <div className="h-full w-full">
        <MiniLineChart lineData={lineData} />
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
