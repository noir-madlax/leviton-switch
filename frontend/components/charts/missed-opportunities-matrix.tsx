"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductPainPoint, getSatisfactionColor } from "@/lib/competitorAnalysis"

interface MissedOpportunitiesMatrixProps {
  data: ProductPainPoint[]
}

interface MatrixCell {
  product: string
  category: string
  categoryType: 'Physical' | 'Performance'
  mentions: number
  satisfactionRate: number
  color: string
}

export function MissedOpportunitiesMatrix({ data }: MissedOpportunitiesMatrixProps) {
  // 处理数据，创建矩阵
  const matrixData = useMemo(() => {
    if (!data || data.length === 0) return { products: [], categories: [], matrix: [] }

    // 获取唯一的产品和分类
    const products = Array.from(new Set(data.map(d => d.product))).sort()
    const physicalCategories = Array.from(new Set(data.filter(d => d.categoryType === 'Physical').map(d => d.category))).sort()
    const performanceCategories = Array.from(new Set(data.filter(d => d.categoryType === 'Performance').map(d => d.category))).sort()
    
    // 创建矩阵数据
    const matrix: MatrixCell[][] = []
    
    products.forEach((product) => {
      const productRow: MatrixCell[] = []
      
      // 添加Physical分类
      physicalCategories.forEach((category) => {
        const dataPoint = data.find(d => d.product === product && d.category === category)
        productRow.push({
          product,
          category,
          categoryType: 'Physical',
          mentions: dataPoint?.mentions || 0,
          satisfactionRate: dataPoint?.satisfactionRate || 0,
          color: getSatisfactionColor(dataPoint?.satisfactionRate || 0)
        })
      })
      
      // 添加Performance分类
      performanceCategories.forEach((category) => {
        const dataPoint = data.find(d => d.product === product && d.category === category)
        productRow.push({
          product,
          category,
          categoryType: 'Performance',
          mentions: dataPoint?.mentions || 0,
          satisfactionRate: dataPoint?.satisfactionRate || 0,
          color: getSatisfactionColor(dataPoint?.satisfactionRate || 0)
        })
      })
      
      matrix.push(productRow)
    })

    const allCategories = [...physicalCategories, ...performanceCategories]
    return { products, categories: allCategories, matrix, physicalCategories, performanceCategories }
  }, [data])

  // 格式化产品名称
  const formatProductName = (name: string) => {
    if (name.includes('Leviton D26HD')) return 'Leviton D26HD'
    if (name.includes('Leviton D215S')) return 'Leviton D215S'  
    if (name.includes('Lutron Caseta Diva')) return 'Lutron Caseta'
    if (name.includes('TP Link Switch')) return 'TP Link'
    if (name.includes('Lutron Diva')) return 'Lutron Diva'
    return name.length > 12 ? name.substring(0, 12) + '...' : name
  }

  // 格式化分类名称
  const formatCategoryName = (name: string) => {
    return name.length > 15 ? name.substring(0, 15) + '...' : name
  }

  if (matrixData.products.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">No data available for the matrix.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Missed Use Cases/Opportunities Matrix</span>
          <div className="text-sm text-gray-600">
            {matrixData.products.length} products × {matrixData.categories.length} categories
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 图例说明 */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-sm text-gray-800 mb-3">How to Read This Matrix:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <p><strong>Cell Value:</strong> Number of mentions for each product-category combination</p>
              <p><strong>Cell Color:</strong> Satisfaction rate (red=low, green=high)</p>
            </div>
            <div className="flex items-center space-x-2">
              <span><strong>Color Scale:</strong></span>
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

        {/* 矩阵表格 */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 bg-gray-100 p-2 text-xs font-semibold text-left min-w-[120px]">
                  Product
                </th>
                {/* Physical分类标题 */}
                {matrixData.physicalCategories && matrixData.physicalCategories.length > 0 && (
                  <th 
                    colSpan={matrixData.physicalCategories.length}
                    className="border border-gray-300 bg-blue-50 p-2 text-xs font-semibold text-center"
                  >
                    Physical Categories
                  </th>
                )}
                {/* Performance分类标题 */}
                {matrixData.performanceCategories && matrixData.performanceCategories.length > 0 && (
                  <th 
                    colSpan={matrixData.performanceCategories.length}
                    className="border border-gray-300 bg-green-50 p-2 text-xs font-semibold text-center"
                  >
                    Performance Categories
                  </th>
                )}
              </tr>
              <tr>
                <th className="border border-gray-300 bg-gray-100 p-2"></th>
                {matrixData.categories.map((category, index) => (
                  <th 
                    key={category}
                    className="border border-gray-300 bg-gray-50 p-2 text-xs font-medium text-center min-w-[80px] transform -rotate-45"
                    style={{ height: '80px' }}
                  >
                    <div className="transform rotate-45 whitespace-nowrap">
                      {formatCategoryName(category)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrixData.matrix.map((row, productIndex) => (
                <tr key={matrixData.products[productIndex]}>
                  <td className="border border-gray-300 bg-gray-50 p-2 text-xs font-medium">
                    {formatProductName(matrixData.products[productIndex])}
                  </td>
                  {row.map((cell, categoryIndex) => (
                    <td 
                      key={`${productIndex}-${categoryIndex}`}
                      className="border border-gray-300 p-1 text-center text-xs font-medium"
                      style={{ 
                        backgroundColor: cell.mentions > 0 ? cell.color : '#f9fafb',
                        opacity: cell.mentions > 0 ? 0.8 : 0.3
                      }}
                      title={`${cell.product} - ${cell.category}: ${cell.mentions} mentions, ${cell.satisfactionRate}% satisfaction`}
                    >
                      {cell.mentions > 0 ? cell.mentions : '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 数据统计 */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="font-semibold text-blue-800 mb-1">Most Active Product</div>
            <div className="text-blue-600">
              {(() => {
                const productMentions = matrixData.products.map(product => ({
                  product,
                  totalMentions: data.filter(d => d.product === product).reduce((sum, d) => sum + d.mentions, 0)
                }))
                const maxProduct = productMentions.reduce((max, curr) => curr.totalMentions > max.totalMentions ? curr : max)
                return formatProductName(maxProduct.product)
              })()}
            </div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="font-semibold text-green-800 mb-1">Highest Satisfaction</div>
            <div className="text-green-600">
              {(() => {
                const maxSatisfaction = data.reduce((max, curr) => curr.satisfactionRate > max.satisfactionRate ? curr : max)
                return `${formatProductName(maxSatisfaction.product)} (${maxSatisfaction.satisfactionRate}%)`
              })()}
            </div>
          </div>
          <div className="p-3 bg-red-50 rounded-lg">
            <div className="font-semibold text-red-800 mb-1">Most Mentioned Category</div>
            <div className="text-red-600">
              {(() => {
                const categoryMentions: Record<string, number> = {}
                data.forEach(d => {
                  categoryMentions[d.category] = (categoryMentions[d.category] || 0) + d.mentions
                })
                const maxCategory = Object.entries(categoryMentions).reduce((max, [cat, mentions]) => 
                  mentions > max[1] ? [cat, mentions] : max, ['', 0])
                return formatCategoryName(maxCategory[0])
              })()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 