'use client'

import { DolarType } from '@/components/DolarsHome'
import Link from 'next/link'

export default function DolarTypeList({ dolarType }: { dolarType: DolarType }) {
  return (
    <Link
      href={`/${dolarType.name.toLowerCase()}`}
      className={`${
        dolarType.name == 'Cocos'
          ? 'border-2 border-cocos-600 dark:border-cocos-500'
          : ''
      } flex h-20 w-full items-center justify-between gap-3 rounded-2xl bg-white p-3 dark:bg-zinc-800`}
    >
      <h2
        className={`${
          dolarType.name == 'Cocos' ? 'text-cocos-600 dark:text-cocos-500' : ''
        } min-w-[6.5rem] text-xl font-semibold leading-5`}
      >
        {dolarType.name}
      </h2>
      <div className="hidden w-fit xxs:flex">Chart</div>
      {dolarType.bid ? (
        <div className="flex h-full w-full max-w-[10rem] flex-col items-center justify-between">
          <div className="flex w-full items-center justify-between">
            <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
              Vendé
            </span>
            <p className="text-xl font-semibold leading-5">{dolarType.bid}</p>
          </div>
          <div className="flex w-full items-center justify-between">
            <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
              Comprá
            </span>
            <p className="text-xl font-semibold leading-5">{dolarType.ask}</p>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full max-w-[10rem] flex-col items-center justify-center">
          <div className="flex w-full items-center justify-between">
            <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
              Comprá
            </span>
            <p className="text-xl font-semibold leading-5">{dolarType.ask}</p>
          </div>
        </div>
      )}
    </Link>
  )
}
