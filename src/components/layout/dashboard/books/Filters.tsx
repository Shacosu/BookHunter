"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { formatCurrency } from "@/utils/functions"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"


export default function Filters() {
  const [searchTerm, setSearchTerm] = useState('')
  const [genreFilter, setGenreFilter] = useState('')
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [inStockOnly, setInStockOnly] = useState(false)
	const searchParams = useSearchParams();
  const defaultValue = searchParams.get("search")?.toString() || "";
	const pathname = usePathname();
	const { replace } = useRouter();
	const handleChange = useDebouncedCallback((searchQuery: string) => {
		const params = new URLSearchParams(searchParams);
		if (searchQuery) {
			params.set("search", searchQuery);
		} else {
			params.delete("search");
		}
		replace(`${pathname}?${encodeURI(params.toString())}`)
	}, 300)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Catálogo de Libros</h1>
      <div className="mb-8 space-y-4">
        <Input
          type="text"
          placeholder="Buscar por título..."
          onChange={(e) => handleChange(e.target.value)}
          className="max-w-md"
          defaultValue={defaultValue}
        />
        <div className="flex flex-wrap gap-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Género" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los géneros</SelectItem>
              <SelectItem value="Fantasía">Fantasía</SelectItem>
              <SelectItem value="Ciencia ficción">Ciencia ficción</SelectItem>
              <SelectItem value="Realismo mágico">Realismo mágico</SelectItem>
              <SelectItem value="Romance">Romance</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
              <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
              <SelectItem value="date-asc">Fecha: Antiguo a Reciente</SelectItem>
              <SelectItem value="date-desc">Fecha: Reciente a Antiguo</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2">
            <Label htmlFor="price-range">Precio: de {formatCurrency(priceRange[0])} hasta {formatCurrency(priceRange[1])}</Label>
            <Slider
              id="price-range"
              min={0}
              max={100000}
              step={1}
              value={priceRange}
              onValueChange={setPriceRange}
              className="w-[200px]"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="stock-filter"
              checked={inStockOnly}
              onCheckedChange={setInStockOnly}
            />
            <Label htmlFor="stock-filter">Solo en stock</Label>
          </div>
          <div className="ml-auto">
            <Select>
              <SelectTrigger className="w-[75px]">
                <SelectValue placeholder="12" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24">24</SelectItem>
                <SelectItem value="36">36</SelectItem>
                <SelectItem value="48">48</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

    </div>
  )
}