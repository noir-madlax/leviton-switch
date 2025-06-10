"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell
} from "recharts"
import { ProductPainPoint, getSatisfactionColor } from "@/lib/competitorAnalysis"

interface CustomerSentimentBarProps {
  data: ProductPainPoint[]
  productTotalReviews: Record<string, number>
}

interface SentimentData {
  product: string
  totalReviews: number
  avgSatisfactionRate: number
  color: string
  totalMentions: number
}

export function CustomerSentimentBar({ data, productTotalReviews }: CustomerSentimentBarProps) {
  // 处理数据，计算每个产品的情感数据
  const sentimentData = useMemo(() => {
    if (!data || data.length === 0) return []

    // 按产品分组计算统计数据
    const productGroups = data.reduce((groups, item) => {
      if (!groups[item.product]) {
        groups[item.product] = []
      }
      groups[item.product].push(item)
      return groups
    }, {} as Record<string, ProductPainPoint[]>)

    // 计算每个产品的统计信息
    const sentimentArray: SentimentData[] = Object.entries(productGroups).map(([product, items]) => {
      const totalReviews = productTotalReviews[product] || 0
      const totalMentions = items.reduce((sum, item) => sum + item.mentions, 0)
      
      // 计算加权平均满意度 (按mentions加权)
      const weightedSatisfaction = items.reduce((sum, item) => sum + (item.satisfactionRate * item.mentions), 0)
      const avgSatisfactionRate = totalMentions > 0 ? weightedSatisfaction / totalMentions : 0

      return {
        product,
        totalReviews,
        avgSatisfactionRate: Math.round(avgSatisfactionRate * 10) / 10,
        color: getSatisfactionColor(avgSatisfactionRate),
        totalMentions
      }
    })

    // 按总评论数排序（从高到低）
    return sentimentArray
      .filter(item => item.totalReviews > 0)
      .sort((a, b) => b.totalReviews - a.totalReviews)
  }, [data, productTotalReviews])

  // 格式化产品名称
  const formatProductName = (name: string) => {
    if (name.includes('Leviton D26HD')) return 'Leviton D26HD'
    if (name.includes('Leviton D215S')) return 'Leviton D215S'  
    if (name.includes('Lutron Caseta Diva')) return 'Lutron Caseta'
    if (name.includes('TP Link Switch')) return 'TP Link'
    if (name.includes('Lutron Diva')) return 'Lutron Diva'
    return name.length > 15 ? name.substring(0, 15) + '...' : name
  }

  // 自定义Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as SentimentData
      return (
        <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{formatProductName(data.product)}</p>
          <div className="space-y-1 text-xs mt-2">
            <div className="flex justify-between">
              <span>Total Reviews:</span>
              <span className="font-medium">{data.totalReviews}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Mentions:</span>
              <span className="font-medium">{data.totalMentions}</span>
            </div>
            <div className="flex justify-between">
              <span>Avg Satisfaction:</span>
              <span className="font-medium">{data.avgSatisfactionRate}%</span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  if (sentimentData.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">No sentiment data available.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Customer Sentiment Analysis</span>
          <div className="text-sm text-gray-600">
            {sentimentData.length} products analyzed
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 图例说明 */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-sm text-gray-800 mb-3">How to Read This Chart:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <p><strong>X-axis:</strong> Total number of reviews</p>
              <p><strong>Y-axis:</strong> Products (sorted by review volume)</p>
            </div>
            <div className="flex items-center space-x-2">
              <span><strong>Bar Color:</strong> Average satisfaction rate</span>
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded bg-red-500"></div>
                <div className="w-3 h-3 rounded bg-orange-500"></div>
                <div className="w-3 h-3 rounded bg-yellow-500"></div>
                <div className="w-3 h-3 rounded bg-green-500"></div>
              </div>
              <span className="text-xs">Low → High Satisfaction</span>
            </div>
          </div>
        </div>

        {/* 条形图 */}
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sentimentData}
              layout="horizontal"
              margin={{ top: 20, right: 60, bottom: 20, left: 120 }}
            >
              <XAxis 
                type="number" 
                domain={[0, 'dataMax']}
                tick={{ fontSize: 12, fill: '#374151' }}
              />
              <YAxis 
                type="category" 
                dataKey="product"
                tickFormatter={formatProductName}
                tick={{ fontSize: 12, fill: '#374151' }}
                width={110}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="totalReviews" radius={[0, 4, 4, 0]}>
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 数据统计 */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="font-semibold text-blue-800 mb-1">Most Reviewed Product</div>
            <div className="text-blue-600">
              {formatProductName(sentimentData[0]?.product || '')} ({sentimentData[0]?.totalReviews || 0} reviews)
            </div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="font-semibold text-green-800 mb-1">Best Satisfaction</div>
            <div className="text-green-600">
              {(() => {
                const bestProduct = sentimentData.reduce((best, curr) => 
                  curr.avgSatisfactionRate > best.avgSatisfactionRate ? curr : best, sentimentData[0])
                return `${formatProductName(bestProduct?.product || '')} (${bestProduct?.avgSatisfactionRate || 0}%)`
              })()}
            </div>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <div className="font-semibold text-yellow-800 mb-1">Total Reviews</div>
            <div className="text-yellow-600">
              {sentimentData.reduce((sum, item) => sum + item.totalReviews, 0)} reviews analyzed
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 