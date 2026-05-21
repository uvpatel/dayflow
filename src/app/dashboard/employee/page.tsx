import {
  CalendarCheck,
  Clock3,
  FileText,
  LogOut,
  UserRound,
  WalletCards,
} from "lucide-react";

import { attendanceWeek, employeeProfile, leaveRequests } from "@/lib/dayflow-demo-data";
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
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const quickLinks = [
  { label: "Profile", value: "86% complete", icon: UserRound },
  { label: "Attendance", value: "Check-in active", icon: Clock3 },
  { label: "Leave Requests", value: "1 pending", icon: FileText },
  { label: "Logout", value: "Secure session", icon: LogOut },
];

const statusClassName = (status: string) => {
  if (status === "APPROVED" || status === "PRESENT") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (status === "PENDING" || status === "PLANNED") return "border-amber-200 bg-amber-50 text-amber-700";
  if (status === "HALF_DAY") return "border-sky-200 bg-sky-50 text-sky-700";
  return "border-rose-200 bg-rose-50 text-rose-700";
};

export default function EmployeePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-950 md:px-8">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-teal-700">Dayflow Employee Workspace</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              Every workday, perfectly aligned.
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              View your profile, mark attendance, apply for leave, and review payroll from one secure dashboard.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Clock3 />
              Check Out
            </Button>
            <Button>
              <CalendarCheck />
              Check In
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {quickLinks.map((item) => (
            <Card key={item.label} className="rounded-lg border-slate-200 shadow-none">
              <CardContent className="flex items-center gap-3 px-4">
                <div className="flex size-10 items-center justify-center rounded-md bg-teal-50 text-teal-700">
                  <item.icon className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="rounded-lg border-slate-200 shadow-none">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Personal, job, salary, document, and contact details.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {[
                ["Employee ID", employeeProfile.id],
                ["Name", employeeProfile.name],
                ["Email", employeeProfile.email],
                ["Designation", employeeProfile.designation],
                ["Department", employeeProfile.department],
                ["Manager", employeeProfile.manager],
                ["Joining Date", employeeProfile.joiningDate],
                ["Salary Band", employeeProfile.salaryBand],
              ].map(([label, value]) => (
                <div key={label} className="rounded-md border border-slate-200 p-3">
                  <p className="text-xs font-medium uppercase text-slate-500">{label}</p>
                  <p className="mt-1 text-sm font-semibold">{value}</p>
                </div>
              ))}
              <div className="rounded-md border border-slate-200 p-3 md:col-span-2">
                <p className="text-xs font-medium uppercase text-slate-500">Editable Fields</p>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue={employeeProfile.phone} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue={employeeProfile.address} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg border-slate-200 shadow-none">
            <CardHeader>
              <CardTitle>Payroll</CardTitle>
              <CardDescription>Read-only salary visibility for {employeeProfile.salary.month}.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                ["Basic Salary", employeeProfile.salary.basic],
                ["Allowances", employeeProfile.salary.allowances],
                ["Deductions", employeeProfile.salary.deductions],
                ["Net Salary", employeeProfile.salary.net],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-md border border-slate-200 p-3">
                  <span className="text-sm text-slate-600">{label}</span>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
              <Button className="w-full" variant="outline">
                <WalletCards />
                View Salary Slip
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-lg border-slate-200 shadow-none">
            <CardHeader>
              <CardTitle>Attendance</CardTitle>
              <CardDescription>Daily and weekly status with check-in/check-out times.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceWeek.map((row) => (
                    <TableRow key={row.date}>
                      <TableCell>
                        <div className="font-medium">{row.day}</div>
                        <div className="text-xs text-slate-500">{row.date}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusClassName(row.status)}>
                          {row.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>{row.checkIn}</TableCell>
                      <TableCell>{row.checkOut}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="rounded-lg border-slate-200 shadow-none">
            <CardHeader>
              <CardTitle>Leave & Time-Off</CardTitle>
              <CardDescription>Apply for paid, sick, or unpaid leave and track decisions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 rounded-md border border-slate-200 p-3">
                <div className="grid gap-2 md:grid-cols-2">
                  <Input placeholder="Leave type: Paid / Sick / Unpaid" />
                  <Input placeholder="Date range" />
                </div>
                <Input placeholder="Remarks" />
                <Button>Submit Leave Request</Button>
              </div>
              <div className="space-y-2">
                {leaveRequests
                  .filter((request) => request.employee === employeeProfile.name)
                  .map((request) => (
                    <div key={request.range} className="flex items-center justify-between rounded-md border border-slate-200 p-3">
                      <div>
                        <p className="text-sm font-medium">{request.type} Leave</p>
                        <p className="text-xs text-slate-500">{request.range} - {request.remark}</p>
                      </div>
                      <Badge variant="outline" className={statusClassName(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
