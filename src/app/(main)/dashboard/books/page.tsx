import Filters from "@/components/layout/dashboard/books/Filters";
import { getAllBooks } from "@/utils/services";
import RenderBooks from "@/components/layout/dashboard/books/RenderBooks";
import { PaginationComponent } from "@/components/layout/dashboard/books/Pagination";

export default async function Books({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
	const search = searchParams.search?.toString() || "";
	const size = Number(searchParams.size) || 12;
	const stock = searchParams.stock === "true" || !searchParams.stock;
	const page = Number(searchParams.page) || 1;
	const { books, nextPage, prevPage, totalPages } = await getAllBooks({ search, page, size, stock });


	return (
		<div className="flex flex-col min-h-screen">
			<Filters totalBooks={books.length} />
			{!books.length ? (
				<div className="flex-grow flex flex-col items-center justify-center">
					<h1 className="text-3xl">
						No hay libros disponibles
					</h1>
					<p>
						Favor ingresar lista de libros para visualizar en esta sección
					</p>
				</div>
			) : (
				<>
					<div className="flex-grow overflow-auto">
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{books.map((book: any) => (
								<RenderBooks book={book.BookDetail} key={book.id} />
							))}

						</div>

					</div>
					<div>
						<PaginationComponent nextPage={nextPage} prevPage={prevPage} totalPages={totalPages} />
					</div>
				</>
			)}
		</div>
	)
}