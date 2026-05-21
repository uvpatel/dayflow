export const employeeProfile = {
  id: "EMP-1042",
  name: "Urvil Patel",
  email: "urvil@example.com",
  role: "Employee",
  designation: "Frontend Engineer",
  department: "Product Engineering",
  phone: "+91 98765 43210",
  address: "Ahmedabad, Gujarat",
  joiningDate: "16 Jan 2026",
  manager: "Ananya Shah",
  salaryBand: "L2",
  profileCompletion: 86,
  documents: ["Aadhaar", "PAN", "Offer Letter"],
  salary: {
    month: "May 2026",
    basic: "INR 72,000",
    allowances: "INR 18,500",
    deductions: "INR 4,200",
    net: "INR 86,300",
  },
};

export const attendanceWeek = [
  { day: "Mon", date: "18 May", status: "PRESENT", checkIn: "09:21", checkOut: "18:14" },
  { day: "Tue", date: "19 May", status: "PRESENT", checkIn: "09:12", checkOut: "18:03" },
  { day: "Wed", date: "20 May", status: "HALF_DAY", checkIn: "09:30", checkOut: "13:42" },
  { day: "Thu", date: "21 May", status: "PRESENT", checkIn: "09:08", checkOut: "Active" },
  { day: "Fri", date: "22 May", status: "PLANNED", checkIn: "-", checkOut: "-" },
];

export const leaveRequests = [
  {
    employee: "Urvil Patel",
    type: "Sick",
    range: "20 May 2026",
    days: "1 day",
    status: "APPROVED",
    remark: "Medical appointment",
  },
  {
    employee: "Mira Desai",
    type: "Paid",
    range: "25 May - 27 May 2026",
    days: "3 days",
    status: "PENDING",
    remark: "Family function",
  },
  {
    employee: "Rohan Mehta",
    type: "Unpaid",
    range: "29 May 2026",
    days: "1 day",
    status: "REJECTED",
    remark: "Release week coverage required",
  },
];

export const employees = [
  {
    id: "EMP-1042",
    name: "Urvil Patel",
    department: "Product Engineering",
    role: "Frontend Engineer",
    attendance: "Present",
    leaveBalance: "10 days",
    payroll: "INR 86,300",
  },
  {
    id: "EMP-1088",
    name: "Mira Desai",
    department: "People Ops",
    role: "HR Executive",
    attendance: "Present",
    leaveBalance: "7 days",
    payroll: "INR 68,900",
  },
  {
    id: "EMP-1101",
    name: "Rohan Mehta",
    department: "Platform",
    role: "Backend Engineer",
    attendance: "Half-day",
    leaveBalance: "4 days",
    payroll: "INR 92,500",
  },
  {
    id: "EMP-1124",
    name: "Isha Nair",
    department: "Design",
    role: "Product Designer",
    attendance: "Leave",
    leaveBalance: "12 days",
    payroll: "INR 78,400",
  },
];

export const adminMetrics = [
  { label: "Employees", value: "128", detail: "12 departments" },
  { label: "Present Today", value: "116", detail: "91% attendance" },
  { label: "Pending Leaves", value: "8", detail: "4 require HR comments" },
  { label: "Payroll Ready", value: "96%", detail: "May cycle" },
];
