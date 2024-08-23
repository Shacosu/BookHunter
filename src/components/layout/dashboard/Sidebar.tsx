'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, LayoutDashboard, Bell, Settings, HelpCircle, Wallet, List, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function DashboardSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchFilter, setSearchFilter] = useState('')

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: BookOpen, label: 'Mis Libros', href: '/dashboard/books' },
    { icon: List, label: 'Mis Listas', href: '/dashboard/lists' },
    { icon: Settings, label: 'Configuración', href: '/dashboard/settings' },
    { icon: Wallet, label: 'Facturas', href: '/dashboard/invoices' },
    { icon: HelpCircle, label: 'Ayuda', href: '/dashboard/help' },
  ]



  return (
    <div className="flex flex-col min-h-screen bg-base">
      <div className={`
        fixed inset-y-0 left-0 z-30  shadow-lg text-black/90 h-full  transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0 w-46' : '-translate-x-full w-32'}
        lg:translate-x-0 lg:static lg:inset-auto`}>
        <div className="flex flex-col h-full">
          <ScrollArea className="flex-grow">
            <nav className="px-4 py-2">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  title={item.label}
                  className="flex flex-col text-xs items-center justify-center gap-3 rounded-lg px-3 py-2  transition-all text-white  hover:bg-gray-800"
                >
                  <item.icon className="h-4 w-4 block" />
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