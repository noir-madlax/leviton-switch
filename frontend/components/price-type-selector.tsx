"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type PriceType = "sku" | "unit"

interface PriceTypeSelectorProps {
  onChange: (value: PriceType) => void
  defaultValue?: PriceType
}

export function PriceTypeSelector({ onChange, defaultValue = "sku" }: PriceTypeSelectorProps) {
  const [value, setValue] = useState<PriceType>(defaultValue)

  const handleValueChange = (newValue: PriceType) => {
    setValue(newValue)
    onChange(newValue)
  }

  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-sm font-medium">Price Type:</span>
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select price type">
            {value === "sku" ? "Total Price (for a full pack)" : "Price per unit"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sku">Total Price (for a full pack)</SelectItem>
          <SelectItem value="unit">Price per unit</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
