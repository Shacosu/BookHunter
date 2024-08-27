import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bell, BookMarked, Percent, TrendingUp } from "lucide-react"
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Image from "next/image"
import { getBooksStats } from "@/utils/services"

const savingsData = [
	{ name: 'Ene', amount: 20 },
	{ name: 'Feb', amount: 35 },
	{ name: 'Mar', amount: 30 },
	{ name: 'Abr', amount: 45 },
	{ name: 'May', amount: 55 },
	{ name: 'Jun', amount: 60 },
	{ name: 'Jul', amount: 75 },
]

const featuredDeals = [
	{ id: 1, title: "El nombre del viento", author: "Patrick Rothfuss", price: "15.99€", discount: "30%", image: "https://placehold.co/150x250" },
	{ id: 2, title: "1984", author: "George Orwell", price: "9.99€", discount: "25%", image: "https://placehold.co/150x250" },
	{ id: 3, title: "Cien años de soledad", author: "Gabriel García Márquez", price: "12.50€", discount: "20%", image: "https://placehold.co/150x250" },
	{
		id: 4,
		title: "El Señor de los Anillos",
		author: "J.R.R. Tolkien",
		price: "19.99€",
		discount: "15%",
		image: "https://placehold.co/150x250",
	}
]

const recentAlerts = [
	{ id: 1, book: "Dune", author: "Frank Herbert", price: "11.99€", date: "2023-07-15" },
	{ id: 2, book: "El Hobbit", author: "J.R.R. Tolkien", price: "8.99€", date: "2023-07-14" },
	{ id: 3, book: "Orgullo y prejuicio", author: "Jane Austen", price: "7.50€", date: "2023-07-13" },
	{ id: 4, book: "Neuromante", author: "William Gibson", price: "10.99€", date: "2023-07-12" },
]

export default async function Dashboard() {
	const { dailyOffers, totalBooks,totalMonthBooks, weeklyOffers } = await getBooksStats()
	return (
		<div className="overflow-auto h-screen p-4">
			<h1 className="text-3xl font-bold mb-6">Dashboard</h1>

			{/* Tarjetas de resumen */}
			<div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mb-8">
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

			{/* Gráfico de tendencias de ahorro */}
			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Tendencias de Ahorro</CardTitle>
				</CardHeader>
				<CardContent>
					{/* <div className="h-[300px]">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={savingsData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Line type="monotone" dataKey="amount" stroke="#8884d8" />
							</LineChart>
						</ResponsiveContainer>
					</div> */}
				</CardContent>
			</Card>

			{/* Ofertas destacadas */}
			<h2 className="text-2xl font-semibold mb-4">Ofertas Destacadas</h2>
			<div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mb-8">
				{featuredDeals.map((deal) => (
					<Card key={deal.id}>
						<CardContent className="flex items-center p-4 text-xs">
							<picture className="w-20 h-28 object-cover mr-4 relative">
								<Image src={deal.image} alt={deal.title}
									fill
									className="object-cover"

								/>
							</picture>

							<div>
								<h3 className="font-semibold line-clamp-2">{deal.title}</h3>
								<p className="text-gray-600">{deal.author}</p>
								<p className="text-sm font-bold">{deal.price}</p>
								<p className="text-green-600">Dscto: {deal.discount}</p>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Tabla de alertas recientes */}
			<h2 className="text-2xl font-semibold mb-4">Alertas Recientes</h2>
			<Card>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Libro</TableHead>
								<TableHead>Autor</TableHead>
								<TableHead>Precio</TableHead>
								<TableHead>Fecha</TableHead>
								<TableHead>Acción</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{recentAlerts.map((alert) => (
								<TableRow key={alert.id}>
									<TableCell>{alert.book}</TableCell>
									<TableCell>{alert.author}</TableCell>
									<TableCell>{alert.price}</TableCell>
									<TableCell>{alert.date}</TableCell>
									<TableCell>
										<Button variant="outline" size="sm">Ver oferta</Button>
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