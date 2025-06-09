"use client"

import { useMemo } from "react"
import { ResponsiveContainer } from "recharts"
import type { PriceType } from "@/components/price-type-selector"

interface ViolinChartProps {
  dimmerPrices: number[]
  switchPrices: number[]
  dimmerStats: {
    min: number
    q1: number
    median: number
    mean: number
    q3: number
    max: number
  }
  switchStats: {
    min: number
    q1: number
    median: number
    mean: number
    q3: number
    max: number
  }
  priceType?: PriceType
}

// Function to create kernel density estimation
function kde(data: number[], bandwidth: number, min: number, max: number, steps: number): [number, number][] {
  const result: [number, number][] = []
  const range = max - min
  const step = range / steps

  for (let i = 0; i <= steps; i++) {
    const x = min + i * step
    let density = 0

    for (const point of data) {
      const z = (x - point) / bandwidth
      density += Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI)
    }

    density /= data.length * bandwidth
    result.push([x, density])
  }

  return result
}

// Function to normalize density values to a specific range
function normalizeDensity(densityData: [number, number][], maxHeight: number): [number, number][] {
  const maxDensity = Math.max(...densityData.map((d) => d[1]))
  return densityData.map(([x, y]) => [x, (y / maxDensity) * maxHeight])
}

export function ViolinChart({
  dimmerPrices,
  switchPrices,
  dimmerStats,
  switchStats,
  priceType = "sku",
}: ViolinChartProps) {
  // Calculate KDE for both categories
  const dimmerDensity = useMemo(() => {
    if (dimmerPrices.length === 0) return []
    const bandwidth = 5 // Adjust for smoothness
    const min = Math.max(0, dimmerStats.min - 10)
    const max = Math.min(200, dimmerStats.max + 10) // Cap at 200 for better visualization
    return normalizeDensity(kde(dimmerPrices, bandwidth, min, max, 50), 40)
  }, [dimmerPrices, dimmerStats.min, dimmerStats.max])

  const switchDensity = useMemo(() => {
    if (switchPrices.length === 0) return []
    const bandwidth = 5 // Adjust for smoothness
    const min = Math.max(0, switchStats.min - 10)
    const max = Math.min(200, switchStats.max + 10) // Cap at 200 for better visualization
    return normalizeDensity(kde(switchPrices, bandwidth, min, max, 50), 40)
  }, [switchPrices, switchStats.min, switchStats.max])

  // Calculate max price for y-axis
  const maxPrice = Math.min(200, Math.max(dimmerStats.max || 0, switchStats.max || 0))

  return (
    <div className="h-full flex">
      {/* Main Violin Plot */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <svg viewBox="0 0 600 400" className="w-full h-full">
            {/* Background */}
            <rect width="600" height="400" fill="#f8fafc" />

            {/* Grid lines */}
            {[0, 50, 100, 150, 200].map((y) => (
              <line
                key={y}
                x1="80"
                y1={400 - (y / maxPrice) * 300 - 50}
                x2="520"
                y2={400 - (y / maxPrice) * 300 - 50}
                stroke="#e2e8f0"
                strokeDasharray="2,2"
              />
            ))}

            {/* Y-axis */}
            <line x1="80" y1="50" x2="80" y2="350" stroke="#64748b" strokeWidth="1" />

            {/* Y-axis labels */}
            {[0, 50, 100, 150, 200].map((y) => (
              <text
                key={y}
                x="75"
                y={400 - (y / maxPrice) * 300 - 50}
                textAnchor="end"
                fontSize="12"
                fill="#64748b"
                dominantBaseline="middle"
              >
                {y}
              </text>
            ))}

            {/* Y-axis title */}
            <text x="30" y="200" textAnchor="middle" fontSize="14" fill="#64748b" transform="rotate(-90, 30, 200)">
              Price (USD)
            </text>

            {/* X-axis */}
            <line x1="80" y1="350" x2="520" y2="350" stroke="#64748b" strokeWidth="1" />

            {/* Dimmer Switches Violin */}
            <g transform="translate(200, 0)">
              {/* Left side of violin */}
              <path
                d={`M 0,${350} ${dimmerDensity.map(([x, y]) => `L ${-y},${350 - (x / maxPrice) * 300}`).join(" ")} L 0,50 Z`}
                fill="#FF6B6B"
                fillOpacity="0.7"
                stroke="#FF6B6B"
                strokeWidth="1"
              />

              {/* Right side of violin */}
              <path
                d={`M 0,${350} ${dimmerDensity.map(([x, y]) => `L ${y},${350 - (x / maxPrice) * 300}`).join(" ")} L 0,50 Z`}
                fill="#FF6B6B"
                fillOpacity="0.7"
                stroke="#FF6B6B"
                strokeWidth="1"
              />

              {/* Median line */}
              <line
                x1="-30"
                y1={350 - (dimmerStats.median / maxPrice) * 300}
                x2="30"
                y2={350 - (dimmerStats.median / maxPrice) * 300}
                stroke="#fff"
                strokeWidth="2"
                strokeDasharray="4,2"
              />

              {/* Mean line */}
              <line
                x1="-30"
                y1={350 - (dimmerStats.mean / maxPrice) * 300}
                x2="30"
                y2={350 - (dimmerStats.mean / maxPrice) * 300}
                stroke="#fff"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
            </g>

            {/* Light Switches Violin */}
            <g transform="translate(400, 0)">
              {/* Left side of violin */}
              <path
                d={`M 0,${350} ${switchDensity.map(([x, y]) => `L ${-y},${350 - (x / maxPrice) * 300}`).join(" ")} L 0,50 Z`}
                fill="#4ECDC4"
                fillOpacity="0.7"
                stroke="#4ECDC4"
                strokeWidth="1"
              />

              {/* Right side of violin */}
              <path
                d={`M 0,${350} ${switchDensity.map(([x, y]) => `L ${y},${350 - (x / maxPrice) * 300}`).join(" ")} L 0,50 Z`}
                fill="#4ECDC4"
                fillOpacity="0.7"
                stroke="#4ECDC4"
                strokeWidth="1"
              />

              {/* Median line */}
              <line
                x1="-30"
                y1={350 - (switchStats.median / maxPrice) * 300}
                x2="30"
                y2={350 - (switchStats.median / maxPrice) * 300}
                stroke="#fff"
                strokeWidth="2"
                strokeDasharray="4,2"
              />

              {/* Mean line */}
              <line
                x1="-30"
                y1={350 - (switchStats.mean / maxPrice) * 300}
                x2="30"
                y2={350 - (switchStats.mean / maxPrice) * 300}
                stroke="#fff"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
            </g>

            {/* X-axis labels */}
            <text x="200" y="380" textAnchor="middle" fontSize="14" fill="#64748b">
              Dimmer Switches
            </text>
            <text x="400" y="380" textAnchor="middle" fontSize="14" fill="#64748b">
              Light Switches
            </text>

            {/* Legend */}
            <rect x="520" y="150" width="15" height="15" fill="#FF6B6B" fillOpacity="0.7" />
            <text x="540" y="162" fontSize="12" fill="#64748b">
              Dimmer Switches
            </text>

            <rect x="520" y="175" width="15" height="15" fill="#4ECDC4" fillOpacity="0.7" />
            <text x="540" y="187" fontSize="12" fill="#64748b">
              Light Switches
            </text>

            <line x1="520" y1="210" x2="535" y2="210" stroke="#fff" strokeWidth="2" strokeDasharray="4,2" />
            <text x="540" y="213" fontSize="12" fill="#64748b">
              Median
            </text>

            <line x1="520" y1="230" x2="535" y2="230" stroke="#fff" strokeWidth="1" strokeDasharray="2,2" />
            <text x="540" y="233" fontSize="12" fill="#64748b">
              Mean
            </text>
          </svg>
        </ResponsiveContainer>
      </div>

      {/* Statistics Box */}
      <div className="w-80 ml-4 bg-white border border-gray-200 rounded-md p-4">
        <div className="mb-4">
          <h4 className="font-medium text-sm mb-2">
            Dimmer Switches ({priceType === "sku" ? "SKU Price" : "Unit Price"}):
          </h4>
          <div className="text-xs space-y-1">
            <div>Min: ${dimmerStats.min.toFixed(2)}</div>
            <div>Q1: ${dimmerStats.q1.toFixed(2)}</div>
            <div>Median: ${dimmerStats.median.toFixed(2)}</div>
            <div>Mean: ${dimmerStats.mean.toFixed(2)}</div>
            <div>Q3: ${dimmerStats.q3.toFixed(2)}</div>
            <div>Max: ${dimmerStats.max.toFixed(2)}</div>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-sm mb-2">
            Light Switches ({priceType === "sku" ? "SKU Price" : "Unit Price"}):
          </h4>
          <div className="text-xs space-y-1">
            <div>Min: ${switchStats.min.toFixed(2)}</div>
            <div>Q1: ${switchStats.q1.toFixed(2)}</div>
            <div>Median: ${switchStats.median.toFixed(2)}</div>
            <div>Mean: ${switchStats.mean.toFixed(2)}</div>
            <div>Q3: ${switchStats.q3.toFixed(2)}</div>
            <div>Max: ${switchStats.max.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
