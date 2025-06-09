"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface HorizontalBarChartProps {
  data: {
    name: string
    value: number
    brand: string
    price?: number
    url?: string
  }[]
  colors: Record<string, string>
  valueLabel?: string
}

export function HorizontalBarChart({ data, colors, valueLabel }: HorizontalBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 150,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis
          type="number"
          tickFormatter={(value) => `$${value.toLocaleString()}`}
          label={{
            value: valueLabel,
            position: "insideBottom",
            offset: -5,
          }}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={150}
          tickFormatter={(value) => (value.length > 25 ? `${value.substring(0, 25)}...` : value)}
          tick={{ fontSize: 11 }}
        />
        <Tooltip
          formatter={(value, name, props) => {
            const item = props.payload
            return [`$${Number(value).toLocaleString()}`, `${item.brand} - $${item.price?.toFixed(2)}`]
          }}
          labelFormatter={(label) => label}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[entry.brand] || colors.Other} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
