import { CalendarDays, CheckCircle2, Clock3, Send } from "lucide-react"

import { leaveRequests, employeeProfile } from "@/lib/dayflow-demo-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Boxes } from "@/components/ui/background-boxes"
import { HoverEffect } from "@/components/ui/card-hover-effect"

const leaveMetrics = [
  { label: "Paid Leave", value: "10 days", detail: "Balance for the current cycle" },
  { label: "Pending", value: "1 request", detail: "Awaiting HR review" },
  { label: "Approved", value: "2 requests", detail: "Already reflected in attendance" },
]

const policies = [
  { title: "Choose a leave type", description: "Paid, sick, or unpaid leave can be submitted from the request form.", link: "#request" },
  { title: "Track every request", description: "Review the current status, remarks, and approval outcome in one place.", link: "#history" },
  { title: "Instant HR review", description: "Approved leave should update attendance and payroll records immediately.", link: "#summary" },
]

const requestRows = leaveRequests.filter((request) => request.employee === employeeProfile.name)

const tone = (status: string) => {
  if (status === "APPROVED") return "border-emerald-200 bg-emerald-50 text-emerald-700"
  if (status === "PENDING") return "border-amber-200 bg-amber-50 text-amber-700"
  return "border-rose-200 bg-rose-50 text-rose-700"
}

export default function LeavesPage() {
  return (
    <div className="space-y-8">
      <section id="summary" className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 px-6 py-8 text-white shadow-sm md:px-8">
        <Boxes className="opacity-35" />
        <div className="relative z-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Leave workflow</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              Apply, approve, and audit time off without leaving the dashboard.
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-300 md:text-base">
              This page combines shadcn form controls with Aceternity-style motion so employees and HR can manage leave requests in one focused workspace.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button className="rounded-full bg-cyan-300 px-4 py-2 text-sm text-slate-950 hover:bg-cyan-200">
                Request leave
              </Button>
              <Button variant="outline" className="border-slate-700 bg-white/5 text-white hover:bg-white/10">
                <CheckCircle2 className="size-4" />
                Review approvals
              </Button>
            </div>
          </div>
          <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            {leaveMetrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{metric.label}</p>
                <p className="mt-1 text-2xl font-semibold text-white">{metric.value}</p>
                <p className="mt-1 text-sm text-slate-300">{metric.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Tabs defaultValue="request" className="space-y-6">
        <TabsList className="grid w-full max-w-xl grid-cols-3">
          <TabsTrigger value="request">Request</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="policy">Policy</TabsTrigger>
        </TabsList>

        <TabsContent value="request" className="space-y-6">
          <div id="request" className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle>Submit leave request</CardTitle>
                <CardDescription>Employees can choose a type, date range, and remarks before submitting.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Leave type</label>
                    <Select defaultValue="paid">
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="sick">Sick</SelectItem>
                        <SelectItem value="unpaid">Unpaid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Date range</label>
                    <Input placeholder="25 May - 27 May 2026" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Remarks</label>
                  <textarea className="min-h-32 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="Explain the request in a few lines." />
                </div>
                <Button className="w-full md:w-auto">
                  <Send className="size-4" />
                  Submit request
                </Button>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle>Leave balance</CardTitle>
                <CardDescription>Current balance and the latest approval state.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                  <span className="text-sm text-slate-600">Remaining paid leave</span>
                  <span className="font-semibold text-slate-950">10 days</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                  <span className="text-sm text-slate-600">Current request</span>
                  <Badge variant="outline" className={tone("PENDING")}>Pending</Badge>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                  <span className="text-sm text-slate-600">Next check-in</span>
                  <span className="font-semibold text-slate-950">After approval</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card id="history" className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>My leave requests</CardTitle>
              <CardDescription>Track submitted requests and their current state.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Range</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Remark</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requestRows.map((request) => (
                    <TableRow key={`${request.employee}-${request.range}`}>
                      <TableCell className="font-medium">{request.type}</TableCell>
                      <TableCell>{request.range}</TableCell>
                      <TableCell>{request.days}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={tone(request.status)}>
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-600">{request.remark}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policy" className="space-y-6">
          <HoverEffect items={policies} className="grid gap-4 py-0 md:grid-cols-3" />
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>Reminder</CardTitle>
              <CardDescription>Any approved leave should reflect in attendance and payroll immediately.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-3">
              {[
                ["Paid leave", "Uses balance from the current cycle"],
                ["Sick leave", "Best used for medical appointments"],
                ["Unpaid leave", "Requires HR review before approval"],
              ].map(([title, description]) => (
                <div key={title} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Clock3 className="size-4 text-cyan-600" />
                    {title}
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
