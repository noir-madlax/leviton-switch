"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface GroupedBarChartProps {
  data: any[]
  index: string
  categories: string[]
  colors?: string[]
  yAxisLabel?: string
  xAxisLabel?: string
}

export function GroupedBarChart({
  data,
  index,
  categories,
  colors = ["#3498DB", "#95A5A6"],
  yAxisLabel,
  xAxisLabel,
}: GroupedBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 30,
          bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={index}
          label={{
            value: xAxisLabel,
            position: "insideBottom",
            offset: -10,
          }}
        />
        <YAxis
          label={{
            value: yAxisLabel,
            angle: -90,
            position: "insideLeft",
          }}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
        <Legend />
        {categories.map((category, index) => (
          <Bar key={category} dataKey={category} fill={colors[index % colors.length]} name={category} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
