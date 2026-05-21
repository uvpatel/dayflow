import {
  Banknote,
  CalendarDays,
  CheckCircle2,
  CircleX,
  Search,
  UserCog,
  UsersRound,
} from "lucide-react";

import { adminMetrics, employees, leaveRequests } from "@/lib/dayflow-demo-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statusClassName = (status: string) => {
  if (status === "Present" || status === "APPROVED") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (status === "PENDING" || status === "Half-day") return "border-amber-200 bg-amber-50 text-amber-700";
  if (status === "Leave") return "border-sky-200 bg-sky-50 text-sky-700";
  return "border-rose-200 bg-rose-50 text-rose-700";
};

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-6 text-zinc-50 md:px-8">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="flex flex-col justify-between gap-4 border-b border-zinc-800 pb-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-cyan-300">Dayflow Admin / HR Officer</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              Workforce command center
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              Manage employees, monitor attendance, approve time-off, and review payroll accuracy from one role-based workspace.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-zinc-700 bg-zinc-900 text-zinc-50 hover:bg-zinc-800">
              <CalendarDays />
              Export Attendance
            </Button>
            <Button className="bg-cyan-300 text-zinc-950 hover:bg-cyan-200">
              <UserCog />
              Add Employee
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {adminMetrics.map((metric) => (
            <Card key={metric.label} className="rounded-lg border-zinc-800 bg-zinc-900 shadow-none">
              <CardHeader className="pb-2">
                <CardDescription className="text-zinc-400">{metric.label}</CardDescription>
                <CardTitle className="text-3xl text-zinc-50">{metric.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-zinc-500">{metric.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <Card className="rounded-lg border-zinc-800 bg-zinc-900 shadow-none">
            <CardHeader className="gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-zinc-50">Employees</CardTitle>
                <CardDescription className="text-zinc-400">
                  Switch between employees and review attendance, leave balance, and salary data.
                </CardDescription>
              </div>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-2.5 size-4 text-zinc-500" />
                <Input className="border-zinc-700 bg-zinc-950 pl-9 text-zinc-50" placeholder="Search employee" />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableHead className="text-zinc-400">Employee</TableHead>
                    <TableHead className="text-zinc-400">Department</TableHead>
                    <TableHead className="text-zinc-400">Attendance</TableHead>
                    <TableHead className="text-zinc-400">Leave Balance</TableHead>
                    <TableHead className="text-zinc-400">Payroll</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id} className="border-zinc-800 hover:bg-zinc-800/60">
                      <TableCell>
                        <div className="font-medium text-zinc-50">{employee.name}</div>
                        <div className="text-xs text-zinc-500">{employee.id} - {employee.role}</div>
                      </TableCell>
                      <TableCell className="text-zinc-300">{employee.department}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusClassName(employee.attendance)}>
                          {employee.attendance}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-zinc-300">{employee.leaveBalance}</TableCell>
                      <TableCell className="font-medium text-zinc-50">{employee.payroll}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card className="rounded-lg border-zinc-800 bg-zinc-900 shadow-none">
              <CardHeader>
                <CardTitle className="text-zinc-50">Approval Queue</CardTitle>
                <CardDescription className="text-zinc-400">Review leave requests with comments.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {leaveRequests.map((request) => (
                  <div key={`${request.employee}-${request.range}`} className="rounded-md border border-zinc-800 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-zinc-50">{request.employee}</p>
                        <p className="text-xs text-zinc-500">
                          {request.type} - {request.range} - {request.days}
                        </p>
                      </div>
                      <Badge variant="outline" className={statusClassName(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                    <p className="mt-2 text-xs text-zinc-400">{request.remark}</p>
                    {request.status === "PENDING" ? (
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" className="bg-emerald-400 text-zinc-950 hover:bg-emerald-300">
                          <CheckCircle2 />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="border-zinc-700 bg-zinc-950 text-zinc-50 hover:bg-zinc-800">
                          <CircleX />
                          Reject
                        </Button>
                      </div>
                    ) : null}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-lg border-zinc-800 bg-zinc-900 shadow-none">
              <CardHeader>
                <CardTitle className="text-zinc-50">Payroll Control</CardTitle>
                <CardDescription className="text-zinc-400">May 2026 salary cycle overview.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="flex items-center justify-between rounded-md border border-zinc-800 p-3">
                  <div className="flex items-center gap-3">
                    <Banknote className="size-5 text-cyan-300" />
                    <span className="text-sm text-zinc-300">Gross payroll</span>
                  </div>
                  <span className="font-semibold text-zinc-50">INR 1.08 Cr</span>
                </div>
                <div className="flex items-center justify-between rounded-md border border-zinc-800 p-3">
                  <div className="flex items-center gap-3">
                    <UsersRound className="size-5 text-cyan-300" />
                    <span className="text-sm text-zinc-300">Pending salary updates</span>
                  </div>
                  <span className="font-semibold text-zinc-50">5</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
