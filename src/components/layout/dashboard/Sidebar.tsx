'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, LayoutDashboard, Bell, Settings, HelpCircle, Wallet, List, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function DashboardSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchFilter, setSearchFilter] = useState('')
  const pathname = usePathname()

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: BookOpen, label: 'Mis Libros', href: '/dashboard/books' },
    // { icon: List, label: 'Mis Listas', href: '/dashboard/lists' },
    // { icon: Wallet, label: 'Facturas', href: '/dashboard/invoices' },
    // { icon: Settings, label: 'Configuración', href: '/dashboard/settings' },
  ]

  const isLinkActive = (href: string) => {
    return pathname === href ? "bg-slate-900" : ""
  }

  return (
    <div className="flex flex-col bg-base">
      <div className={`
        fixed inset-y-0 left-0 z-30 shadow-lg text-black/90 h-full transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0 w-46' : '-translate-x-full w-32'}
        lg:translate-x-0 lg:static lg:inset-auto`}>
        <div className="flex flex-col h-full">
          <ScrollArea className="flex-grow">
            <nav className="px-4 py-2 space-y-2">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  title={item.label}
                  className={`flex flex-col text-xs items-center justify-center gap-3 px-3 py-2 transition-all text-white hover:bg-slate-900 ${isLinkActive(item.href)}`}
                >
                  <item.icon className="size-4 block" />
                  <p>{item.label}</p>
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
