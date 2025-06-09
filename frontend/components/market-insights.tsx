import { Card } from "@/components/ui/card"
import { GroupedBarChart } from "@/components/charts/grouped-bar-chart"

interface MarketInsightsProps {
  data: {
    smartVsTraditional: {
      category: string
      smart: number
      traditional: number
    }[]
  }
}

export function MarketInsights({ data }: MarketInsightsProps) {
  // Transform data for the chart
  const chartData = data.smartVsTraditional.map((item) => ({
    name: item.category,
    Smart: item.smart,
    Traditional: item.traditional,
  }))

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-500 pl-4 mb-6">💡 Market Insights</h2>

      <h3 className="text-xl font-semibold mb-4">Smart vs Traditional by Category</h3>
      <Card className="p-6 bg-gray-50">
        <div className="h-80">
          <GroupedBarChart
            data={chartData}
            index="name"
            categories={["Smart", "Traditional"]}
            colors={["#3498DB", "#95A5A6"]}
            yAxisLabel="Total Sales Revenue ($)"
            xAxisLabel="Category"
          />
        </div>
      </Card>
    </section>
  )
}
