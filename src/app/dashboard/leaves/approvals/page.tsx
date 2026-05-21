import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { CheckCircle2, CircleX, MessageSquareMore } from "lucide-react"

import { leaveRequests } from "@/lib/dayflow-demo-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverEffect } from "@/components/ui/card-hover-effect"
import { Boxes } from "@/components/ui/background-boxes"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const approvalPrinciples = [
  { title: "Review the context", description: "Check leave type, dates, and remark before approving.", link: "#queue" },
  { title: "Leave a comment", description: "Use HR comments to explain approvals or rejections.", link: "#comments" },
  { title: "Update records instantly", description: "Attendance and payroll should reflect the latest decision right away.", link: "#summary" },
]

const tone = (status: string) => {
  if (status === "APPROVED") return "border-emerald-200 bg-emerald-50 text-emerald-700"
  if (status === "PENDING") return "border-amber-200 bg-amber-50 text-amber-700"
  return "border-rose-200 bg-rose-50 text-rose-700"
}

async function getRole() {
  const { sessionClaims } = await auth()
  const claims = sessionClaims as Record<string, unknown> | null | undefined
  return typeof claims?.role === "string" ? claims.role : "EMPLOYEE"
}

export default async function LeaveApprovalsPage() {
  const role = await getRole()

  if (role !== "ADMIN") {
    redirect("/dashboard")
  }

  return (
    <div className="space-y-8">
      <section id="summary" className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 px-6 py-8 text-white shadow-sm md:px-8">
        <Boxes className="opacity-25" />
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">HR approvals</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              Approve or reject leave requests from a single review queue.
            </h1>
            <p className="mt-4 text-sm text-zinc-300 md:text-base">
              This page uses shadcn cards and tables with an Aceternity-style background to keep the approval workflow fast and readable.
            </p>
          </div>
          <Badge variant="outline" className="w-fit border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-cyan-200">
            8 pending reviews
          </Badge>
        </div>
      </section>

      <div id="queue" className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="border-zinc-200 shadow-sm">
          <CardHeader>
            <CardTitle>Leave request queue</CardTitle>
            <CardDescription>Review every leave request with the employee context and current status.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Range</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveRequests.map((request) => (
                  <TableRow key={`${request.employee}-${request.range}`}>
                    <TableCell>
                      <div className="font-medium">{request.employee}</div>
                      <div className="text-xs text-zinc-500">{request.remark}</div>
                    </TableCell>
                    <TableCell>{request.type}</TableCell>
                    <TableCell>{request.range}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={tone(request.status)}>
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {request.status === "PENDING" ? (
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" className="bg-emerald-500 text-white hover:bg-emerald-600">
                            <CheckCircle2 className="size-4" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="border-zinc-300">
                            <CircleX className="size-4" />
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-sm text-zinc-500">Processed</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card id="comments" className="border-zinc-200 shadow-sm">
            <CardHeader>
              <CardTitle>HR comment box</CardTitle>
              <CardDescription>Add a note before approving or rejecting a request.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Selected request</label>
                <input className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none" placeholder="Mira Desai - Paid leave" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Comment</label>
                <textarea className="min-h-32 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none" placeholder="Add approval notes or rejection details." />
              </div>
              <Button className="w-full">
                <MessageSquareMore className="size-4" />
                Save comment
              </Button>
            </CardContent>
          </Card>

          <Card className="border-zinc-200 shadow-sm">
            <CardHeader>
              <CardTitle>Approval principles</CardTitle>
              <CardDescription>A quick guide for consistent HR decisions.</CardDescription>
            </CardHeader>
            <CardContent>
              <HoverEffect items={approvalPrinciples} className="grid gap-4 py-0 md:grid-cols-1" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
