"use client"

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CategoryFeedback, ProductType, getAvailableProductTypes } from '@/lib/categoryFeedback'

interface CategoryPainPointsBarProps {
  data: CategoryFeedback[]
  productType?: ProductType
  onProductTypeChange?: (productType: ProductType) => void
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg max-w-xs">
        <p className="font-semibold text-gray-800">{data.category}</p>
        <p className="text-sm text-gray-600">Type: {data.categoryType}</p>
        <p className="text-sm text-red-600 font-semibold">Negative Reviews: {data.negativeCount}</p>
        <p className="text-sm text-blue-600">Total Reviews: {data.totalReviews}</p>
        <p className="text-sm text-orange-600">Negative Rate: {data.negativeRate}%</p>
        <p className="text-sm text-green-600">Satisfaction Rate: {data.satisfactionRate}%</p>
        <div className="mt-2">
          <p className="text-xs text-gray-500">Top Issues:</p>
          {data.topNegativeAspects.slice(0, 3).map((aspect: string, index: number) => (
            <p key={index} className="text-xs text-gray-600">• {aspect}</p>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export function CategoryPainPointsBar({ data, productType = 'dimmer', onProductTypeChange }: CategoryPainPointsBarProps) {
  const [selectedProductType, setSelectedProductType] = useState<ProductType>(productType)
  const productTypes = getAvailableProductTypes()

  // 同步外部的productType变化
  useEffect(() => {
    setSelectedProductType(productType)
  }, [productType])

  // 根据负面评价数量计算颜色 - 红色渐变（负面评价数越多颜色越深）
  const getBarColor = (negativeCount: number) => {
    if (negativeCount >= 50) return '#dc2626'      // 深红色 - 50+负面评价
    if (negativeCount >= 30) return '#ef4444'      // 红色 - 30-49负面评价
    if (negativeCount >= 20) return '#f87171'      // 中红色 - 20-29负面评价
    if (negativeCount >= 10) return '#fca5a5'      // 浅红色 - 10-19负面评价
    return '#fed7d7'                              // 很浅红色 - 1-9负面评价
  }

  // 数据已经按负面评价数排序，直接使用前10个
  const filteredData = data.slice(0, 10)

  const handleProductTypeChange = (value: ProductType) => {
    setSelectedProductType(value)
    if (onProductTypeChange) {
      onProductTypeChange(value)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Top 10 Most Critical Categories by Negative Reviews Count
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-600 rounded"></div>
              <span className="text-xs">Very High (50+)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-400 rounded"></div>
              <span className="text-xs">High (30-49)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-300 rounded"></div>
              <span className="text-xs">Medium (20-29)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-200 rounded"></div>
              <span className="text-xs">Low (10-19)</span>
            </div>
          </div>
        </CardTitle>
        <div className="flex items-center justify-between">
          <CardDescription>Categories ranked by absolute negative review count</CardDescription>
          {onProductTypeChange && (
            <div className="flex gap-2">
              <Button
                variant={selectedProductType === 'dimmer' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleProductTypeChange('dimmer')}
              >
                Dimmer Switches
              </Button>
              <Button
                variant={selectedProductType === 'light' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleProductTypeChange('light')}
              >
                Light Switches
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 80,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="category"
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
                fontSize={12}
              />
              <YAxis
                label={{ 
                  value: 'Negative Reviews Count', 
                  angle: -90, 
                  position: 'insideLeft'
                }}
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="negativeCount" radius={[4, 4, 0, 0]}>
                {filteredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.negativeCount)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* 统计摘要 */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
          {filteredData.slice(0, 4).map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-lg font-bold" style={{color: getBarColor(item.negativeCount)}}>
                {item.negativeCount}
              </div>
              <div className="text-sm text-gray-600 truncate" title={item.category}>
                {item.category}
              </div>
              <div className="text-xs text-red-600">
                negative reviews
              </div>
            </div>
          ))}
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Categories</p>
            <p className="text-lg font-semibold">{data.length}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Avg Negative Rate</p>
            <p className="text-lg font-semibold">
              {data.length > 0 ? 
                Math.round(data.reduce((sum, item) => sum + item.negativeRate, 0) / data.length) : 0
              }%
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Negative</p>
            <p className="text-lg font-semibold text-red-600">
              {data.reduce((sum, item) => sum + item.negativeCount, 0)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Critical Issues</p>
            <p className="text-lg font-semibold text-red-600">
              {data.filter(item => item.negativeCount >= 30).length}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 