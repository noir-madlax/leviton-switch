"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { CompetitorPainPointsMatrix } from "@/components/charts/competitor-pain-points-matrix"
import { MissedOpportunitiesMatrix } from "@/components/charts/missed-opportunities-matrix"
import { CustomerSentimentBar } from "@/components/charts/customer-sentiment-bar"
import { getCompetitorAnalysisData } from "@/lib/competitorAnalysis"

export function CompetitorAnalysis() {
  const competitorData = getCompetitorAnalysisData()

  // 计算每个产品的统计数据
  const productStats = competitorData.targetProducts.map(product => {
    const productData = competitorData.matrixData.filter(item => item.product === product)
    const actualTotalReviews = competitorData.productTotalReviews[product] || 0  // 使用实际总评论数
    const totalMentions = productData.reduce((sum, item) => sum + item.mentions, 0)
    const categoriesCount = productData.length
    const avgSatisfaction = productData.length > 0 
      ? productData.reduce((sum, item) => sum + item.satisfactionRate, 0) / productData.length 
      : 0
    
    return {
      name: product,
      totalReviews: actualTotalReviews,  // 使用实际总评论数
      totalMentions,
      categoriesCount,
      avgSatisfaction: Math.round(avgSatisfaction * 10) / 10
    }
  }).filter(stat => stat.totalReviews > 0) // 只显示有数据的产品

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4">
      {/* Product Data Overview */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4 mb-4">
          📊 Product Data Overview
        </h2>
        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-4">
          <strong>Data Quality Note:</strong> Excluded products with insufficient review data (Leviton DSL06), showing only 5 products with adequate data for comparison.
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

      {/* Competitor Pain Points Matrix Analysis */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-500 pl-4 mb-6">
          🏆 Competitor Pain Points Matrix Analysis
        </h2>
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
          <strong>Key Insight:</strong> Comparing {productStats.length} effective products across {competitorData.matrixData.length} data points.
          Matrix shows mention frequency (bubble size) vs satisfaction rate (color) - helps identify competitive advantages and market gaps.
          Average satisfaction rate: {competitorData.summary.avgSatisfactionRate}%.
        </div>

        <CompetitorPainPointsMatrix 
          data={competitorData.matrixData}
        />
      </section>

      {/* Missed Use Cases/Opportunities Matrix */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-purple-500 pl-4 mb-6">
          🎯 Missed Use Cases/Opportunities Matrix
        </h2>
        <div className="bg-purple-50 border-l-4 border-purple-600 p-4 mb-6">
          <strong>Analysis Purpose:</strong> This matrix reveals gaps and opportunities across product-category combinations.
          Each cell shows mention count with color indicating satisfaction rate - helping identify underserved areas and competitive positioning.
        </div>

        <MissedOpportunitiesMatrix 
          data={competitorData.matrixData}
        />
      </section>

      {/* Customer Sentiment Analysis */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-green-500 pl-4 mb-6">
          📈 Customer Sentiment Analysis
        </h2>
        <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-6">
          <strong>Sentiment Overview:</strong> Horizontal bar chart showing total review volume per product with satisfaction rate color coding.
          Products ranked by review volume to understand market attention and customer sentiment patterns.
        </div>

        <CustomerSentimentBar 
          data={competitorData.matrixData}
          productTotalReviews={competitorData.productTotalReviews}
        />
      </section>
    </div>
  )
} 