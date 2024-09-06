"use client"

import { useAuth, UserButton, useUser } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Bell } from "lucide-react"
import { Badge } from "../ui/badge"


export default function Navbar() {
	const { isLoaded, userId } = useAuth()
	const { user } = useUser()
	const pathname = usePathname()

	const toHome = pathname === "/" || pathname === "/sign-in" || pathname === "/sign-up"

	return (
		<header className="px-4 lg:px-6 h-16 flex items-center sticky top-0 bg-base text-white shadow-lg z-50">
			{
				toHome ? (
					<Link href="/" prefetch={false}>
						<Image
							src="/images/logo-white.webp"
							alt="Book Hunter Logo"
							width={180}
							height={32}
						/>
					</Link>
				) : (
					<Link href="/dashboard" prefetch={false}>
						<Image
							src="/images/logo-white.webp"
							alt="Book Hunter Logo"
							width={180}
							height={32}
						/>
					</Link>
				)
			}

			<nav className="md:flex items-center gap-4 hidden ml-4">
				{pathname === "/" && (
					<>
						<Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
							Características
						</Link>
						<Link className="text-sm font-medium hover:underline underline-offset-4" href="#testimonials">
							Testimonios
						</Link>
						<Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
							Precios
						</Link>
					</>
				)}

			</nav>
			<div className="flex items-center justify-end gap-4 ml-auto">
				{
					isLoaded ? (
						userId ? (
							<>
								{!pathname.includes("dashboard") && <Link className="bg-secondary p-2 text-white text-sm" href="/dashboard" prefetch={false}>
									Dashboard
								</Link>}
								<div className="text-sm hidden md:block">Bienvenido/a, <span className="capitalize font-medium">{user?.username}</span></div>
								<UserButton />
								<div className="relative">
									<Bell className="h-6 w-6 " />
									<Badge className="absolute -top-2 -right-3 p-1 py-0 tabular-nums" variant="secondary">
										9
									</Badge>
								</div>
							</>
						) : (

							<Link href="/sign-up" className="bg-secondary p-2 text-white text-sm rounded-tr rounded-bl">
								Registrarse
							</Link>

						)
					) : null
				}
			</div>
		</header>
	)
}