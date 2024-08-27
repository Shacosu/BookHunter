import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/utils/functions";
import { Book, BookDetail, PriceHistory } from "@prisma/client";
import { ArrowBigRightDash, Equal, EqualSquare, TrendingDown, TrendingUp } from "lucide-react";
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


	return (
		<>
			<Card key={book.id} className="relative">
				<CardContent className="p-4">
					<div className="w-full h-44 mb-4 rounded relative">
						<Image
							src={image}
							alt={title}
							fill
							className="object-contain"
						/>
					</div>
					<h2 className="font-semibold  mb-1 h-14 line-clamp-2" title={title}>{title}</h2>
					<div className="flex justify-between mb-2">
						<div>
							<label className="text-xs">Minimo</label>
							<p className="text-sm font-medium">{formatCurrency(minPrice)}</p>
						</div>
						<div>
							<label className="text-xs">Anterior</label>
							<p className="text-sm font-medium">{formatCurrency(lastPrice)}</p>
						</div>
						<div>
							<label className="text-xs">Actual</label>
							<p className="text-sm font-medium">{formatCurrency(currentPrice)}</p>
						</div>
					</div>

					{goodToBuy ? <Badge className="absolute top-4 right-4" variant="success">Buena Oferta!</Badge> : null}
					<div className="text-xs space-x-2">
						{stock
							? <Badge variant="default">Disponible</Badge>
							: <Badge variant="destructive">No Disponible</Badge>}
						<Badge className="mb-2" variant="outline">{formatDate(createdAt)}</Badge>
						{
							discount === 0 ? (
								<Badge className="mb-2" variant="outline">0% <Equal size={16} /></Badge>
							) : discount < 1 ? (
								<Badge className="mb-2" variant="success">{Math.abs(discount)}% <TrendingUp size={16} /></Badge>
							) : (
								<Badge className="mb-2" variant="destructive">{discount}% <TrendingDown size={16} /></Badge>
							)
						}
					</div>

					<div className="flex gap-1 items-center">
						<Link href={link} className="mt-4 px-4" target="_blank" >
							<Image src="/images/bl.png" alt="bl" width={30} height={30} />
						</Link>
						<Button className="w-full mt-4">Ver mas detalles</Button>
					</div>
				</CardContent>
			</Card>
		</>

	)
}