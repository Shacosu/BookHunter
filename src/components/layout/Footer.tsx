import Link from "next/link";

export default function Footer() {
	return (
		<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 bg-secondary text-white">
			<p className="text-xs ">
				© {new Date().getFullYear()} Book Hunter. Todos los derechos reservados.
			</p>
			<nav className="sm:ml-auto flex gap-4 sm:gap-6">
				<Link className="text-xs hover:underline underline-offset-4" href="#">
					Términos de servicio
				</Link>
				<Link className="text-xs hover:underline underline-offset-4" href="#">
					Política de privacidad
				</Link>
			</nav>
		</footer>
	)
}