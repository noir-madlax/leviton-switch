"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ViolinChart } from "@/components/charts/violin-chart"
import { BrandViolinChart } from "@/components/charts/brand-violin-chart"
import { PriceTypeSelector, type PriceType } from "@/components/price-type-selector"

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
}

export function PricingAnalysis({ data }: PricingAnalysisProps) {
  const [priceType, setPriceType] = useState<PriceType>("sku")

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
          />
        </div>
      </Card>

      <h3 className="text-xl font-semibold mb-4">Brand Price Distribution by Category</h3>
      <Card className="p-6 bg-gray-50">
        <PriceTypeSelector onChange={setPriceType} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-medium mb-3 text-center">🔆 Price Distribution by Brand - Dimmer Switches</h4>
            <div className="h-[400px]">
              <BrandViolinChart brands={getBrands(0)} priceType={priceType} category="Dimmer Switches" />
            </div>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-3 text-center">💡 Price Distribution by Brand - Light Switches</h4>
            <div className="h-[400px]">
              <BrandViolinChart brands={getBrands(1)} priceType={priceType} category="Light Switches" />
            </div>
          </div>
        </div>
      </Card>
    </section>
  )
}
