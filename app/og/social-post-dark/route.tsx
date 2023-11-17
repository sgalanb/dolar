import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    // Data
    const { searchParams } = new URL(request.url)

    const date = searchParams.get('date') ?? ''
    const time = searchParams.get('time') ?? ''

    const name1 = searchParams.get('name1') ?? ''
    const name2 = searchParams.get('name2') ?? ''
    const name3 = searchParams.get('name3') ?? ''
    const name4 = searchParams.get('name4') ?? ''
    const name5 = searchParams.get('name5') ?? ''
    const name6 = searchParams.get('name6') ?? ''
    const name7 = searchParams.get('name7') ?? ''
    const name8 = searchParams.get('name8') ?? ''

    const ask1 = parseFloat(searchParams.get('ask1') ?? '') ?? null
    const ask2 = parseFloat(searchParams.get('ask2') ?? '') ?? null
    const ask3 = parseFloat(searchParams.get('ask3') ?? '') ?? null
    const ask4 = parseFloat(searchParams.get('ask4') ?? '') ?? null
    const ask5 = parseFloat(searchParams.get('ask5') ?? '') ?? null
    const ask6 = parseFloat(searchParams.get('ask6') ?? '') ?? null
    const ask7 = parseFloat(searchParams.get('ask7') ?? '') ?? null
    const ask8 = parseFloat(searchParams.get('ask8') ?? '') ?? null

    const bid1 = parseFloat(searchParams.get('bid1') ?? '') ?? null
    const bid2 = parseFloat(searchParams.get('bid2') ?? '') ?? null
    const bid3 = parseFloat(searchParams.get('bid3') ?? '') ?? null
    const bid4 = parseFloat(searchParams.get('bid4') ?? '') ?? null
    const bid5 = parseFloat(searchParams.get('bid5') ?? '') ?? null
    const bid6 = parseFloat(searchParams.get('bid6') ?? '') ?? null
    const bid7 = parseFloat(searchParams.get('bid7') ?? '') ?? null
    const bid8 = parseFloat(searchParams.get('bid8') ?? '') ?? null

    const percentageChange1 =
      parseFloat(searchParams.get('percentageChange1') ?? '') ?? null
    const percentageChange2 =
      parseFloat(searchParams.get('percentageChange2') ?? '') ?? null
    const percentageChange3 =
      parseFloat(searchParams.get('percentageChange3') ?? '') ?? null
    const percentageChange4 =
      parseFloat(searchParams.get('percentageChange4') ?? '') ?? null
    const percentageChange5 =
      parseFloat(searchParams.get('percentageChange5') ?? '') ?? null
    const percentageChange6 =
      parseFloat(searchParams.get('percentageChange6') ?? '') ?? null
    const percentageChange7 =
      parseFloat(searchParams.get('percentageChange7') ?? '') ?? null
    const percentageChange8 =
      parseFloat(searchParams.get('percentageChange8') ?? '') ?? null

    const geistMedium = await fetch(
      new URL('../../../assets/Geist-Medium.otf', import.meta.url)
    ).then((res) => res.arrayBuffer())

    const geistSemiBold = await fetch(
      new URL('../../../assets/Geist-SemiBold.otf', import.meta.url)
    ).then((res) => res.arrayBuffer())

    const geistBold = await fetch(
      new URL('../../../assets/Geist-Bold.otf', import.meta.url)
    ).then((res) => res.arrayBuffer())

    const logo = await fetch(
      new URL('../../../assets/money-with-wings.png', import.meta.url)
    ).then((res) => res.arrayBuffer() as any)

    interface DolarTypeInterface {
      name: string | null
      ask: number | null
      bid: number | null
      percentageChange: number | null
    }

    const dolarTypes: DolarTypeInterface[][] = [
      [
        {
          name: name1,
          ask: ask1,
          bid: bid1,
          percentageChange: percentageChange1,
        },
        {
          name: name2,
          ask: ask2,
          bid: bid2,
          percentageChange: percentageChange2,
        },
      ],
      [
        {
          name: name3,
          ask: ask3,
          bid: bid3,
          percentageChange: percentageChange3,
        },
        {
          name: name4,
          ask: ask4,
          bid: bid4,
          percentageChange: percentageChange4,
        },
      ],
      [
        {
          name: name5,
          ask: ask5,
          bid: bid5,
          percentageChange: percentageChange5,
        },
        {
          name: name6,
          ask: ask6,
          bid: bid6,
          percentageChange: percentageChange6,
        },
      ],
      [
        {
          name: name7,
          ask: ask7,
          bid: bid7,
          percentageChange: percentageChange7,
        },
        {
          name: name8,
          ask: ask8,
          bid: bid8,
          percentageChange: percentageChange8,
        },
      ],
    ]

    const priceStyle = {
      fontSize: 48,
      fontFamily: 'Geist-SemiBold',
      lineHeight: 1,
      letterSpacing: -2,
    }

    return new ImageResponse(
      (
        <div tw="w-full h-full p-20 flex flex-col justify-between items-center bg-[#09090b]">
          {/* Header */}
          <div tw="text-white h-16 border-b border-zinc-400 w-full flex justify-between mb-[40px]">
            <span
              style={{
                fontSize: 48,
                fontFamily: 'Geist-Bold',
                lineHeight: 1,
                letterSpacing: -2,
              }}
            >
              {date}
            </span>
            <span
              style={{
                fontSize: 48,
                fontFamily: 'Geist-Medium',
                lineHeight: 1,
                letterSpacing: -2,
              }}
            >
              {time}
            </span>
          </div>
          {/* Content */}
          <div tw="flex flex-col w-full h-[832px]">
            {dolarTypes.map((dolarType, index) => (
              <div
                key={index}
                tw={`${index == 0 ? '' : 'mt-[40px]'} flex w-full`}
              >
                {dolarType.map((dolar, index) => (
                  <div
                    key={dolar.name}
                    tw={`${index == 0 ? 'mr-[40px]' : ''} ${
                      dolar.name == 'Cocos'
                        ? 'border-[4px] border-[#3B8DF1] p-[26px]'
                        : 'p-[30px]'
                    } flex flex-col justify-between items-center w-[500px] h-[177.5px] bg-zinc-800 rounded-2xl`}
                  >
                    <div tw="flex justify-between items-center w-full">
                      <span
                        tw={`${
                          dolar.name == 'Cocos'
                            ? 'text-[#3B8DF1]'
                            : 'text-white'
                        }`}
                        style={priceStyle}
                      >
                        {dolar.name}
                      </span>
                      {dolar.name !== 'Tarjeta' && (
                        <span
                          tw="text-zinc-400"
                          style={{
                            fontSize: 48,
                            fontFamily: 'Geist-Medium',
                            lineHeight: 1,
                            letterSpacing: -2,
                          }}
                        >
                          {dolar.bid?.toFixed(2).replace('.', ',')}
                        </span>
                      )}
                    </div>
                    <div tw="flex justify-between items-center w-full">
                      <span
                        tw={`${
                          dolar.name == 'Cocos'
                            ? 'text-[#3B8DF1]'
                            : dolar?.percentageChange! >= 0
                            ? 'text-[#49ca4b]'
                            : 'text-[#D83141]'
                        } `}
                        style={priceStyle}
                      >
                        {dolar.percentageChange! >= 0
                          ? `+ ${dolar
                              .percentageChange!.toFixed(2)
                              .replace('.', ',')} %`
                          : `-  ${Math.abs(dolar.percentageChange!)
                              .toFixed(2)
                              .replace('.', ',')} %`}
                      </span>
                      <span
                        tw={`${dolar.name == 'Tarjeta' ? '' : ''} text-white`}
                        style={
                          dolar.name == 'Tarjeta'
                            ? {
                                fontSize: 48,
                                fontFamily: 'Geist-SemiBold',
                                lineHeight: 1,
                                letterSpacing: -2,
                                // translate up 50 px
                                transform: 'translateY(-34px)',
                              }
                            : {
                                fontSize: 48,
                                fontFamily: 'Geist-Bold',
                                lineHeight: 1,
                                letterSpacing: -2,
                              }
                        }
                      >
                        {dolar.ask?.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Footer */}
          <div tw="text-white h-16 border-t border-zinc-400 w-full flex items-end justify-between mt-[40px]">
            <div tw="flex items-center justify-center">
              <img width="36" height="36" src={logo} alt="" />
              <span
                style={{
                  fontSize: 48,
                  fontFamily: 'Geist-Bold',
                  lineHeight: 1,
                  letterSpacing: -2,
                  paddingLeft: 8,
                }}
              >
                DólarYa
              </span>
            </div>
            <span
              style={{
                fontSize: 48,
                fontFamily: 'Geist-Medium',
                lineHeight: 1,
                letterSpacing: -2,
              }}
            >
              dolarya.info
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 1200,
        fonts: [
          {
            name: 'Geist-Medium',
            data: geistMedium,
            style: 'normal',
          },
          {
            name: 'Geist-SemiBold',
            data: geistSemiBold,
            style: 'normal',
          },
          {
            name: 'Geist-Bold',
            data: geistBold,
            style: 'normal',
          },
        ],
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
