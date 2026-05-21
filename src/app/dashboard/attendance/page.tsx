import { auth } from "@clerk/nextjs/server"
import { CalendarCheck, CalendarClock, UsersRound } from "lucide-react"

import { attendanceWeek, employees } from "@/lib/dayflow-demo-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { Boxes } from "@/components/ui/background-boxes"

const tone = (status: string) => {
  if (status === "PRESENT" || status === "Present") return "border-emerald-200 bg-emerald-50 text-emerald-700"
  if (status === "HALF_DAY" || status === "Half-day") return "border-amber-200 bg-amber-50 text-amber-700"
  if (status === "LEAVE" || status === "Leave") return "border-sky-200 bg-sky-50 text-sky-700"
  return "border-zinc-200 bg-zinc-50 text-zinc-700"
}

async function getRole() {
  const { sessionClaims } = await auth()
  const claims = sessionClaims as Record<string, unknown> | null | undefined
  return typeof claims?.role === "string" ? claims.role : "EMPLOYEE"
}

export default async function AttendancePage() {
  const role = await getRole()
  const isAdmin = role === "ADMIN"

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 px-6 py-8 text-white md:px-8">
        <Boxes className="opacity-30" />
        <div className="relative z-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Attendance</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              {isAdmin ? "Team attendance overview" : "Your attendance tracker"}
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-300 md:text-base">
              Shadcn cards and Aceternity-style background motion give you a clear view of daily and weekly attendance status.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-cyan-300 text-slate-950 hover:bg-cyan-200">
              <CalendarCheck className="size-4" />
              Check in
            </Button>
            <Button variant="outline" className="border-slate-700 bg-white/5 text-white hover:bg-white/10">
              <CalendarClock className="size-4" />
              Check out
            </Button>
          </div>
        </div>
      </section>

      <BentoGrid className="gap-4 md:grid-cols-3 md:auto-rows-[12rem]">
        <BentoGridItem title="Present today" description="92% of the team has checked in" icon={<UsersRound className="size-5 text-cyan-600" />} />
        <BentoGridItem title="Half-day" description="3 team members are marked half-day" icon={<CalendarClock className="size-5 text-amber-600" />} />
        <BentoGridItem title="On leave" description="2 approved leave records active today" icon={<CalendarCheck className="size-5 text-emerald-600" />} />
      </BentoGrid>

      <Tabs defaultValue={isAdmin ? "team" : "mine"} className="space-y-6">
        <TabsList className="grid w-full max-w-xl grid-cols-2">
          <TabsTrigger value="mine">My week</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="mine" className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>My weekly attendance</CardTitle>
              <CardDescription>Daily check-in and check-out times for the current week.</CardDescription>
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
                        <Badge variant="outline" className={tone(row.status)}>
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
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>Team attendance table</CardTitle>
              <CardDescription>{isAdmin ? "Admin and HR can review all employee attendance records." : "Quick team visibility for managers."}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Leave balance</TableHead>
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
                      <TableCell>
                        <Badge variant="outline" className={tone(employee.attendance)}>
                          {employee.attendance}
                        </Badge>
                      </TableCell>
                      <TableCell>{employee.leaveBalance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
