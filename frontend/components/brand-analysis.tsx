import { Card } from "@/components/ui/card"
import { BarChart } from "@/components/charts/bar-chart"

interface BrandAnalysisProps {
  data: {
    brandCategoryRevenue: {
      brand: string
      dimmerRevenue: number
      switchRevenue: number
    }[]
  }
}

export function BrandAnalysis({ data }: BrandAnalysisProps) {
  // Transform data for the chart
  const chartData = data.brandCategoryRevenue.map((item) => ({
    name: item.brand,
    "Dimmer Switches": item.dimmerRevenue,
    "Light Switches": item.switchRevenue,
  }))

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-500 pl-4 mb-6">🏢 Brand Analysis</h2>

      <h3 className="text-xl font-semibold mb-4">Brand Revenue by Category (Dimmers vs Switches)</h3>
      <Card className="p-6 bg-gray-50">
        <div className="h-[500px]">
          <BarChart
            data={chartData}
            index="name"
            categories={["Dimmer Switches", "Light Switches"]}
            colors={["#FF6B6B", "#4ECDC4"]}
            yAxisLabel="Total Revenue ($)"
            xAxisLabel="Brand"
          />
        </div>
      </Card>
    </section>
  )
}
