import DashboardSidebar from "@/components/layout/dashboard/Sidebar";

export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="flex md:gap-2">
			<DashboardSidebar />
			<main className="flex-1 max-w-full">
				{children}
			</main>
		</div>
	)
}