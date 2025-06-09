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
            {value === "sku" ? "SKU Price (Selling Price)" : "Unit Price (List Price)"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sku">SKU Price (Selling Price)</SelectItem>
          <SelectItem value="unit">Unit Price (List Price)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
