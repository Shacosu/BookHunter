import Filters from "@/components/layout/dashboard/books/Filters";
import { getAllBooks } from "@/utils/services";
import RenderBooks from "@/components/layout/dashboard/books/RenderBooks";
import { Book, BookDetail, PriceHistory } from "@prisma/client";
import { PaginationComponent } from "@/components/layout/dashboard/books/Pagination";
import { Suspense } from "react";

export default async function Books({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
	const search = searchParams.search?.toString() || "";
	const size = Number(searchParams.size) || 12;
	const { books, nextPage, prevPage, totalPages } = await getAllBooks({ search, size });

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
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-[calc(100vh-260px)] overflow-auto">
						<Suspense fallback={<div>loading...</div>}>
							{books.map((book: any) => (
								<RenderBooks book={book.BookDetail} key={book.id} />
							))}
						</Suspense>
					</div>
					<PaginationComponent />
				</>
			)}
		</div>

	)
}