import { DashboardHeader } from "@/components/dashboard-header"
import { ExecutiveSummary } from "@/components/executive-summary"
import { BrandAnalysis } from "@/components/brand-analysis"
import { ProductAnalysis } from "@/components/product-analysis"
import { PricingAnalysis } from "@/components/pricing-analysis"
import { MarketInsights } from "@/components/market-insights"
import { PackagePreferenceAnalysis } from "@/components/package-preference-analysis"
import { SummaryMetrics } from "@/components/summary-metrics"
import { ReviewInsights } from "@/components/review-insights"
import { fetchDashboardData } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function Home() {
  const data = await fetchDashboardData()

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl bg-white p-6 md:p-8 rounded-lg shadow-md my-6">
        <DashboardHeader />
        
        <Tabs defaultValue="market-analysis" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="market-analysis">Market Analysis</TabsTrigger>
            <TabsTrigger value="review-insights">Review Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="market-analysis" className="mt-6">
            <ExecutiveSummary data={data.executiveSummary} />
            <BrandAnalysis data={data.brandAnalysis} />
            <ProductAnalysis data={data.productAnalysis} />
            <PricingAnalysis data={data.pricingAnalysis} />
            <MarketInsights data={data.marketInsights} />
            <PackagePreferenceAnalysis />
            <SummaryMetrics data={data.summaryMetrics} />
          </TabsContent>
          
          <TabsContent value="review-insights" className="mt-6">
            <ReviewInsights />
          </TabsContent>
        </Tabs>

        <div className="text-center text-gray-500 italic mt-8">
          Report Generated:{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </div>
      </div>
    </main>
  )
}
