"use client"

import * as React from "react"
import Link from "next/link"
import { IconInnerShadowTop } from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { getSidebarData, type UserRole } from "@/config/sidebar-data"

export type DashboardUser = {
  name: string
  email: string
  avatar: string
}

export function AppSidebar({
  role,
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  role: UserRole
  user: DashboardUser
}) {
  const data = getSidebarData(role)

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/dashboard">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">Dayflow HRMS</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="px-2 pt-2 group-data-[collapsible=icon]:hidden">
          <HoverBorderGradient
            as={Link}
            href="/dashboard/leaves"
            containerClassName="w-full"
            className="w-full rounded-2xl bg-transparent px-0 py-0"
          >
            <div className="rounded-[inherit] bg-sidebar px-4 py-2 text-left text-sm">
              <p className="font-medium text-sidebar-foreground">Leave Center</p>
              <p className="text-xs text-sidebar-foreground/70">Apply, approve, and track time off</p>
            </div>
          </HoverBorderGradient>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user ?? data.user} role={role} />
      </SidebarFooter>
    </Sidebar>
  )
}
