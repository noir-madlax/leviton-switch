"use client"

import {
  BarChart as ReChartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface BarChartProps {
  data: any[]
  index: string
  categories: string[]
  colors?: string[]
  yAxisLabel?: string
  xAxisLabel?: string
}

export function BarChart({
  data,
  index,
  categories,
  colors = ["#FF6B6B", "#4ECDC4"],
  yAxisLabel,
  xAxisLabel,
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReChartsBar
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 30,
          bottom: 70,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={index}
          angle={-45}
          textAnchor="end"
          height={70}
          label={{
            value: xAxisLabel,
            position: "insideBottom",
            offset: -40,
          }}
        />
        <YAxis
          label={{
            value: yAxisLabel,
            angle: -90,
            position: "insideLeft",
          }}
          tickFormatter={(value) => value.toLocaleString()}
        />
        <Tooltip formatter={(value) => Number(value).toLocaleString()} />
        <Legend />
        {categories.map((category, index) => (
          <Bar key={category} dataKey={category} fill={colors[index % colors.length]} name={category} />
        ))}
      </ReChartsBar>
    </ResponsiveContainer>
  )
}
