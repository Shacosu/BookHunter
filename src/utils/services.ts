"use server"
import prisma from "@/utils/db";


export async function getAllBooks({ search, size = 12, page = 1, stock }: { search: string, size?: number, limit?: number, page?: number, stock?: boolean }) {
	const books = await prisma.book.findMany({
		cacheStrategy: {
			ttl: 300,
			swr: 300,
		},
		where: {
			BookDetail: {
				title: {
					contains: search === "all" ? undefined : search,
					mode: "insensitive",
				},
				stock: stock ? 1 : undefined,
			}
		},
		include: {
			BookDetail: {
				include: {
					PriceHistory: {
						orderBy: {
							createdAt: "desc"
						}
					}
				}
			}
		},
		take: size,
		skip: (page - 1) * size,
	});

	const count = await prisma.book.count({
		cacheStrategy: {
			ttl: 300,
			swr: 300,
		},
		where: {
			BookDetail: {
				title: {
					contains: search === "all" ? undefined : search,
					mode: "insensitive"
				},
				stock: stock ? 1 : undefined
			}
		},
	});

	const totalPages = Math.ceil(count / size);
	const nextPage = page < totalPages ? page + 1 : null;
	const prevPage = page > 1 ? page - 1 : null;

	return {
		books,
		nextPage,
		prevPage,
		totalPages
	};
}


export async function getBooksStats() {

	const [totalBooks, totalMonthBooks, dailyOffers, weeklyOffers, booksWithPrice] = await prisma.$transaction([
		prisma.book.count(),
		prisma.book.count({
			cacheStrategy: {
				ttl: 300,
				swr: 300,
			},
			where: {
				BookDetail: {
					createdAt: {
						gte: new Date(new Date().setDate(1)),
						lte: new Date()
					}
				}
			},
		}),
		prisma.priceHistory.count({
			cacheStrategy: {
				ttl: 300,
				swr: 300,
			},
			where: {
				createdAt: {
					gte: new Date(new Date().setHours(0o0, 0o0, 0o0)),
					lte: new Date(new Date().setHours(23, 59, 59))
				}
			},
		}),
		prisma.priceHistory.count({
			cacheStrategy: {
				ttl: 300,
				swr: 300,
			},
			where: {
				createdAt: {
					gte: new Date(new Date().setDate(new Date().getDate() - 7)),
					lte: new Date()
				}
			}
		}),
		prisma.book.findMany({
			cacheStrategy: {
				ttl: 300,
				swr: 300,
			},
			include: {
				BookDetail: {
					include: {
						PriceHistory: {
							orderBy: {
								createdAt: "desc"
							},
						}
					}
				}
			}
		})
	]);

	const bestOffers = booksWithPrice.map((book) => {
		const prices = book.BookDetail?.PriceHistory?.map((price) => price.price).filter(Boolean) || [];
		if (prices.length > 1) {
			const discount = (prices[1] - prices[0]) / prices[1]
			if (discount > 0.15) {
				return {
					id: book.id,
					title: book?.BookDetail?.title,
					currentPrice: prices[0],
					previousPrice: prices[1],
					rawDiscount: discount,
					discount: Math.round(discount * 100),
					image: book?.BookDetail?.image,
					link: book.BookDetail?.link,
					updatedAt: book?.BookDetail?.updatedAt
				}
			}
		}
	}).filter(Boolean).sort((a, b) => (b?.rawDiscount || 0) - (a?.rawDiscount || 0)).slice(0, 4)

	const recentBooksUpdated = booksWithPrice.sort((a, b) => ((b?.BookDetail?.updatedAt || 0) as number) - ((a?.BookDetail?.updatedAt || 0) as number)).slice(0, 5)

	return {
		totalBooks,
		dailyOffers,
		weeklyOffers,
		totalMonthBooks,
		bestOffers,
		recentBooksUpdated
	};


}