"use client"

import { useAuth, UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Bell } from "lucide-react"
import { Badge } from "../ui/badge"

export default function Navbar() {
	const { isLoaded, userId } = useAuth()
	const pathname = usePathname()

	return (
		<header className="px-4 lg:px-6 h-16 flex items-center sticky top-0 bg-base text-white shadow-lg z-50">
			<Link className="flex items-center justify-center" href="/">
				<Image width={180} height={30} src="/images/logo-white.webp" alt="Book Hunter" />
			</Link>
			<nav className="ml-auto md:flex items-center gap-4 sm:gap-6 hidden">
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
				{
					isLoaded ? (
						userId ? (
							<>
								<Link className="bg-secondary p-2 text-white text-sm" href="/dashboard">
									Dashboard
								</Link>
								<UserButton />
								<div className="relative">
									<Bell className="h-6 w-6 " />
									<Badge className="absolute -top-2 -right-3 p-1 py-0 tabular-nums" variant="secondary">
										9
									</Badge>

								</div>
							</>
						) : (
							<Link className="text-sm font-medium hover:underline underline-offset-4" href="/sign-in">
								Iniciar sesión
							</Link>
						)
					) : null
				}
			</nav>
		</header>
	)
}