import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bell, BookMarked, Percent, TrendingUp } from "lucide-react"
import Image from "next/image"
import { getBooksStats } from "@/utils/services"
import { formatCurrency, formatDate } from "@/utils/functions"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface BookProps {
	id: number
	title: string
	currentPrice: number
	previousPrice: number
	rawDiscount: number
	discount: number
	image: string
	link: string
}


const recentAlerts = [
	{ id: 1, book: "Dune", author: "Frank Herbert", price: "11.99€", date: "2023-07-15" },
	{ id: 2, book: "El Hobbit", author: "J.R.R. Tolkien", price: "8.99€", date: "2023-07-14" },
	{ id: 3, book: "Orgullo y prejuicio", author: "Jane Austen", price: "7.50€", date: "2023-07-13" },
	{ id: 4, book: "Neuromante", author: "William Gibson", price: "10.99€", date: "2023-07-12" },
]

export default async function Dashboard() {
	const { dailyOffers, totalBooks, totalMonthBooks, bestOffers, recentBooksUpdated } = await getBooksStats()
	return (
		<div className="overflow-auto space-y-4">
			<h1 className="text-3xl font-bold mb-6">Dashboard</h1>

			{/* Tarjetas de resumen */}
			<div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Ofertas Importantes</CardTitle>
						<Bell className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">15</div>
						<p className="text-xs text-muted-foreground">+2 desde ayer</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Libros Guardados</CardTitle>
						<BookMarked className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{totalBooks}</div>
						<p className="text-xs text-muted-foreground">+{totalMonthBooks} este mes</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Ofertas Recientes</CardTitle>
						<Percent className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{dailyOffers}</div>
						<p className="text-xs text-muted-foreground">En las últimas 24 horas</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Ahorro Total</CardTitle>
						<TrendingUp className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">89.99€</div>
						<p className="text-xs text-muted-foreground">+14.50€ desde la semana pasada</p>
					</CardContent>
				</Card>
			</div>


			{/* Ofertas destacadas */}
			<h2 className="text-2xl font-semibold mb-4">Ofertas Destacadas</h2>
			<div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mb-8">
				{bestOffers.map((book) => {
					if (book && book?.id && book?.title && book?.currentPrice && book?.previousPrice && book?.discount && book?.image && book?.link && book?.updatedAt)
						return (
							<Card key={book?.id}>
								<CardContent className="flex flex-col md:flex-row items-center p-4 text-xs md:gap-1 gap-2">
									<picture className="min-w-20 h-28 object-cover mr-4 relative">
										<Image src={book.image} alt={book.title}
											fill
											className="object-cover"
										/>
									</picture>
									<div>
										<h3 className="font-semibold line-clamp-1">{book?.title}</h3>
										<p className="text-xs text-muted-foreground">Actualizado: {formatDate(book?.updatedAt)}</p>
										<p className="text-xs text-muted-foreground">Anterior: <span className="line-through">{formatCurrency(book?.previousPrice)}</span></p>
										<p className="text-sm font-bold">Actual: {formatCurrency(book?.currentPrice)}</p>
										<p className="text-green-600">Dscto: {book?.discount}%</p>
										<Button size="xs" asChild>
											<Link href={book?.link} target="_blank">Ver oferta</Link>
										</Button>
									</div>
								</CardContent>
							</Card>
						)
				})}
			</div>

			{/* Tabla de alertas recientes */}
			<h2 className="text-2xl font-semibold mb-4">Ultimas Actualizaciones</h2>
			<Card>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>#</TableHead>
								<TableHead className="">Libro</TableHead>
								<TableHead className="text-end w-2/12">Precio Actual</TableHead>
								<TableHead className="text-end w-2/12">Precio Anterior</TableHead>
								<TableHead >Fecha de actualizacion</TableHead>
								<TableHead >Acción</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{recentBooksUpdated.map((alert) => (
								<TableRow key={alert.id}>
									<TableCell>
										{alert.BookDetail?.image && (
											<div className="w-8 h-12 object-cover mr-4 relative">
												<Image src={alert.BookDetail?.image} alt={alert.BookDetail?.title}
													fill
													className="object-cover"
												/>
											</div>
										)}
									</TableCell>
									<TableCell className="truncate max-w-xs">{alert.BookDetail?.title}</TableCell>
									<TableCell className="text-end">
										<Badge variant="outline" className="bg-yellow-500">
											{formatCurrency(alert.BookDetail?.PriceHistory[0].price || 0)}
										</Badge>
									</TableCell>
									<TableCell className="text-end">
										<Badge variant="outline" className="bg-gray-300">
											{formatCurrency(alert.BookDetail?.PriceHistory[1].price || 0)}
										</Badge>
									</TableCell>
									<TableCell>{formatDate(alert.BookDetail?.updatedAt || new Date())}</TableCell>
									<TableCell>
										<Button asChild size="xs" >
											<Link href={alert.BookDetail?.link || ""} target="_blank">Ver libro</Link>
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
}