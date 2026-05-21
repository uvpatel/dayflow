import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Boxes } from "@/components/ui/background-boxes"

const settingsRows = [
  { label: "Email alerts", description: "Send notifications when leave or payroll changes happen." },
  { label: "Attendance reminders", description: "Remind employees to check in and check out on time." },
  { label: "Security updates", description: "Keep session security and verification settings active." },
]

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 px-6 py-8 text-white md:px-8">
        <Boxes className="opacity-30" />
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Settings</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Workspace preferences and controls.</h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-300 md:text-base">
            Keep the dashboard aligned with shadcn controls and a polished Aceternity-style background.
          </p>
        </div>
      </section>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Notifications and security</CardTitle>
          <CardDescription>Common settings for the HR workspace.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {settingsRows.map((row) => (
            <div key={row.label}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-slate-950">{row.label}</p>
                  <p className="text-sm text-slate-600">{row.description}</p>
                </div>
                <Checkbox defaultChecked />
              </div>
              <Separator className="mt-4" />
            </div>
          ))}
          <div className="flex flex-wrap gap-2 pt-2">
            <Button>Save settings</Button>
            <Badge variant="outline" className="border-cyan-200 bg-cyan-50 text-cyan-700">Clerk secured</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
