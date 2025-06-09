"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ScatterChart } from "@/components/charts/scatter-chart"
import { HorizontalBarChart } from "@/components/charts/horizontal-bar-chart"
import { PriceTypeSelector, type PriceType } from "@/components/price-type-selector"

interface ProductAnalysisProps {
  data: {
    priceVsRevenue: {
      category: string
      products: {
        id: string
        name: string
        brand: string
        price: number
        unitPrice: number
        revenue: number
        volume: number
        url: string
      }[]
    }[]
    topProducts: {
      category: string
      products: {
        id: string
        name: string
        brand: string
        price: number
        unitPrice: number
        revenue: number
        url: string
      }[]
    }[]
  }
}

export function ProductAnalysis({ data }: ProductAnalysisProps) {
  const [priceType, setPriceType] = useState<PriceType>("sku")

  // Transform data for scatter chart based on selected price type
  const transformScatterData = (products: any[], category: string) => {
    return products.map((p) => ({
      x: priceType === "sku" ? p.price : p.unitPrice,
      y: p.revenue,
      name: p.name,
      brand: p.brand,
      volume: p.volume,
      url: p.url,
      category: category,
    }))
  }

  const dimmerData = transformScatterData(data.priceVsRevenue[0].products, "Dimmer Switches")
  const switchData = transformScatterData(data.priceVsRevenue[1].products, "Light Switches")

  // Transform data for horizontal bar charts
  const topDimmers = data.topProducts[0].products.map((p) => ({
    name: p.name,
    value: p.revenue,
    brand: p.brand,
    price: priceType === "sku" ? p.price : p.unitPrice,
    url: p.url,
  }))

  const topSwitches = data.topProducts[1].products.map((p) => ({
    name: p.name,
    value: p.revenue,
    brand: p.brand,
    price: priceType === "sku" ? p.price : p.unitPrice,
    url: p.url,
  }))

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-500 pl-4 mb-6">📦 Product Analysis</h2>

      <h3 className="text-xl font-semibold mb-4">Top 20 Products by Revenue (Price vs Revenue by Category)</h3>
      <Card className="p-6 bg-gray-50 mb-8">
        <PriceTypeSelector onChange={setPriceType} />
        <div className="h-[800px]">
          <ScatterChart
            dimmerData={dimmerData}
            switchData={switchData}
            xAxisLabel="Price (USD)"
            yAxisLabel="Revenue (USD)"
            priceType={priceType}
          />
        </div>
      </Card>

      <h3 className="text-xl font-semibold mb-4">Top Products by Category</h3>
      <Card className="p-6 bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-medium mb-3 text-center">🔆 Top 20 Dimmer Switches (by Total Revenue)</h4>
            <div className="h-[500px]">
              <HorizontalBarChart data={topDimmers} colors={getBrandColors()} valueLabel="Total Revenue ($)" />
            </div>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-3 text-center">💡 Top 20 Light Switches (by Total Revenue)</h4>
            <div className="h-[500px]">
              <HorizontalBarChart data={topSwitches} colors={getBrandColors()} valueLabel="Total Revenue ($)" />
            </div>
          </div>
        </div>
      </Card>
    </section>
  )
}

function getBrandColors() {
  return {
    Kasa: "rgb(141,211,199)",
    Leviton: "#9B59B6",
    Lutron: "#E67E22",
    GE: "#3498DB",
    ELEGRP: "rgb(128,177,211)",
    BESTTEN: "rgb(253,180,98)",
    "ENERLITES Store": "rgb(179,222,105)",
    Amazon: "rgb(252,205,229)",
    Other: "#D3D3D3",
    TREATLIFE: "#FF6B6B",
    "TP-Link": "#4ECDC4",
    "SOZULAMP Store": "#95A5A6",
    Legrand: "#2ECC71",
  }
}
