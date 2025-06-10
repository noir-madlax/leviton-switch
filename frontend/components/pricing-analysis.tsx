"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ViolinChart } from "@/components/charts/violin-chart"
import { BrandViolinChart } from "@/components/charts/brand-violin-chart"
import { PriceTypeSelector, type PriceType } from "@/components/price-type-selector"
import { useProductPanel } from "@/lib/product-panel-context"

interface PricingAnalysisProps {
  data: {
    priceDistribution: {
      category: string
      skuPrices: number[]
      unitPrices: number[]
      stats: {
        sku: {
          min: number
          q1: number
          median: number
          mean: number
          q3: number
          max: number
        }
        unit: {
          min: number
          q1: number
          median: number
          mean: number
          q3: number
          max: number
        }
      }
    }[]
    brandPriceDistribution: {
      category: string
      brands: {
        name: string
        skuPrices: number[]
        unitPrices: number[]
      }[]
    }[]
  }
  productLists: {
    byBrand: Record<string, any[]>
    bySegment: Record<string, any[]>
    byPackageSize: Record<string, any[]>
  }
}

export function PricingAnalysis({ data, productLists }: PricingAnalysisProps) {
  const [priceType, setPriceType] = useState<PriceType>("unit")
  const { openPanel } = useProductPanel()

  // Add error handling for data access
  const getPrices = (category: number) => {
    if (!data?.priceDistribution?.[category]) {
      console.error(`Price distribution data not found for category ${category}`)
      return []
    }
    return priceType === "sku"
      ? data.priceDistribution[category].skuPrices || []
      : data.priceDistribution[category].unitPrices || []
  }

  const getStats = (category: number) => {
    if (!data?.priceDistribution?.[category]?.stats) {
      console.error(`Price stats not found for category ${category}`)
      return {
        min: 0,
        q1: 0,
        median: 0,
        mean: 0,
        q3: 0,
        max: 0,
      }
    }
    return priceType === "sku"
      ? data.priceDistribution[category].stats.sku
      : data.priceDistribution[category].stats.unit
  }

  const getBrands = (category: number) => {
    if (!data?.brandPriceDistribution?.[category]?.brands) {
      console.error(`Brand price distribution data not found for category ${category}`)
      return []
    }
    return data.brandPriceDistribution[category].brands
  }

  const handleViolinClick = (category: string, priceRange: { min: number; max: number }) => {
    // Calculate the center price and use the same tolerance as tooltip (±5%)
    const centerPrice = (priceRange.min + priceRange.max) / 2
    const tolerancePercent = 0.05  // 5% tolerance to match tooltip
    const tolerance = centerPrice * tolerancePercent
    
    // Filter products by category and price range using same logic as tooltip
    const allProducts = [
      ...Object.values(productLists.byBrand).flat(),
    ].filter(product => {
      const matchesCategory = product.category === category
      const price = priceType === 'unit' ? product.unitPrice : product.price
      const inRange = Math.abs(price - centerPrice) <= tolerance
      
      console.log(`Product: ${product.name}, Category: ${product.category}, Price: ${price}, Center: ${centerPrice}, Tolerance: ±${tolerance.toFixed(2)} (${tolerancePercent*100}%), Matches: ${matchesCategory && inRange}`)
      
      return matchesCategory && inRange
    })

    console.log(`Total products found: ${allProducts.length}`)
    console.log('Filtered products:', allProducts.map(p => `${p.name} - ${p.category} - Unit: $${p.unitPrice}`))

    openPanel(
      allProducts,
      `${category}: $${(centerPrice - tolerance).toFixed(2)} - $${(centerPrice + tolerance).toFixed(2)}`,
      `${allProducts.length} products found in ${category} with ${priceType === 'unit' ? 'unit' : 'SKU'} price within ±${tolerancePercent*100}% of $${centerPrice.toFixed(2)}`,
      { brand: true, category: false, priceRange: false, packSize: true }
    )
  }

  const handleBrandViolinClick = (brand: string) => {
    const products = productLists.byBrand[brand] || []
    openPanel(
      products,
      `${brand} Products`,
      `All products from ${brand}`,
      { brand: false, category: true, priceRange: true, packSize: true }
    )
  }

  // Check if we have the required data
  if (!data?.priceDistribution || data.priceDistribution.length < 2) {
    return (
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-500 pl-4 mb-6">💰 Pricing Analysis</h2>
        <Card className="p-6 bg-gray-50">
          <p className="text-center text-gray-500">Price distribution data is not available.</p>
        </Card>
      </section>
    )
  }

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-500 pl-4 mb-6">💰 Pricing Analysis</h2>

      <h3 className="text-xl font-semibold mb-4">Price Distribution: Dimmers vs Switches</h3>
      <Card className="p-6 bg-gray-50 mb-8">
        <PriceTypeSelector onChange={setPriceType} />
        <div className="h-[500px]">
          <ViolinChart
            dimmerPrices={getPrices(0)}
            switchPrices={getPrices(1)}
            dimmerStats={getStats(0)}
            switchStats={getStats(1)}
            priceType={priceType}
            onViolinClick={(category, priceRange) => {
              console.log('handleViolinClick called from PricingAnalysis')
              handleViolinClick(category, priceRange)
            }}
          />
        </div>
      </Card>

      <h3 className="text-xl font-semibold mb-4">Brand Price Distribution by Category</h3>
      <Card className="p-6 bg-gray-50">
        <PriceTypeSelector onChange={setPriceType} />
        <div className="space-y-8">
          <div className="w-full">
            <h4 className="text-lg font-medium mb-3 text-center">🔆 Dimmer Switches</h4>
            <div className="h-[320px] w-full">
              <BrandViolinChart brands={getBrands(0)} priceType={priceType} category="Dimmer Switches" onViolinClick={handleBrandViolinClick} />
            </div>
          </div>
          <div className="w-full">
            <h4 className="text-lg font-medium mb-3 text-center">💡 Light Switches</h4>
            <div className="h-[320px] w-full">
              <BrandViolinChart brands={getBrands(1)} priceType={priceType} category="Light Switches" onViolinClick={handleBrandViolinClick} />
            </div>
          </div>
        </div>
      </Card>
    </section>
  )
}
