"use client"

import { Card } from "@/components/ui/card"
import { PainPointsScatter } from "@/components/charts/pain-points-scatter"
import { CustomerLikesBar } from "@/components/charts/customer-likes-bar"
import { UnderservedHeatmap } from "@/components/charts/underserved-heatmap"
import { getReviewInsights } from "@/lib/reviewInsights"

export function ReviewInsights() {
  const insights = getReviewInsights()

  return (
    <div className="space-y-10">
      {/* 总览指标 */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-600">{insights.summary.totalPainPoints}</div>
            <div className="text-sm text-gray-600">Pain Points</div>
          </div>
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{insights.summary.totalPositives}</div>
            <div className="text-sm text-gray-600">Liked Features</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{insights.summary.totalGaps}</div>
            <div className="text-sm text-gray-600">Market Gaps</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">{insights.summary.avgSeverity.toFixed(1)}</div>
            <div className="text-sm text-gray-600">Avg Severity</div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-emerald-600">{insights.summary.highSatisfactionFeatures}</div>
            <div className="text-sm text-gray-600">High Satisfaction</div>
          </div>
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-600">{insights.summary.criticalGaps}</div>
            <div className="text-sm text-gray-600">Critical Gaps</div>
          </div>
        </div>
      </section>

      {/* 痛点分析 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-red-500 pl-4 mb-6">
          🔍 Customer Pain Points Analysis
        </h2>
        <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
          <strong>Key Insight:</strong> LED flickering and WiFi connectivity issues are the most frequently mentioned problems, 
          affecting over 50 products each. Installation complexity remains a significant barrier with high severity ratings.
        </div>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Pain Points: Severity vs Comment Volume
          </h3>
          <PainPointsScatter data={insights.painPoints} />
          <div className="mt-4 text-sm text-gray-600">
            <strong>How to read:</strong> Bubble position shows severity (X-axis) vs mention frequency (Y-axis). 
            Larger bubbles affect more products. Focus on the upper-right quadrant for critical issues.
          </div>
        </Card>
      </section>

      {/* 客户喜欢的特点 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-green-500 pl-4 mb-6">
          💚 Customer Likes & Positive Feedback
        </h2>
        <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-6">
          <strong>Key Insight:</strong> Smart home integration leads customer satisfaction with 445 positive mentions, 
          followed by dimming performance and easy installation. These represent core value drivers.
        </div>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Most Appreciated Features by Mention Volume
          </h3>
          <CustomerLikesBar data={insights.customerLikes} />
          <div className="mt-4 text-sm text-gray-600">
            <strong>How to read:</strong> Bar height shows positive mention frequency. Colors indicate satisfaction levels: 
            Green (High), Yellow (Medium), Gray (Low). Focus on green bars for competitive advantages.
          </div>
        </Card>
      </section>

      {/* 未满足的用例需求 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-500 pl-4 mb-6">
          🎯 Underserved Use Cases & Market Opportunities
        </h2>
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
          <strong>Key Insight:</strong> Battery backup (91% gap) and energy monitoring (89% gap) represent the biggest opportunities. 
          Outdoor applications and accessibility features also show significant unmet demand.
        </div>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Market Gaps: Use Cases vs Product Attributes
          </h3>
          <UnderservedHeatmap data={insights.underservedUseCases} />
        </Card>
      </section>

      {/* 行动建议 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-purple-500 pl-4 mb-6">
          📋 Strategic Recommendations
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-red-50 border-red-200">
            <h3 className="text-lg font-semibold text-red-800 mb-3">🚨 Address Critical Pain Points</h3>
            <ul className="text-sm space-y-2 text-red-700">
              <li>• Improve LED flickering solutions (198 mentions)</li>
              <li>• Enhance WiFi connectivity stability (234 mentions)</li>
              <li>• Simplify installation process (156 mentions)</li>
              <li>• Focus on switch mechanism durability</li>
            </ul>
          </Card>
          
          <Card className="p-6 bg-green-50 border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-3">💡 Leverage Strengths</h3>
            <ul className="text-sm space-y-2 text-green-700">
              <li>• Expand smart home integration features</li>
              <li>• Promote superior dimming performance</li>
              <li>• Highlight easy installation benefits</li>
              <li>• Market voice control capabilities</li>
            </ul>
          </Card>
          
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">🎯 Capture Market Opportunities</h3>
            <ul className="text-sm space-y-2 text-blue-700">
              <li>• Develop battery backup solutions (91% gap)</li>
              <li>• Add energy monitoring features (89% gap)</li>
              <li>• Create weather-resistant outdoor models</li>
              <li>• Improve accessibility features</li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  )
} 