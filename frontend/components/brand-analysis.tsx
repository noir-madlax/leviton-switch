"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { BarChart } from "@/components/charts/bar-chart"
import { MetricTypeSelector, type MetricType } from "@/components/metric-type-selector"

interface BrandAnalysisProps {
  data: {
    brandCategoryRevenue: {
      brand: string
      dimmerRevenue: number
      switchRevenue: number
      dimmerVolume: number
      switchVolume: number
    }[]
  }
}

export function BrandAnalysis({ data }: BrandAnalysisProps) {
  const [metricType, setMetricType] = useState<MetricType>("revenue")

  // Transform data for the chart based on selected metric
  const chartData = data.brandCategoryRevenue.map((item) => ({
    name: item.brand,
    "🔆 Dimmer Switches": metricType === "revenue" ? item.dimmerRevenue : item.dimmerVolume,
    "💡 Light Switches": metricType === "revenue" ? item.switchRevenue : item.switchVolume,
  }))

  const yAxisLabel = metricType === "revenue" ? "$ Total Revenue ($)" : "# Total Volume (Packages)"
  const titleSuffix = metricType === "revenue" ? "Revenue" : "Volume"
  const titleSymbol = metricType === "revenue" ? "$" : "#"

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-500 pl-4 mb-6">🏢 Brand Analysis</h2>

      <h3 className="text-xl font-semibold mb-4">Brand {titleSuffix} by Category (🔆 Dimmers vs 💡 Switches)</h3>
      <Card className="p-6 bg-gray-50">
        <MetricTypeSelector onChange={setMetricType} value={metricType} />
        <div className="h-[500px]">
          <BarChart
            data={chartData}
            index="name"
            categories={["🔆 Dimmer Switches", "💡 Light Switches"]}
            colors={["#FF6B6B", "#4ECDC4"]}
            yAxisLabel={yAxisLabel}
            xAxisLabel="Brand"
            metricType={metricType}
          />
        </div>
      </Card>
    </section>
  )
}
