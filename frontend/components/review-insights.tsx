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

        <CategoryPainPointsBar 
          data={categoryPainPoints.topNegativeCategories} 
          productType={selectedProductType}
          onProductTypeChange={handleProductTypeChange}
        />
      </section>

      {/* 分类正面反馈分析 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-green-500 pl-4 mb-6">
          ⭐ Customer Delights by Category
        </h2>

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