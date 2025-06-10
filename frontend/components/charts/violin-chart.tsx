"use client"

import { useMemo, useState, useRef } from "react"
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
  onViolinClick?: (category: string, priceRange: { min: number; max: number }) => void
}

interface HoverState {
  x: number
  y: number
  price: number
  dimmerProducts: number
  switchProducts: number
  visible: boolean
  isDimmerHover?: boolean
  isSwitchHover?: boolean
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

// Function to count products within a price range
function countProductsInRange(prices: number[], targetPrice: number, tolerancePercent: number = 0.05): number {
  const tolerance = targetPrice * tolerancePercent
  return prices.filter(price => Math.abs(price - targetPrice) <= tolerance).length
}

// Function to get density width at a specific price
function getDensityWidth(densityData: [number, number][], price: number): number {
  // Find the closest density point
  let closestPoint = densityData[0]
  let minDistance = Math.abs(densityData[0][0] - price)
  
  for (const point of densityData) {
    const distance = Math.abs(point[0] - price)
    if (distance < minDistance) {
      minDistance = distance
      closestPoint = point
    }
  }
  
  return closestPoint[1]
}

export function ViolinChart({
  dimmerPrices,
  switchPrices,
  dimmerStats,
  switchStats,
  priceType = "sku",
  onViolinClick,
}: ViolinChartProps) {
  const [hoverState, setHoverState] = useState<HoverState>({
    x: 0,
    y: 0,
    price: 0,
    dimmerProducts: 0,
    switchProducts: 0,
    visible: false,
    isDimmerHover: false,
    isSwitchHover: false,
  })
  
  const svgRef = useRef<SVGSVGElement>(null)

  // Calculate KDE for both categories
  const dimmerDensity = useMemo(() => {
    if (dimmerPrices.length === 0) return []
    const bandwidth = 5 // Adjust for smoothness
    const min = Math.max(0, dimmerStats.min - 10)
    const max = dimmerStats.max + 10 // Use actual max for better accuracy
    return normalizeDensity(kde(dimmerPrices, bandwidth, min, max, 50), 40)
  }, [dimmerPrices, dimmerStats.min, dimmerStats.max])

  const switchDensity = useMemo(() => {
    if (switchPrices.length === 0) return []
    const bandwidth = 5 // Adjust for smoothness
    const min = Math.max(0, switchStats.min - 10)
    const max = switchStats.max + 10 // Use actual max for better accuracy
    return normalizeDensity(kde(switchPrices, bandwidth, min, max, 50), 40)
  }, [switchPrices, switchStats.min, switchStats.max])

  // Calculate max price for y-axis
  const maxPrice = Math.max(dimmerStats.max || 0, switchStats.max || 0)
  
  // Generate dynamic Y-axis labels based on actual max price
  const yAxisLabels = useMemo(() => {
    const steps = 5
    const stepSize = Math.ceil(maxPrice / steps / 10) * 10 // Round to nearest 10
    return Array.from({ length: steps + 1 }, (_, i) => i * stepSize)
  }, [maxPrice])

  // Handle mouse movement
  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return
    
    const rect = svgRef.current.getBoundingClientRect()
    const svgX = ((event.clientX - rect.left) / rect.width) * 600
    const svgY = ((event.clientY - rect.top) / rect.height) * 400
    
    // Check if we're within the chart area
    if (svgX >= 80 && svgX <= 520 && svgY >= 50 && svgY <= 350) {
      // Convert SVG coordinates to price
      const price = ((350 - svgY) / 300) * maxPrice
      
      // Determine which violin we're over
      const isDimmerHover = svgX >= 120 && svgX <= 280 // Dimmer violin area (200 ± 80)
      const isSwitchHover = svgX >= 320 && svgX <= 480 // Switch violin area (400 ± 80)
      
      // Count products at this price level
      const dimmerCount = countProductsInRange(dimmerPrices, price)
      const switchCount = countProductsInRange(switchPrices, price)
      
      setHoverState({
        x: svgX,
        y: svgY,
        price: price,
        dimmerProducts: dimmerCount,
        switchProducts: switchCount,
        visible: isDimmerHover || isSwitchHover,
        isDimmerHover: isDimmerHover,
        isSwitchHover: isSwitchHover,
      })
    } else {
      setHoverState(prev => ({ ...prev, visible: false, isDimmerHover: false, isSwitchHover: false }))
    }
  }

  const handleMouseLeave = () => {
    setHoverState(prev => ({ ...prev, visible: false }))
  }

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    console.log('Violin chart clicked!')
    
    if (!svgRef.current) {
      console.log('No SVG ref')
      return
    }
    
    if (!onViolinClick) {
      console.log('No onViolinClick handler provided')
      return
    }
    
    const rect = svgRef.current.getBoundingClientRect()
    const svgX = ((event.clientX - rect.left) / rect.width) * 600
    const svgY = ((event.clientY - rect.top) / rect.height) * 400
    
    console.log(`Click position: svgX=${svgX}, svgY=${svgY}`)
    
    // Check if we're within the chart area
    if (svgX >= 80 && svgX <= 520 && svgY >= 50 && svgY <= 350) {
      console.log('Click is within chart area')
      
      // Convert SVG coordinates to price
      const price = ((350 - svgY) / 300) * maxPrice
      console.log(`Calculated price: ${price.toFixed(2)}`)
      
      // Determine which violin we clicked
      const isDimmerClick = svgX >= 120 && svgX <= 280 // Dimmer violin area
      const isSwitchClick = svgX >= 320 && svgX <= 480 // Switch violin area
      
      console.log(`isDimmerClick: ${isDimmerClick}, isSwitchClick: ${isSwitchClick}`)
      
      if (isDimmerClick || isSwitchClick) {
        // Create a very narrow price range around the clicked price (±$1 or ±3% whichever is smaller)
        const tolerance = Math.min(price * 0.03, 1)
        const priceRange = {
          min: Math.max(0, price - tolerance),
          max: price + tolerance
        }
        
        const category = isDimmerClick ? "Dimmer Switches" : "Light Switches"
        console.log(`Violin click - Category: ${category}, Price: ${price.toFixed(2)}, Range: ${priceRange.min.toFixed(2)} - ${priceRange.max.toFixed(2)}`)
        onViolinClick(category, priceRange)
      } else {
        console.log('Click not on any violin')
      }
    } else {
      console.log('Click outside chart area')
    }
  }

  // Calculate crosshair width based on violin density
  const getDimmerWidth = (price: number) => getDensityWidth(dimmerDensity, price)
  const getSwitchWidth = (price: number) => getDensityWidth(switchDensity, price)

  return (
    <div className="h-full flex">
      {/* Main Violin Plot */}
      <div className="flex-1 relative">
        <ResponsiveContainer width="100%" height="100%">
          <svg 
            ref={svgRef}
            viewBox="0 0 600 400" 
            className="w-full h-full cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => {
              console.log('Direct SVG click detected')
              handleClick(e)
            }}
          >
            {/* Background */}
            <rect width="600" height="400" fill="#f8fafc" />

            {/* Grid lines */}
            {yAxisLabels.map((y) => (
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
            {yAxisLabels.map((y) => (
              <text
                key={y}
                x="75"
                y={400 - (y / maxPrice) * 300 - 50}
                textAnchor="end"
                fontSize="12"
                fill="#64748b"
                dominantBaseline="middle"
              >
                ${y}
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

              {/* Median line - match violin width exactly */}
              <line
                x1={-getDensityWidth(dimmerDensity, dimmerStats.median)}
                y1={350 - (dimmerStats.median / maxPrice) * 300}
                x2={getDensityWidth(dimmerDensity, dimmerStats.median)}
                y2={350 - (dimmerStats.median / maxPrice) * 300}
                stroke="#7c3aed"
                strokeWidth="3"
                strokeDasharray="8,4"
              />

              {/* Mean line - match violin width exactly */}
              <line
                x1={-getDensityWidth(dimmerDensity, dimmerStats.mean)}
                y1={350 - (dimmerStats.mean / maxPrice) * 300}
                x2={getDensityWidth(dimmerDensity, dimmerStats.mean)}
                y2={350 - (dimmerStats.mean / maxPrice) * 300}
                stroke="#059669"
                strokeWidth="2"
                strokeDasharray="4,4"
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

              {/* Median line - match violin width exactly */}
              <line
                x1={-getDensityWidth(switchDensity, switchStats.median)}
                y1={350 - (switchStats.median / maxPrice) * 300}
                x2={getDensityWidth(switchDensity, switchStats.median)}
                y2={350 - (switchStats.median / maxPrice) * 300}
                stroke="#7c3aed"
                strokeWidth="3"
                strokeDasharray="8,4"
              />

              {/* Mean line - match violin width exactly */}
              <line
                x1={-getDensityWidth(switchDensity, switchStats.mean)}
                y1={350 - (switchStats.mean / maxPrice) * 300}
                x2={getDensityWidth(switchDensity, switchStats.mean)}
                y2={350 - (switchStats.mean / maxPrice) * 300}
                stroke="#059669"
                strokeWidth="2"
                strokeDasharray="4,4"
              />
            </g>

            {/* Crosshair - only show for the violin being hovered */}
            {hoverState.visible && (
              <g>
                {/* Dimmer violin crosshair - only show when hovering over dimmer */}
                {hoverState.isDimmerHover && (
                  <line
                    x1={200 - getDimmerWidth(hoverState.price)}
                    y1={hoverState.y}
                    x2={200 + getDimmerWidth(hoverState.price)}
                    y2={hoverState.y}
                    stroke="#dc2626"
                    strokeWidth="2"
                    opacity="0.9"
                  />
                )}
                
                {/* Switch violin crosshair - only show when hovering over switch */}
                {hoverState.isSwitchHover && (
                  <line
                    x1={400 - getSwitchWidth(hoverState.price)}
                    y1={hoverState.y}
                    x2={400 + getSwitchWidth(hoverState.price)}
                    y2={hoverState.y}
                    stroke="#0891b2"
                    strokeWidth="2"
                    opacity="0.9"
                  />
                )}
              </g>
            )}

            {/* X-axis labels */}
            <text x="200" y="380" textAnchor="middle" fontSize="14" fill="#64748b">
              Dimmer Switches
            </text>
            <text x="400" y="380" textAnchor="middle" fontSize="14" fill="#64748b">
              Light Switches
            </text>

            {/* Legend - moved and made more visible */}
            <g transform="translate(20, 60)">
              <rect x="0" y="0" width="160" height="85" fill="white" fillOpacity="0.9" stroke="#e5e7eb" strokeWidth="1" rx="4"/>
              
              <rect x="10" y="10" width="15" height="15" fill="#FF6B6B" fillOpacity="0.7" />
              <text x="30" y="22" fontSize="11" fill="#374151">Dimmer Switches</text>

              <rect x="10" y="30" width="15" height="15" fill="#4ECDC4" fillOpacity="0.7" />
              <text x="30" y="42" fontSize="11" fill="#374151">Light Switches</text>

              <line x1="10" y1="55" x2="25" y2="55" stroke="#7c3aed" strokeWidth="3" strokeDasharray="8,4" />
              <text x="30" y="58" fontSize="11" fill="#374151">Median</text>

              <line x1="10" y1="70" x2="25" y2="70" stroke="#059669" strokeWidth="2" strokeDasharray="4,4" />
              <text x="30" y="73" fontSize="11" fill="#374151">Mean</text>
            </g>
          </svg>
        </ResponsiveContainer>
        
        {/* Hover tooltip */}
        {hoverState.visible && (
          <div
            className="absolute bg-white border border-gray-300 rounded-md shadow-lg p-3 pointer-events-none z-10"
            style={{
              left: `${(hoverState.x / 600) * 100}%`,
              top: `${(hoverState.y / 400) * 100}%`,
              transform: 'translate(-50%, -100%)',
              marginTop: '-10px'
            }}
          >
            <div className="text-sm font-medium text-gray-800">
              Price: ${hoverState.price.toFixed(2)}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {hoverState.isDimmerHover && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-sm"></div>
                  Dimmers: {hoverState.dimmerProducts} products
                </div>
              )}
              {hoverState.isSwitchHover && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyan-400 rounded-sm"></div>
                  Switches: {hoverState.switchProducts} products
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Statistics Box */}
      <div className="w-80 ml-4 bg-white border border-gray-200 rounded-md p-4">
        <div className="mb-4">
          <h4 className="font-medium text-sm mb-2">
            Dimmer Switches ({priceType === "sku" ? "Total Price (for a full pack)" : "Price per unit"}):
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
            Light Switches ({priceType === "sku" ? "Total Price (for a full pack)" : "Price per unit"}):
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
