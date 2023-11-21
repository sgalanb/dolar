import {
  CategoryScale,
  Chart,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { useTheme } from 'next-themes'
import { Line } from 'react-chartjs-2'

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
)

export default function LineChart({ lineData }: any) {
  const { resolvedTheme } = useTheme()

  const hoverLine = {
    id: 'hover-line',
    afterDatasetsDraw: function (chart: any, args: any, plugins: any) {
      const {
        ctx,
        tooltip,
        chartArea: { top, bottom, left, right, width, height },
        scales: { x, y },
      } = chart

      if (tooltip._active.length > 0) {
        const xCoor = x.getPixelForValue(tooltip.dataPoints[0].dataIndex)
        const yCoor = y.getPixelForValue(tooltip.dataPoints[0].parsed.y)

        ctx.save()
        ctx.beginPath()
        ctx.lineWidth = 1
        ctx.strokeStyle =
          resolvedTheme == 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'
        ctx.setLineDash([4, 4])
        ctx.moveTo(xCoor, top)
        ctx.lineTo(xCoor, bottom)
        ctx.stroke()
        ctx.closePath()
      }
    },
  }

  return (
    <Line
      data={lineData}
      options={{
        maintainAspectRatio: true,
        scales: {
          x: {
            grid: {
              color: 'rgba(161, 161, 170, 0.1)',
            },
            ticks: {
              maxTicksLimit: 10,
              minRotation: 45,
              maxRotation: 0,
              color: '#a1a1aa',
            },
          },
          y: {
            grid: {
              color: 'rgba(161, 161, 170, 0.1)',
            },
            ticks: {
              color: '#a1a1aa',
            },
          },
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false,
        },
      }}
      plugins={[hoverLine]}
      className="touch-none hover:cursor-cell"
    />
  )
}
