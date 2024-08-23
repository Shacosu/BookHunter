import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex items-center gap-2 flex-col justify-center h-screen">
			<div className="flex items-center"><span className="text-7xl font-bold">404</span> <Frown size={52} className="inline" /></div>
			<p className="text-lg text-muted-foreground">
				La página que buscas no existe o ha sido movida.
			</p>
			<Link href="/">
				<Button>Ir a la página de inicio</Button>
			</Link>
		</div>
	)
}