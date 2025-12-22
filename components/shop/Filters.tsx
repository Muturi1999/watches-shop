"use client"
import React from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"

type Props = {
  minPrice: number
  maxPrice: number
  priceRange: [number, number]
  onPriceChange: (range: [number, number]) => void
  straps: string[]
  selectedStraps: string[]
  onToggleStrap: (strap: string) => void
  showAccessories: boolean
  onToggleAccessories: () => void
}

export default function Filters({
  minPrice,
  maxPrice,
  priceRange,
  onPriceChange,
  straps,
  selectedStraps,
  onToggleStrap,
  showAccessories,
  onToggleAccessories,
}: Props) {
  return (
    <aside className="w-full md:w-64">
      <div className="rounded-md border border-border p-4 space-y-4">
        <h4 className="font-semibold text-foreground">Filters</h4>

        <div>
          <label className="text-sm text-muted-foreground">Price</label>
          <div className="mt-3">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>KSh {priceRange[0]}</span>
              <span>KSh {priceRange[1]}</span>
            </div>
            <Slider
              value={priceRange}
              min={minPrice}
              max={maxPrice}
              onValueChange={(vals) => onPriceChange([Number(vals[0]), Number(vals[1])])}
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-muted-foreground">Strap</label>
          <div className="mt-2 space-y-2">
            {straps.map((strap) => (
              <div key={strap} className="flex items-center gap-2">
                <Checkbox
                  checked={selectedStraps.includes(strap)}
                  onCheckedChange={() => onToggleStrap(strap)}
                />
                <span className="text-sm">{strap}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={showAccessories} onCheckedChange={onToggleAccessories} />
            <span className="text-sm">Show accessories</span>
          </label>
        </div>
      </div>
    </aside>
  )
}
