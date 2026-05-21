import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function Page() {
  const { sessionClaims } = await auth()
  const claims = sessionClaims as Record<string, unknown> | null | undefined
  const role = typeof claims?.role === "string" ? claims.role : "EMPLOYEE"

  redirect(role === "ADMIN" ? "/dashboard/admin" : "/dashboard/employee")
}
