"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

import { CategoryPainPointsBar } from "@/components/charts/category-pain-points-bar"
import { CategoryPositiveFeedbackBar } from "@/components/charts/category-positive-feedback-bar"
import CategoryUseCaseBar from "@/components/CategoryUseCaseBar"

import { getCategoryFeedback, ProductType, getTopUseCases } from "@/lib/categoryFeedback"

export function ReviewInsights() {
  const [selectedProductType, setSelectedProductType] = useState<ProductType>('dimmer')
  
  const categoryPainPoints = getCategoryFeedback(selectedProductType)
  const useCases = getTopUseCases(selectedProductType)

  const handleProductTypeChange = (productType: ProductType) => {
    setSelectedProductType(productType)
  }

  return (
    <div className="space-y-10">
      {/* 分类痛点分析 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-red-500 pl-4 mb-6">
          📊 Customer Pain Points by Category
        </h2>
        <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
          <strong>Key Insight:</strong> {categoryPainPoints.topNegativeCategories[0]?.category || 'LED and lighting features'} received 
          {categoryPainPoints.topNegativeCategories[0]?.negativeCount || 0} negative reviews (sentiment-based), making it the most problematic category for {categoryPainPoints.summary.productType}. 
          This is followed by other core product issues, indicating areas requiring immediate attention.
        </div>
        <CategoryPainPointsBar 
          data={categoryPainPoints.topNegativeCategories} 
          productType={selectedProductType}
          onProductTypeChange={handleProductTypeChange}
        />
      </section>

      {/* 分类正面反馈分析 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-green-500 pl-4 mb-6">
          ⭐ Customer Strengths by Category
        </h2>
        <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-6">
          <strong>Key Insight:</strong> {categoryPainPoints.topPositiveCategories[0]?.category || 'Visual Appearance and Aesthetics'} leads with 
          {categoryPainPoints.topPositiveCategories[0]?.positiveCount || 0} positive reviews (sentiment-based), representing the strongest category for {categoryPainPoints.summary.productType}. 
          These categories show where the product excels and can be leveraged for competitive advantage.
        </div>
        <CategoryPositiveFeedbackBar 
          data={categoryPainPoints.topPositiveCategories} 
          productType={selectedProductType}
          onProductTypeChange={handleProductTypeChange}
        />
      </section>

      {/* 使用场景满意度分析 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-purple-500 pl-4 mb-6">
          🎯 Use Case Satisfaction Analysis
        </h2>
        <div className="bg-purple-50 border-l-4 border-purple-600 p-4 mb-6">
          <strong>Key Insight:</strong> {useCases[0]?.useCase || 'Functionality Operation'} has the highest mention count with 
          {useCases[0]?.totalMentions || 0} mentions and {useCases[0]?.satisfactionRate || 0}% satisfaction rate for {categoryPainPoints.summary.productType}. 
          Bar height shows mention frequency while color indicates satisfaction levels - helping identify both popular and problematic use cases.
        </div>
        <CategoryUseCaseBar 
          data={useCases} 
          title="Use Case Analysis"
          description="Bar height = mention count, color = satisfaction level (green=high, yellow=medium, red=low)"
          productType={selectedProductType}
          onProductTypeChange={handleProductTypeChange}
        />
      </section>


    </div>
  )
} 