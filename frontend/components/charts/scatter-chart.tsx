"use client"

import {
  ScatterChart as ReChartsScatter,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ZAxis,
} from "recharts"
import type { PriceType } from "@/components/price-type-selector"

interface ScatterChartProps {
  dimmerData: {
    x: number
    y: number
    name: string
    brand: string
    volume: number
    url?: string
    category: string
  }[]
  switchData: {
    x: number
    y: number
    name: string
    brand: string
    volume: number
    url?: string
    category: string
  }[]
  xAxisLabel?: string
  yAxisLabel?: string
  priceType?: PriceType
}

export function ScatterChart({ dimmerData, switchData, xAxisLabel, yAxisLabel, priceType = "sku" }: ScatterChartProps) {
  const brandColors = {
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
  }

  const renderScatter = (data: any[], name: string, fill: string) => {
    return <Scatter name={name} data={data} fill={fill} shape="circle" legendType="circle" isAnimationActive={false} />
  }

  // Group data by brand for better visualization
  const dimmerByBrand: Record<string, any[]> = {}
  const switchByBrand: Record<string, any[]> = {}

  dimmerData.forEach((item) => {
    if (!dimmerByBrand[item.brand]) {
      dimmerByBrand[item.brand] = []
    }
    dimmerByBrand[item.brand].push(item)
  })

  switchData.forEach((item) => {
    if (!switchByBrand[item.brand]) {
      switchByBrand[item.brand] = []
    }
    switchByBrand[item.brand].push(item)
  })

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-center text-lg font-medium mb-2">
        Top 20 Products by Revenue: {priceType === "sku" ? "SKU" : "Unit"} Price vs Revenue Analysis
      </h3>

      <div className="flex-1">
        <h4 className="text-center text-base font-medium mb-1">☀️ Dimmer Switches - Price vs Revenue</h4>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <ReChartsScatter
              margin={{
                top: 20,
                right: 30,
                left: 60,
                bottom: 50,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="x"
                name="Price"
                label={{
                  value: xAxisLabel,
                  position: "insideBottom",
                  offset: -10,
                }}
                domain={["auto", "auto"]}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Revenue"
                label={{
                  value: yAxisLabel,
                  angle: -90,
                  position: "insideLeft",
                }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <ZAxis range={[60, 400]} />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                formatter={(value, name, props) => {
                  if (name === "Price") return `$${Number(value).toFixed(2)}`
                  if (name === "Revenue") return `$${Number(value).toLocaleString()}`
                  return value
                }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
                        <p className="font-medium">{data.name}</p>
                        <p>Brand: {data.brand}</p>
                        <p>Category: {data.category}</p>
                        <p>Price: ${data.x.toFixed(2)}</p>
                        <p>Revenue: ${data.y.toLocaleString()}</p>
                        <p>Volume: {data.volume.toLocaleString()}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              {Object.entries(dimmerByBrand).map(([brand, data]) =>
                renderScatter(data, brand, brandColors[brand as keyof typeof brandColors] || "#D3D3D3"),
              )}
            </ReChartsScatter>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex-1 mt-4">
        <h4 className="text-center text-base font-medium mb-1">💡 Light Switches - Price vs Revenue</h4>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <ReChartsScatter
              margin={{
                top: 20,
                right: 30,
                left: 60,
                bottom: 50,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="x"
                name="Price"
                label={{
                  value: xAxisLabel,
                  position: "insideBottom",
                  offset: -10,
                }}
                domain={["auto", "auto"]}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Revenue"
                label={{
                  value: yAxisLabel,
                  angle: -90,
                  position: "insideLeft",
                }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <ZAxis range={[60, 400]} />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                formatter={(value, name, props) => {
                  if (name === "Price") return `$${Number(value).toFixed(2)}`
                  if (name === "Revenue") return `$${Number(value).toLocaleString()}`
                  return value
                }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
                        <p className="font-medium">{data.name}</p>
                        <p>Brand: {data.brand}</p>
                        <p>Category: {data.category}</p>
                        <p>Price: ${data.x.toFixed(2)}</p>
                        <p>Revenue: ${data.y.toLocaleString()}</p>
                        <p>Volume: {data.volume.toLocaleString()}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              {Object.entries(switchByBrand).map(([brand, data]) =>
                renderScatter(data, brand, brandColors[brand as keyof typeof brandColors] || "#D3D3D3"),
              )}
            </ReChartsScatter>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
