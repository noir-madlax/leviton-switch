"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { CompetitorPainPointsMatrix } from "@/components/charts/competitor-pain-points-matrix"
import { getCompetitorAnalysisData } from "@/lib/competitorAnalysis"

export function CompetitorAnalysis() {
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'Physical' | 'Performance'>('all')
  
  const competitorData = getCompetitorAnalysisData()

  const handleCategoryFilterChange = (filter: 'all' | 'Physical' | 'Performance') => {
    setCategoryFilter(filter)
  }

  // 根据筛选条件过滤数据
  const filteredData = categoryFilter === 'all' 
    ? competitorData.matrixData 
    : competitorData.matrixData.filter(item => item.categoryType === categoryFilter)

  // 计算每个产品的统计数据
  const productStats = competitorData.targetProducts.map(product => {
    const productData = competitorData.matrixData.filter(item => item.product === product)
    const totalReviews = productData.reduce((sum, item) => sum + item.totalReviews, 0)
    const totalMentions = productData.reduce((sum, item) => sum + item.mentions, 0)
    const categoriesCount = productData.length
    const avgSatisfaction = productData.length > 0 
      ? productData.reduce((sum, item) => sum + item.satisfactionRate, 0) / productData.length 
      : 0
    
    return {
      name: product,
      totalReviews,
      totalMentions,
      categoriesCount,
      avgSatisfaction: Math.round(avgSatisfaction * 10) / 10
    }
  }).filter(stat => stat.totalReviews > 0) // 只显示有数据的产品

  return (
    <div className="space-y-10">
      {/* 产品数据统计概览 */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4 mb-4">
          📊 Product Data Overview
        </h2>
        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-4">
          <strong>数据质量说明:</strong> 已排除评论数据不足的产品 (Leviton DSL06)，只显示有足够数据的5个产品进行对比分析。
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {productStats.map((stat) => (
            <Card key={stat.name} className="p-4">
              <h4 className="font-medium text-gray-900 mb-3 text-sm">{stat.name}</h4>
              <div className="text-xs text-gray-600 space-y-2">
                <div className="flex justify-between">
                  <span>📝 Reviews:</span>
                  <span className="font-medium">{stat.totalReviews}</span>
                </div>
                <div className="flex justify-between">
                  <span>💬 Mentions:</span>
                  <span className="font-medium">{stat.totalMentions}</span>
                </div>
                <div className="flex justify-between">
                  <span>📊 Categories:</span>
                  <span className="font-medium">{stat.categoriesCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>😊 Satisfaction:</span>
                  <span className={`font-medium ${stat.avgSatisfaction >= 60 ? 'text-green-600' : stat.avgSatisfaction >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {stat.avgSatisfaction}%
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 竞争品痛点矩阵分析 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-500 pl-4 mb-6">
          🏆 Competitor Pain Points Matrix Analysis
        </h2>
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
          <strong>Key Insight:</strong> 对比分析5个有效产品，共{filteredData.length}个数据点。
          Matrix显示提及频率(气泡大小) vs 满意度(颜色) - 帮助识别竞争优势和市场空白。
          平均满意度: {competitorData.summary.avgSatisfactionRate}%。
        </div>
        
        {/* 分类筛选器 */}
        <div className="mb-6 flex space-x-4">
          <button
            onClick={() => handleCategoryFilterChange('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              categoryFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Categories ({competitorData.matrixData.length})
          </button>
          <button
            onClick={() => handleCategoryFilterChange('Physical')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              categoryFilter === 'Physical'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Physical ({competitorData.physicalData.length})
          </button>
          <button
            onClick={() => handleCategoryFilterChange('Performance')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              categoryFilter === 'Performance'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Performance ({competitorData.performanceData.length})
          </button>
        </div>

        <CompetitorPainPointsMatrix 
          data={filteredData}
          categoryFilter={categoryFilter}
        />
      </section>

      {/* 分析洞察总结 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-green-500 pl-4 mb-6">
          📈 Analysis Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">总体概览</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">分析产品数:</span>
                <span className="font-medium">{competitorData.summary.totalProducts}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">数据点总数:</span>
                <span className="font-medium">{competitorData.summary.totalDataPoints}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">总提及次数:</span>
                <span className="font-medium">{competitorData.summary.totalMentions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">平均满意度:</span>
                <span className="font-medium">{competitorData.summary.avgSatisfactionRate}%</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">分类分布</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">物理特性:</span>
                <span className="font-medium">{competitorData.physicalData.length} 个数据点</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">性能特性:</span>
                <span className="font-medium">{competitorData.performanceData.length} 个数据点</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">竞争洞察</h3>
            <div className="text-sm text-gray-600">
              通过气泡大小和颜色对比，可以识别：
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>市场关注度最高的痛点</li>
                <li>各品牌的优势劣势领域</li>
                <li>潜在的市场机会空白</li>
              </ul>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
} 