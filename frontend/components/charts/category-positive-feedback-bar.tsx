"use client"

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CategoryFeedback, ProductType, getAvailableProductTypes } from '@/lib/categoryFeedback'

interface CategoryPositiveFeedbackBarProps {
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
        <p className="text-sm text-green-600 font-semibold">Positive Reviews: {data.positiveCount}</p>
        <p className="text-sm text-blue-600">Total Reviews: {data.totalReviews}</p>
        <p className="text-sm text-green-600">Satisfaction Rate: {data.satisfactionRate}%</p>
        <p className="text-sm text-orange-600">Negative Rate: {data.negativeRate}%</p>
        <div className="mt-2">
          <p className="text-xs text-gray-500">Top Strengths:</p>
          {data.topPositiveAspects && data.topPositiveAspects.slice(0, 3).map((aspect: string, index: number) => (
            <p key={index} className="text-xs text-gray-600">• {aspect}</p>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export function CategoryPositiveFeedbackBar({ data, productType = 'dimmer', onProductTypeChange }: CategoryPositiveFeedbackBarProps) {
  const [selectedProductType, setSelectedProductType] = useState<ProductType>(productType)
  const productTypes = getAvailableProductTypes()

  // 同步外部的productType变化
  useEffect(() => {
    setSelectedProductType(productType)
  }, [productType])

  // 根据正面评价数量计算颜色 - 绿色渐变（正面评价数越多颜色越深）
  const getBarColor = (positiveCount: number) => {
    if (positiveCount >= 100) return '#059669'     // 深绿色 - 100+正面评价
    if (positiveCount >= 60) return '#10b981'      // 绿色 - 60-99正面评价
    if (positiveCount >= 40) return '#34d399'      // 中绿色 - 40-59正面评价
    if (positiveCount >= 20) return '#6ee7b7'      // 浅绿色 - 20-39正面评价
    return '#a7f3d0'                              // 很浅绿色 - 1-19正面评价
  }

  // 数据已经按正面评价数排序，直接使用前10个
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
          Top 10 Customer Strengths by Category
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-700 rounded"></div>
              <span className="text-xs">Excellent (100+)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-600 rounded"></div>
              <span className="text-xs">Very Good (60-99)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-400 rounded"></div>
              <span className="text-xs">Good (40-59)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-300 rounded"></div>
              <span className="text-xs">Satisfactory (20-39)</span>
            </div>
          </div>
        </CardTitle>
        <div className="flex items-center justify-between">
          <CardDescription>Categories ranked by absolute positive review count</CardDescription>
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
                  value: 'Positive Reviews Count', 
                  angle: -90, 
                  position: 'insideLeft'
                }}
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="positiveCount" radius={[4, 4, 0, 0]}>
                {filteredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.positiveCount)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* 统计摘要 */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
          {filteredData.slice(0, 4).map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-lg font-bold" style={{color: getBarColor(item.positiveCount)}}>
                {item.positiveCount}
              </div>
              <div className="text-sm text-gray-600 truncate" title={item.category}>
                {item.category}
              </div>
              <div className="text-xs text-green-600">
                positive reviews
              </div>
            </div>
          ))}
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Categories</p>
            <p className="text-lg font-semibold">{data.length}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Avg Satisfaction</p>
            <p className="text-lg font-semibold text-green-600">
              {data.length > 0 ? 
                Math.round(data.reduce((sum, item) => sum + item.satisfactionRate, 0) / data.length) : 0
              }%
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Positive</p>
            <p className="text-lg font-semibold text-green-600">
              {data.reduce((sum, item) => sum + item.positiveCount, 0)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Excellent Categories</p>
            <p className="text-lg font-semibold text-green-600">
              {data.filter(item => item.positiveCount >= 100).length}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 