import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/utils/functions";
import { PriceHistory } from "@prisma/client";
import { Equal, TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";



export default function RenderBooks({ book }: { book: any }) {
	const { title, image, link, createdAt, updatedAt, stock, PriceHistory } = book;

	const lastPrice = PriceHistory[1].price || 0
	const currentPrice = PriceHistory[0].price || 0
	const discount = lastPrice !== 0 && currentPrice !== 0 ? Math.round(((currentPrice - lastPrice) / lastPrice) * 100 * 100) / 100 : 0
	const goodToBuy = discount < -15
	const withoutCero = PriceHistory.filter((price: PriceHistory) => price.price !== 0)
	const minPrice = Math.min(...withoutCero.map((price: PriceHistory) => price.price))
	const bestPrice = currentPrice <= minPrice


	return (
		<>
			<Card key={book.id} className="relative">
				<CardContent className="p-4">
					<div className="w-full h-32 mb-4 rounded relative">
						<Image
							src={image}
							alt={title}
							fill
							className="object-contain"
						/>
					</div>
					<h2 className="font-semibold  mb-1 h-10 text-sm line-clamp-2" title={title}>{title}</h2>
					<div className="flex justify-between mb-2 font-medium">
						<div>
							<label className="text-xs">Minimo</label>
							<p className="text-sm font-bold">{formatCurrency(minPrice)}</p>
						</div>
						<div>
							<label className="text-xs">Anterior</label>
							<p className="text-sm font-bold">{formatCurrency(lastPrice)}</p>
						</div>
						<div>
							<label className="text-xs">Actual</label>
							<p className="text-sm font-bold">{formatCurrency(currentPrice)}</p>
						</div>
					</div>

					{goodToBuy && !bestPrice ? <Badge className="absolute top-9 right-2" variant="success">Buena Oferta!</Badge> : null}
					{bestPrice ? <Badge className="absolute top-9 right-2" variant="success">Mejor Precio! 🔥</Badge> : null}
					<div className="text-xs flex items-center gap-2">
						{stock
							? <Badge className="absolute top-2 right-2" variant="default">Disponible</Badge>
							: <Badge variant="destructive">No Disponible</Badge>}

						{
							discount === 0 ? (
								<Badge variant="outline"><Equal size={16} className="mr-1" /> 0%</Badge>
							) : discount < 1 ? (
								<Badge variant="success"><TrendingUp size={16} className="mr-1" /> {Math.abs(discount)}%</Badge>
							) : (
								<Badge variant="destructive"><TrendingDown size={16} className="mr-1" />{discount}%</Badge>
							)
						}
						<Badge variant="outline" className="capitalize">{formatDate(updatedAt)}</Badge>
					</div>

					<div className="flex gap-1 items-center">
						<Link href={link} className="mt-4 px-4" target="_blank" >
							<Image src="/images/bl.png" alt="bl" width={30} height={30} />
						</Link>
						<Button size="sm" className="w-full mt-4">Ver mas detalles</Button>
					</div>
				</CardContent>
			</Card>
		</>

	)
}