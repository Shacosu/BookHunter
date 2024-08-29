import DashboardSidebar from "@/components/layout/dashboard/Sidebar";

export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="flex md:gap-2 h-[calc(100vh-64px)]">
			<DashboardSidebar />
			<div className="flex-1 overflow-hidden">
				<div className="h-full overflow-y-auto p-4">
					{children}
				</div>
			</div>
		</div>
	)
}