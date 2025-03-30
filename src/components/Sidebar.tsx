import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import React from "react"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
import { Plus } from "lucide-react"

export default function Sidebar({children} : {children : React.ReactNode}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b px-4 pr-8">
          <div>
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />

          </div>
          <Link to='/tasks/create'>
          <Button className="cursor-pointer">
            <Plus />
            Add Task
          </Button>
          </Link>

        </header>

        <div className="h-full">
        {children}

        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
