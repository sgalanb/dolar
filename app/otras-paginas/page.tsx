import Image from 'next/image'
import Link from 'next/link'

export default function OtrasPaginas() {
  return (
    <div className="flex w-full flex-col gap-3">
      <h1 className="mb-3 flex w-full gap-2 text-xl font-semibold leading-5">
        Otras páginas
      </h1>
      <Link
        href="https://cedears.ar?ref=dolarya"
        target="_blank"
        className="flex h-fit w-full flex-col items-center justify-between gap-3 rounded-2xl bg-white p-3 shadow hover:opacity-80 dark:bg-zinc-800 dark:shadow-none md:h-32 md:flex-row"
      >
        <div className="order-2 flex h-full w-full flex-col items-start justify-center gap-1.5 md:order-1">
          <span className="text-xl font-semibold leading-5">
            Listado de CEDEARs
          </span>
          <span className="hidden text-sm md:block">
            Encuentra información actualizada sobre CEDEARs en Argentina.
            Precios, variaciones y más datos sobre Certificados de Depósito
            Argentinos.
          </span>
          <span className="w-full text-left text-sm font-normal tracking-tight text-black/50 dark:text-white/50">
            cedears.ar
          </span>
        </div>
        <div className="order-1 flex aspect-[1200/630] w-full overflow-hidden rounded md:order-2 md:max-w-[12.375rem]">
          <div className="relative flex h-full w-full">
            <Image src="https://i.ibb.co/cCmxFXk/meta-image.jpg" alt="" fill />
          </div>
        </div>
      </Link>

      <Link
        href="https://icons.com.ar?ref=dolarya"
        target="_blank"
        className="flex w-full flex-col items-center justify-between gap-3 rounded-2xl bg-white p-3 shadow hover:opacity-80 dark:bg-zinc-800 dark:shadow-none md:h-32 md:flex-row"
      >
        <div className="order-2 flex h-full w-full flex-col items-start justify-center gap-1.5 md:order-1">
          <span className="text-xl font-semibold leading-5">
            Fintech Icons Argentina
          </span>
          <span className="hidden text-sm md:block">
            Colección de +400 iconos en formato SVG relacionados con el mundo
            fintech de Argentina. Acciones, CEDEARs, FCI, Bancos, Apps y más.
          </span>
          <span className="w-full text-left text-sm font-normal tracking-tight text-black/50 dark:text-white/50">
            icons.com.ar
          </span>
        </div>
        <div className="order-1 flex aspect-[1200/630] w-full overflow-hidden rounded md:order-2 md:max-w-[12.375rem]">
          <div className="relative flex h-full w-full">
            <Image
              src="https://icons.com.ar/opengraph-image.png?45f4ae55736aa467"
              alt=""
              fill
            />
          </div>
        </div>
      </Link>
    </div>
  )
}
