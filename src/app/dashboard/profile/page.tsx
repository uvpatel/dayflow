import { employeeProfile } from "@/lib/dayflow-demo-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Boxes } from "@/components/ui/background-boxes"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 px-6 py-8 text-white md:px-8">
        <Boxes className="opacity-30" />
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Profile</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">View and edit your employee profile.</h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-300 md:text-base">
              Employees can update limited fields while HR can extend the profile with job, salary, and document details.
            </p>
          </div>
          <HoverBorderGradient as="button" containerClassName="w-fit" className="rounded-full bg-slate-950 px-4 py-2 text-sm">
            Save profile
          </HoverBorderGradient>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Personal and job details</CardTitle>
            <CardDescription>Profile fields shown in the employee dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {[
              ["Employee ID", employeeProfile.id],
              ["Name", employeeProfile.name],
              ["Email", employeeProfile.email],
              ["Designation", employeeProfile.designation],
              ["Department", employeeProfile.department],
              ["Manager", employeeProfile.manager],
              ["Joining date", employeeProfile.joiningDate],
              ["Salary band", employeeProfile.salaryBand],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-slate-200 p-3">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">{label}</p>
                <p className="mt-1 text-sm font-semibold text-slate-950">{value}</p>
              </div>
            ))}
            <div className="rounded-xl border border-slate-200 p-3 md:col-span-2">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Editable fields</p>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input defaultValue={employeeProfile.phone} />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Address</label>
                  <Input defaultValue={employeeProfile.address} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>Documents and permissions</CardTitle>
              <CardDescription>Profile picture, document checklist, and access metadata.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {employeeProfile.documents.map((document) => (
                  <Badge key={document} variant="outline" className="border-cyan-200 bg-cyan-50 text-cyan-700">
                    {document}
                  </Badge>
                ))}
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Role</label>
                <Select defaultValue="employee">
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="admin">Admin / HR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Profile picture</label>
                <Input type="file" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>Quick summary</CardTitle>
              <CardDescription>Useful values shown to the signed-in user.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                <span>Profile completion</span>
                <span className="font-semibold text-slate-950">{employeeProfile.profileCompletion}%</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                <span>Salary month</span>
                <span className="font-semibold text-slate-950">{employeeProfile.salary.month}</span>
              </div>
              <Button className="w-full">Update details</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
