import { auth, currentUser } from "@clerk/nextjs/server"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import type { UserRole } from "@/config/sidebar-data"

async function resolveRole(): Promise<UserRole> {
  const { sessionClaims } = await auth()
  const claims = sessionClaims as Record<string, unknown> | null | undefined
  const claimRole = typeof claims?.role === "string" ? claims.role : undefined

  if (claimRole === "ADMIN" || claimRole === "EMPLOYEE") {
    return claimRole
  }

  return "EMPLOYEE"
}

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const role = await resolveRole()
  const user = await currentUser()

  const dashboardUser = {
    name: user?.fullName ?? user?.firstName ?? "Dayflow User",
    email:
      user?.primaryEmailAddress?.emailAddress ?? "signed-in user@dayflow.local",
    avatar: user?.imageUrl ?? "/avatars/user.jpg",
  }

  return (
    <SidebarProvider>
      <AppSidebar role={role} user={dashboardUser} />
      <SidebarInset className="bg-slate-50">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200/70 bg-white/90 px-4 backdrop-blur supports-backdrop-filter:bg-white/70 md:px-6">
          <SidebarTrigger className="-ml-1" />
          <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
                Clerk secured workspace
              </p>
              <h1 className="truncate text-sm font-semibold text-slate-950 md:text-base">
                {role === "ADMIN" ? "Admin / HR dashboard" : "Employee dashboard"}
              </h1>
            </div>
            <div className="hidden text-right sm:block">
              <p className="truncate text-sm font-medium text-slate-950">
                {dashboardUser.name}
              </p>
              <p className="truncate text-xs text-slate-500">
                {dashboardUser.email}
              </p>
            </div>
          </div>
        </header>

        <div className="min-h-[calc(100svh-4rem)] px-4 py-6 md:px-6 lg:px-8">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
