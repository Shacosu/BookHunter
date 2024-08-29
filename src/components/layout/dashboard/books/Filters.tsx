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


export default function Filters({ totalBooks }: { totalBooks: number }) {
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [inStockOnly, setInStockOnly] = useState(true)
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get("search")?.toString() || "";
  const { replace } = useRouter();
  const handleChange = useDebouncedCallback((searchQuery: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    replace(newUrl);
  }, 300)

  const changeFilter = (value: string | boolean | null, key: string) => {
    const params = new URLSearchParams(window.location.search);

    if (key === "stock") setInStockOnly(!inStockOnly);
    if (key === "size" || key === "stock") params.delete("page");
    if (value || value === false) {

      params.set(key, value.toString());
    } else {

      params.delete(key);
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    replace(newUrl);
  };


  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Catálogo de Libros</h1>
      <div className="mb-4 space-y-4">
        <Input
          type="text"
          placeholder="Buscar por título..."
          onChange={(e) => handleChange(e.target.value)}
          className="max-w-md"
          defaultValue={defaultValue}
        />
        <div className="flex flex-wrap gap-4">
          <Select onValueChange={value => changeFilter(value, "genre")} defaultValue={
            decodeURIComponent(searchParams.get("genre")?.toString() || "")
          }>
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
          <Select onValueChange={value => changeFilter(value, "filterBy")} defaultValue={
            searchParams.get("filterBy")?.toString()
          }>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="priceAsc">Precio: Menor a Mayor</SelectItem>
              <SelectItem value="priceDesc">Precio: Mayor a Menor</SelectItem>
              <SelectItem value="dateAsc">Fecha: Antiguo a Reciente</SelectItem>
              <SelectItem value="dateDesc">Fecha: Reciente a Antiguo</SelectItem>
            </SelectContent>
          </Select>
          {/* <div className="flex items-center space-x-2">
            <Label htmlFor="price-range">Precio: de {formatCurrency(Number(searchParams.get("minPrice")) || 0)} hasta {formatCurrency(priceRange[1])}</Label>
            <Slider
              id="price-range"
              min={0}
              max={100000}
              step={0.1}
              value={
                searchParams.get("minPrice")?.toString() ? [parseInt(searchParams.get("minPrice")?.toString() || "0"), 100000] : priceRange
              }
              onValueChange={(value) => changeFilter(value[0].toString(), "minPrice")}
              className="w-[200px] cursor-pointer"
            />
          </div> */}
          <div className="flex items-center space-x-2">
            <Switch
              id="stock-filter"
              checked={inStockOnly}
              onCheckedChange={(value) => changeFilter(value, "stock")}
            />
            <Label htmlFor="stock-filter">Solo en stock</Label>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-muted-foreground text-xs">Mostrando {totalBooks} libros</span>
            <Select onValueChange={(value) => changeFilter(value.toString(), "size")} defaultValue={
              searchParams.get("size")?.toString() || "12"
            }>
              <SelectTrigger className="w-[75px]">
                <SelectValue placeholder="12" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12</SelectItem>
                <SelectItem value="24">24</SelectItem>
                <SelectItem value="36">36</SelectItem>
                <SelectItem value="48">48</SelectItem>
                <SelectItem value="60">60</SelectItem>
                <SelectItem value="72">72</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

    </div>
  )
}