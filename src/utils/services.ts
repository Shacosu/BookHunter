"use server"
import prisma from "@/utils/db";

// interface GetBookProps {
// 	page: number,
// 	limit: number,
// 	filter: string,
// 	search: string,
// }

// export async function getAllDataBooks({ page = 1, limit = 12, filter, search }: GetBookProps) {
// 	let BookDetail = {};
// 	switch (filter) {
// 		case "date":
// 			BookDetail = {
// 				createdAt: "desc"
// 			};
// 			break;
// 		case "name":
// 			BookDetail = {
// 				title: "asc"
// 			};
// 			break;
// 		case "stock":
// 			BookDetail = {
// 				stock: "desc"
// 			};
// 			break;
// 		case "update":
// 			BookDetail = {
// 				updatedAt: "desc"
// 			};
// 			break;
// 		default:
// 			BookDetail = {
// 				createdAt: "desc"
// 			};
// 	}

// 	const books = await prisma.book.findMany({
// 		where: {
// 			BookDetail: {
// 				title: {
// 					contains: search === "all" ? "" : search,
// 					mode: "insensitive"
// 				}
// 			}
// 		},
// 		include: {
// 			BookDetail: {
// 				include: {
// 					PriceHistory: {
// 						orderBy: {
// 							createdAt: "desc"
// 						},
// 					}
// 				}
// 			}
// 		},
// 		skip: (page - 1) * limit,
// 		take: limit,
// 		orderBy: {
// 			BookDetail
// 		},
// 	});

// 	const count = await prisma.book.count({
// 		where: {
// 			BookDetail: {
// 				title: {
// 					contains: search === "all" ? "" : search,
// 					mode: "insensitive"
// 				}
// 			}
// 		}
// 	});
// 	const totalPages = Math.ceil(count / limit);
// 	const nextPage = page < totalPages ? page + 1 : null;
// 	const prevPage = page > 1 ? page - 1 : null;

// 	return {
// 		list: books,
// 		nextPage,
// 		prevPage,
// 		totalPages
// 	};
// }


// export async function getBookById({ id }: { id: number }) {
// 	const book = await prisma.book.findUnique({
// 		where: {
// 			id
// 		},
// 		include: {
// 			BookDetail: {
// 				include: {
// 					PriceHistory: {
// 						orderBy: {
// 							createdAt: "desc"
// 						},
// 					}
// 				}
// 			}
// 		}
// 	});

// 	return book;
// }


export async function getAllBooks({ search, size = 12, page = 1 }: { search: string, size?: number, limit?: number, page?: number }) {
	const books = await prisma.book.findMany({
		cacheStrategy: {
			ttl: 60,
			swr: 60,
		},
		where: {
			BookDetail: {
				title: {
					contains: search === "all" ? undefined : search,
					mode: "insensitive"
				}
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
	});

	const count = await prisma.book.count({
		where: {
			BookDetail: {
				title: {
					contains: search === "all" ? undefined : search,
					mode: "insensitive"
				}
			}
		}
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
				ttl: 60,
				swr: 60,
			},
			where: {
				BookDetail: {
					createdAt: {
						gte: new Date(new Date().setDate(1)),
						lte: new Date()
					}
				}
			}
		}),
		prisma.priceHistory.count({
			cacheStrategy: {
				ttl: 60,
				swr: 60,
			},
			where: {
				createdAt: {
					gte: new Date(new Date().setHours(0o0, 0o0, 0o0)),
					lte: new Date(new Date().setHours(23, 59, 59))
				}
			}
		}),
		prisma.priceHistory.count({
			cacheStrategy: {
				ttl: 60,
				swr: 60,
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
				ttl: 60,
				swr: 60,
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
			},
			take: 24
		})
	]);


	return {
		totalBooks,
		dailyOffers,
		weeklyOffers,
		totalMonthBooks
	};


}