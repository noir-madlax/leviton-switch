"use client"

import { useMemo } from "react"
import { ResponsiveContainer } from "recharts"
import type { PriceType } from "@/components/price-type-selector"

interface BrandViolinChartProps {
  brands: {
    name: string
    skuPrices: number[]
    unitPrices: number[]
  }[]
  priceType: PriceType
  category: string
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
  if (maxDensity === 0) return densityData.map(([x, y]) => [x, 0])
  return densityData.map(([x, y]) => [x, (y / maxDensity) * maxHeight])
}

export function BrandViolinChart({ brands, priceType, category }: BrandViolinChartProps) {
  // Filter brands with enough data points
  const filteredBrands = brands.filter((brand) => {
    const prices = priceType === "sku" ? brand.skuPrices : brand.unitPrices
    return prices.length >= 3
  })

  // Calculate max price for x-axis
  const allPrices = filteredBrands.flatMap((brand) => (priceType === "sku" ? brand.skuPrices : brand.unitPrices))
  const maxPrice = Math.min(150, Math.max(...allPrices, 0))

  // Calculate KDE for each brand
  const brandDensities = useMemo(() => {
    return filteredBrands.map((brand) => {
      const prices = priceType === "sku" ? brand.skuPrices : brand.unitPrices
      if (prices.length < 3) return { name: brand.name, density: [] }

      const bandwidth = 5 // Adjust for smoothness
      const min = Math.max(0, Math.min(...prices) - 5)
      const max = Math.min(maxPrice, Math.max(...prices) + 5)

      // Calculate median
      const sortedPrices = [...prices].sort((a, b) => a - b)
      const median = sortedPrices[Math.floor(sortedPrices.length / 2)]

      return {
        name: brand.name,
        density: normalizeDensity(kde(prices, bandwidth, min, max, 40), 25),
        median,
        count: prices.length,
      }
    })
  }, [filteredBrands, priceType, maxPrice])

  // Brand colors
  const brandColors: Record<string, string> = {
    Lutron: "#E67E22",
    GE: "#3498DB",
    Leviton: "#9B59B6",
    BESTTEN: "rgb(253,180,98)",
    ELEGRP: "rgb(128,177,211)",
    Amazon: "rgb(252,205,229)",
    TREATLIFE: "#FF6B6B",
    "ENERLITES Store": "rgb(179,222,105)",
    Legrand: "#2ECC71",
    "SOZULAMP Store": "#95A5A6",
    Kasa: "rgb(141,211,199)",
    "TP-Link": "#4ECDC4",
    Other: "#D3D3D3",
  }

  if (filteredBrands.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No sufficient data for violin plots</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <svg viewBox="0 0 600 400" className="w-full h-full">
        {/* Background */}
        <rect width="600" height="400" fill="#f8fafc" />

        {/* Title */}
        <text x="300" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#333">
          {category === "Dimmer Switches" ? "🔆" : "💡"} Price Distribution by Brand - {category}
        </text>

        {/* Grid lines */}
        {[0, 25, 50, 75, 100, 125, 150].map((x) => (
          <line
            key={x}
            x1={100 + (x / maxPrice) * 400}
            y1="50"
            x2={100 + (x / maxPrice) * 400}
            y2="350"
            stroke="#e2e8f0"
            strokeDasharray="2,2"
          />
        ))}

        {/* X-axis */}
        <line x1="100" y1="350" x2="500" y2="350" stroke="#64748b" strokeWidth="1" />

        {/* X-axis labels */}
        {[0, 25, 50, 75, 100, 125, 150].map((x) => (
          <text key={x} x={100 + (x / maxPrice) * 400} y="370" textAnchor="middle" fontSize="12" fill="#64748b">
            ${x}
          </text>
        ))}

        {/* X-axis title */}
        <text x="300" y="390" textAnchor="middle" fontSize="14" fill="#64748b">
          Price (USD)
        </text>

        {/* Y-axis */}
        <line x1="100" y1="50" x2="100" y2="350" stroke="#64748b" strokeWidth="1" />

        {/* Brand violins */}
        {brandDensities.map((brand, index) => {
          if (brand.density.length === 0) return null

          const yPosition = 75 + index * (250 / brandDensities.length)
          const color = brandColors[brand.name] || brandColors.Other

          return (
            <g key={brand.name} transform={`translate(100, ${yPosition})`}>
              {/* Brand label */}
              <text x="-10" y="0" textAnchor="end" fontSize="12" fill="#64748b" dominantBaseline="middle">
                {brand.name}
              </text>

              {/* Violin shape */}
              <path
                d={`M 0,0 ${brand.density.map(([x, y]) => `L ${(x / maxPrice) * 400},${-y}`).join(" ")} 
                   ${brand.density
                     .slice()
                     .reverse()
                     .map(([x, y]) => `L ${(x / maxPrice) * 400},${y}`)
                     .join(" ")} Z`}
                fill={color}
                fillOpacity="0.7"
                stroke={color}
                strokeWidth="1"
              />

              {/* Median line */}
              <line
                x1={(brand.median / maxPrice) * 400}
                y1="-15"
                x2={(brand.median / maxPrice) * 400}
                y2="15"
                stroke="#fff"
                strokeWidth="2"
                strokeDasharray="2,1"
              />
            </g>
          )
        })}
      </svg>
    </ResponsiveContainer>
  )
}
