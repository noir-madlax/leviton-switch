"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { GroupedBarChart } from "@/components/charts/grouped-bar-chart"
import { MetricTypeSelector, type MetricType } from "@/components/metric-type-selector"

interface SegmentData {
  segment: string
  revenue: number
  volume: number
  products: number
}

interface MarketInsightsProps {
  data: {
    segmentRevenue: {
      dimmerSwitches: SegmentData[]
      lightSwitches: SegmentData[]
    }
  }
}

// Color palette for segments
const segmentColors = [
  "#E67E22", "#3498DB", "#9B59B6", "#2ECC71", "#F39C12", 
  "#E74C3C", "#1ABC9C", "#34495E", "#F1C40F", "#95A5A6",
  "#8E44AD", "#27AE60", "#D35400", "#2980B9", "#C0392B"
]

export function MarketInsights({ data }: MarketInsightsProps) {
  const [metricType, setMetricType] = useState<MetricType>("revenue")

  // Helper function to wrap long text
  const wrapText = (text: string, maxLength: number = 15) => {
    if (text.length <= maxLength) return text
    
    const words = text.split(' ')
    let lines = []
    let currentLine = ''
    
    for (const word of words) {
      if ((currentLine + word).length <= maxLength) {
        currentLine += (currentLine ? ' ' : '') + word
      } else {
        if (currentLine) lines.push(currentLine)
        currentLine = word
      }
    }
    if (currentLine) lines.push(currentLine)
    
    return lines.join('\n')
  }

  // Transform dimmer switches data for the chart (top 10 segments)
  const dimmerChartData = data.segmentRevenue.dimmerSwitches
    .slice(0, 10)
    .map((item, index) => {
      const cleanName = item.segment
        .replace(" Switches", " Switch")
        .replace("Smart Wi-Fi Enabled", "Wi-Fi Smart")
        .replace("Smart Hub-Dependent", "Hub-Dependent Smart")
        .replace("Fan and Light Combination", "Fan+Light")
        .replace("Incandescent Compatible", "Incandescent")
        .replace("Handheld Remote Control", "Remote")
      
      const wrappedName = wrapText(cleanName, 12)
      
      return {
        name: wrappedName,
        value: metricType === "revenue" ? item.revenue : item.volume,
        fill: segmentColors[index % segmentColors.length]
      }
    })

  // Transform light switches data for the chart (top 10 segments)
  const switchChartData = data.segmentRevenue.lightSwitches
    .slice(0, 10)
    .map((item, index) => {
      const cleanName = item.segment
        .replace(" Switches", " Switch")
        .replace("WiFi Connected Smart", "WiFi Smart")
        .replace("Three Way Multi-Location", "3-Way Multi-Location")
        .replace("Smart Hub Dependent", "Hub-Dependent Smart")
        .replace("Multi-Function Combination", "Multi-Function")
        .replace("RF Wireless Remote Control", "RF Remote Control")
        .replace("LED Illuminated Indicator", "LED Indicator")
        .replace("Four Way Multi-Location", "4-Way Multi-Location")
        .replace("High Amperage Rocker", "High Amp Rocker")
        .replace("Switch Outlet Combination Devices", "Switch+Outlet")
        .replace("Add On Auxiliary", "Auxiliary")
        .replace("Multi-Feature Combination Control", "Multi-Feature")
        .replace("Inline Cord Control", "Inline Cord")
      
      const wrappedName = wrapText(cleanName, 12)
      
      return {
        name: wrappedName,
        value: metricType === "revenue" ? item.revenue : item.volume,
        fill: segmentColors[index % segmentColors.length]
      }
    })

  // Get segment names for categories
  const dimmerCategories = dimmerChartData.map(item => item.name)
  const switchCategories = switchChartData.map(item => item.name)
  
  // Get colors for each category
  const dimmerColors = dimmerChartData.map(item => item.fill)
  const switchColors = switchChartData.map(item => item.fill)

  // Get top 3 segments for each category
  const topDimmerSegments = data.segmentRevenue.dimmerSwitches.slice(0, 3)
  const topSwitchSegments = data.segmentRevenue.lightSwitches.slice(0, 3)

  const yAxisLabel = metricType === "revenue" ? "Revenue ($)" : "Volume (Units)"
  const titleSuffix = metricType === "revenue" ? "Revenue" : "Volume"
  const valueFormatter = metricType === "revenue" 
    ? (value: number) => `$${value.toLocaleString()}`
    : (value: number) => `${value.toLocaleString()}`

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-500 pl-4 mb-6">📊 Market Insights</h2>

      <div className="mb-4">
        <MetricTypeSelector onChange={setMetricType} value={metricType} />
      </div>

      <div className="space-y-8">
        {/* Dimmer Switches Chart */}
        <Card className="p-6 bg-gray-50">
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2 text-center">🔆 Dimmer Switches - Top Segments by {titleSuffix}</h3>
            <div className="text-sm text-gray-600 text-center mb-2">
              Top 3: {topDimmerSegments.map((s, i) => 
                `${i + 1}. ${s.segment.replace(" Dimmer Switches", "")} (${valueFormatter(metricType === "revenue" ? s.revenue : s.volume)})`
              ).join(" • ")}
            </div>
          </div>
          <div className="h-[590px]">
            <GroupedBarChart
              data={dimmerChartData}
              index="name"
              categories={["value"]}
              colors={dimmerColors}
              yAxisLabel={yAxisLabel}
              xAxisLabel="Product Segment"
              metricType={metricType}
            />
          </div>
        </Card>

        {/* Light Switches Chart */}
        <Card className="p-6 bg-gray-50">
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2 text-center">💡 Light Switches - Top Segments by {titleSuffix}</h3>
            <div className="text-sm text-gray-600 text-center mb-2">
              Top 3: {topSwitchSegments.map((s, i) => 
                `${i + 1}. ${s.segment.replace(" Switches", "").replace(" Control", "")} (${valueFormatter(metricType === "revenue" ? s.revenue : s.volume)})`
              ).join(" • ")}
            </div>
          </div>
          <div className="h-[590px]">
            <GroupedBarChart
              data={switchChartData}
              index="name"
              categories={["value"]}
              colors={switchColors}
              yAxisLabel={yAxisLabel}
              xAxisLabel="Product Segment"
              metricType={metricType}
            />
          </div>
        </Card>
      </div>
    </section>
  )
}
