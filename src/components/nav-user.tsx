"use client"

import { SignOutButton } from "@clerk/nextjs"
import { IconLogout } from "@tabler/icons-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar"

export function NavUser({
  user,
  role,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
  role: string
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="rounded-lg border border-sidebar-border/60 bg-sidebar-accent/30 p-3">
          <div className="flex items-start gap-3">
            <Avatar className="h-9 w-9 rounded-lg">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{user.name}</div>
              <div className="truncate text-xs text-muted-foreground">{user.email}</div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {role === "ADMIN" ? "Admin / HR Officer" : "Employee"}
              </div>
            </div>
          </div>

          <SignOutButton>
            <button
              type="button"
              className="mt-3 flex w-full items-center gap-2 rounded-md border border-sidebar-border/60 px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
            >
              <IconLogout className="size-4" />
              Log out
            </button>
          </SignOutButton>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
