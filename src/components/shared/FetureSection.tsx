"use client";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconUser,
    IconChartBar,
    IconShieldCheck,
    IconZeppelin
} from "@tabler/icons-react";



export function FetureSection() {
    return (
        <section>

            <p className="relative z-10 mx-auto m-4 p-2 max-w-xl text-center text-neutral-800 dark:text-neutral-500">
                Everything HR teams need to run the workday.
                Dayflow brings employee records, attendance, leave, approvals, and payroll visibility into one operating system.
            </p>
            <BentoGrid className="max-w-4xl mx-auto">
                {items.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        icon={item.icon}
                        className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                    />
                ))}
            </BentoGrid>
        </section>
    );
}
const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-linear-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">

    </div>
);
const items = [
    {
        title: "Employee Profiles",
        description: "Maintain personal details, job information, documents, profile pictures, and controlled employee edits.",
        header: <Skeleton />,
        icon: <IconUser className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Attendance Tracking",
        description: "Support daily and weekly attendance views with check-in, check-out, present, absent, half-day, and leave states.",
        header: <Skeleton />,
        icon: <IconZeppelin className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Payroll Visibility",
        description: "Give employees read-only salary details while HR officers review and update salary structures.",
        header: <Skeleton />,
        icon: <IconChartBar className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Role-Based Access",
        description: "Separate Admin, HR Officer, and Employee access so sensitive data stays visible only to the right users.",
        header: <Skeleton />,
        icon: < IconShieldCheck className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Approval Workflows",
        description: "Review leave requests, approve or reject time-off, add HR comments, and reflect decisions immediately.",
        header: <Skeleton />,
        icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Reports Ready",
        description: "Prepare attendance reports and salary slip views for future analytics and notification workflows.",
        header: <Skeleton />,
        icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Secure Authentication",
        description: "Support sign up, sign in, email verification, password rules, and protected dashboard access.",
        header: <Skeleton />,
        icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    },
];
