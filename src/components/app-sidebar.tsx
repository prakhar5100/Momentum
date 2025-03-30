import * as React from "react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import UserProfile from "./UserProfile"
import Logout from "./Logout"
import { Link } from "react-router-dom"

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain : [
    {
      title : 'Dashboard',
      url : '/dashboard'
    },
    {
      title : "Today's Tasks",
      url : '/tasks/today'
    }, 
    {
      title : "All Tasks",
      url : '/tasks/all'
    },
    {
      title : "Pomodoro",
      url : '/pomodoro'
    },
    {
      title : "Create Task",
      url : '/tasks/create'
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <UserProfile />
      </SidebarHeader>
      <SidebarContent className="mt-6">
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
              <SidebarMenu>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                      {item.title}
                      </Link>
                    </SidebarMenuButton>
              </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />

      <Logout />
    </Sidebar>
  )
}
