import Filters from "@/components/layout/dashboard/books/Filters";
import { getAllBooks } from "@/utils/services";
import RenderBooks from "@/components/layout/dashboard/books/RenderBooks";
import { Book, BookDetail, PriceHistory } from "@prisma/client";
import { PaginationComponent } from "@/components/layout/dashboard/books/Pagination";

type BooksProps = Book & {
	BookDetail: BookDetail & {
		PriceHistory: PriceHistory[]
	}
}


export default async function Books({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
	const search = searchParams.search?.toString() || "";
	const { books, nextPage, prevPage, totalPages} = await getAllBooks({ search });

	return (
		<div className="p-4">
			<Filters />
			{!books.length ? (
				<div>
					<h1 className="text-3xl">
						No hay libros disponibles
					</h1>
					<p>
						Favor ingresar lista de libros para visualizar en esta sección
					</p>
				</div>
			) : (
				<>
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-screen overflow-auto">
						{books.map((book: any) => (
							<RenderBooks book={book.BookDetail} key={book.id} />
						))}
					</div>
					<PaginationComponent />
				</>
			)}
		</div>

	)
}