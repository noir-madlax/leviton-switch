"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ResponsiveContainer, 
  Scatter, 
  ScatterChart, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  Cell
} from "recharts"
import { ProductPainPoint, getSatisfactionColor, getBubbleSize } from "@/lib/competitorAnalysis"

interface CompetitorPainPointsMatrixProps {
  data: ProductPainPoint[]
  categoryFilter: 'all' | 'Physical' | 'Performance'
}

interface ProcessedDataPoint {
  product: string
  category: string
  categoryType: string
  mentions: number
  satisfactionRate: number
  positiveCount: number
  negativeCount: number
  totalReviews: number
  x: number  // 产品索引
  y: number  // 分类索引
  z: number  // 气泡大小
}

export function CompetitorPainPointsMatrix({ data, categoryFilter }: CompetitorPainPointsMatrixProps) {
  // 处理数据，转换为矩阵格式
  const processedData = useMemo(() => {
    if (!data || data.length === 0) return { chartData: [], products: [], categories: [], maxMentions: 1 }

    // 获取所有唯一的产品和分类
    const products = Array.from(new Set(data.map(d => d.product))).sort()
    const categories = Array.from(new Set(data.map(d => d.category))).sort()
    const maxMentions = Math.max(...data.map(d => d.mentions))

    // 创建矩阵数据点
    const chartData: ProcessedDataPoint[] = []
    
    products.forEach((product, productIndex) => {
      categories.forEach((category, categoryIndex) => {
        const dataPoint = data.find(d => d.product === product && d.category === category)
        if (dataPoint && dataPoint.mentions > 0) {
          chartData.push({
            ...dataPoint,
            x: productIndex,
            y: categoryIndex,
            z: getBubbleSize(dataPoint.mentions, maxMentions)
          })
        }
      })
    })

    return { chartData, products, categories, maxMentions }
  }, [data])

  // 自定义Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as ProcessedDataPoint
      return (
        <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{data.product}</p>
          <p className="text-sm text-gray-600 mb-2">{data.category}</p>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Mentions:</span>
              <span className="font-medium">{data.mentions}</span>
            </div>
            <div className="flex justify-between">
              <span>Satisfaction:</span>
              <span className="font-medium">{data.satisfactionRate}%</span>
            </div>
            <div className="flex justify-between">
              <span>Positive:</span>
              <span className="font-medium text-green-600">{data.positiveCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Negative:</span>
              <span className="font-medium text-red-600">{data.negativeCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Reviews:</span>
              <span className="font-medium">{data.totalReviews}</span>
            </div>
            <div className="flex justify-between">
              <span>Type:</span>
              <span className="font-medium">{data.categoryType}</span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  // 自定义点渲染
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props
    if (!payload) return null
    
    const color = getSatisfactionColor(payload.satisfactionRate)
    const size = payload.z
    
    return (
      <circle
        cx={cx}
        cy={cy}
        r={size / 2}
        fill={color}
        fillOpacity={0.7}
        stroke={color}
        strokeWidth={1}
      />
    )
  }

  if (processedData.chartData.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">No data available for the selected filter.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>
            Competitor Pain Points Matrix
            {categoryFilter !== 'all' && (
              <span className="text-sm font-normal text-gray-600 ml-2">
                ({categoryFilter} Categories)
              </span>
            )}
          </span>
          <div className="text-sm text-gray-600">
            {processedData.chartData.length} data points
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 图例说明 */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-sm text-gray-800 mb-3">How to Read This Chart:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                <span><strong>Bubble Size:</strong> Number of mentions (larger = more mentions)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span><strong>Color:</strong> Satisfaction rate (red=low, green=high)</span>
              </div>
            </div>
            <div className="text-gray-600">
              <p><strong>X-axis:</strong> Product names</p>
              <p><strong>Y-axis:</strong> Pain point categories</p>
            </div>
          </div>
        </div>

        {/* 图表 */}
        <div className="h-[600px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              data={processedData.chartData}
              margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
            >
              <XAxis
                type="number"
                dataKey="x"
                domain={[-0.5, processedData.products.length - 0.5]}
                tickFormatter={(value) => processedData.products[Math.round(value)] || ''}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={120}
                fontSize={10}
              />
              <YAxis
                type="number"
                dataKey="y"
                domain={[-0.5, processedData.categories.length - 0.5]}
                tickFormatter={(value) => {
                  const category = processedData.categories[Math.round(value)]
                  return category ? (category.length > 25 ? category.substring(0, 25) + '...' : category) : ''
                }}
                interval={0}
                width={200}
                fontSize={9}
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter
                dataKey="z"
                data={processedData.chartData}
                shape={<CustomDot />}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* 产品列表 */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-sm text-gray-800 mb-3">Products Analyzed:</h4>
          <div className="flex flex-wrap gap-2">
            {processedData.products.map((product, index) => (
              <span
                key={product}
                className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {product}
              </span>
            ))}
          </div>
        </div>

        {/* 分类统计 */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="font-semibold text-blue-800 mb-1">Most Mentioned</div>
            <div className="text-blue-600">
              {processedData.chartData.length > 0 
                ? processedData.chartData.reduce((max, item) => item.mentions > max.mentions ? item : max).category
                : 'N/A'
              }
            </div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="font-semibold text-green-800 mb-1">Highest Satisfaction</div>
            <div className="text-green-600">
              {processedData.chartData.length > 0 
                ? processedData.chartData.reduce((max, item) => item.satisfactionRate > max.satisfactionRate ? item : max).category
                : 'N/A'
              }
            </div>
          </div>
          <div className="p-3 bg-red-50 rounded-lg">
            <div className="font-semibold text-red-800 mb-1">Lowest Satisfaction</div>
            <div className="text-red-600">
              {processedData.chartData.length > 0 
                ? processedData.chartData.reduce((min, item) => item.satisfactionRate < min.satisfactionRate ? item : min).category
                : 'N/A'
              }
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 