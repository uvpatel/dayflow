import { auth } from "@clerk/nextjs/server"
import { Banknote, Download, ShieldCheck, WalletCards } from "lucide-react"

import { adminMetrics, employeeProfile, employees } from "@/lib/dayflow-demo-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { Boxes } from "@/components/ui/background-boxes"

async function getRole() {
  const { sessionClaims } = await auth()
  const claims = sessionClaims as Record<string, unknown> | null | undefined
  return typeof claims?.role === "string" ? claims.role : "EMPLOYEE"
}

export default async function PayrollPage() {
  const role = await getRole()
  const isAdmin = role === "ADMIN"

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 px-6 py-8 text-white md:px-8">
        <Boxes className="opacity-30" />
        <div className="relative z-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Payroll</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              {isAdmin ? "Payroll control center" : "Your salary details"}
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-300 md:text-base">
              Read-only employee salary slips and admin payroll controls both share the same shadcn and Aceternity-inspired visual language.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-cyan-300 text-slate-950 hover:bg-cyan-200">
              <Download className="size-4" />
              Download slip
            </Button>
            <Button variant="outline" className="border-slate-700 bg-white/5 text-white hover:bg-white/10">
              <ShieldCheck className="size-4" />
              Verify payroll
            </Button>
          </div>
        </div>
      </section>

      {isAdmin ? (
        <div className="space-y-6">
          <BentoGrid className="gap-4 md:grid-cols-4 md:auto-rows-[12rem]">
            {adminMetrics.map((metric) => (
              <BentoGridItem
                key={metric.label}
                title={metric.value}
                description={metric.detail}
                icon={<Banknote className="size-5 text-cyan-600" />}
              />
            ))}
          </BentoGrid>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>Payroll by employee</CardTitle>
              <CardDescription>Review salary visibility and ready-to-process payroll values.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Payroll</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-xs text-slate-500">{employee.id}</div>
                      </TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.role}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-cyan-200 bg-cyan-50 text-cyan-700">
                          {employee.payroll}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>May 2026 salary slip</CardTitle>
              <CardDescription>Employee payroll details are read-only.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                ["Basic salary", employeeProfile.salary.basic],
                ["Allowances", employeeProfile.salary.allowances],
                ["Deductions", employeeProfile.salary.deductions],
                ["Net salary", employeeProfile.salary.net],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                  <span className="text-sm text-slate-600">{label}</span>
                  <span className="font-semibold text-slate-950">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>Salary summary</CardTitle>
              <CardDescription>Quick view of the payroll state.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Month</p>
                <p className="mt-1 text-xl font-semibold">{employeeProfile.salary.month}</p>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Profile</p>
                <p className="mt-1 text-xl font-semibold">{employeeProfile.name}</p>
              </div>
              <Button variant="outline" className="w-full">
                <WalletCards className="size-4" />
                View salary slip
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
