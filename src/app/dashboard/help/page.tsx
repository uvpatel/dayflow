import { Mail, MessageCircle, ShieldQuestion } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverEffect } from "@/components/ui/card-hover-effect"
import { Boxes } from "@/components/ui/background-boxes"

const helpItems = [
  { title: "Authentication", description: "Use Clerk sign-in and sign-up for access control.", link: "#auth" },
  { title: "Leaves", description: "Employees submit leave requests and HR approves them.", link: "/dashboard/leaves" },
  { title: "Payroll", description: "Salary details are read-only for employees.", link: "/dashboard/payroll" },
]

export default function HelpPage() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 px-6 py-8 text-white md:px-8">
        <Boxes className="opacity-30" />
        <div className="relative z-10 flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Help</p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Support resources for the HR dashboard.</h1>
          <p className="max-w-2xl text-sm text-slate-300 md:text-base">
            Use this page as the starting point for user guidance, onboarding, and future help articles.
          </p>
        </div>
      </section>

      <HoverEffect items={helpItems} className="grid gap-4 py-0 md:grid-cols-3" />

      <div id="auth" className="grid gap-6 lg:grid-cols-3">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <MessageCircle className="size-5 text-cyan-600" />
            <CardTitle>Need guidance?</CardTitle>
            <CardDescription>Reach the team for access or workflow questions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Mail className="size-4" />
              Contact support
            </Button>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <ShieldQuestion className="size-5 text-cyan-600" />
            <CardTitle>Security first</CardTitle>
            <CardDescription>Clerk handles the sign-in, sign-up, and session state.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">Role-based dashboards can be extended with verification and notifications later.</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Roadmap</CardTitle>
            <CardDescription>Future reports, alerts, and analytics can live here.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">This is a natural place for knowledge base articles and onboarding steps.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
