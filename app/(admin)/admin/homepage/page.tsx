import type { Metadata } from "next";
import Link from "next/link";

import StatCard from "@/app/components/StatCard";
import {
  Users,
  Eye,
  Clock,
  LayoutGrid,
  Hexagon,
  Mail,
  FileText,
  ArrowRight,
} from "lucide-react";
import DashboardPanel from "@/app/components/DashboardPanel";
import MessageRow from "@/app/components/MessageRow";
import RecentActivity from "@/app/components/RecentActivity";

export const metadata: Metadata = {
  title: "Admin Home",
  description: "Admin dashboard home page.",
};

const stats = [
  { title: "Visits Today", value: "45.2k", icon: Users },
  { title: "New Messages", value: "128.3k", icon: Eye },
  { title: "Avg. Time on Site", value: "5m 32s", icon: Clock },
];

const quickLinks = [
  {
    label: "Projects",
    description: "Manage your portfolio projects",
    href: "/admin/projects",
    icon: LayoutGrid,
  },
  {
    label: "Experience",
    description: "Update your work experience & skills",
    href: "/admin/experience",
    icon: FileText,
  },
  {
    label: "Blog Posts",
    description: "Write and manage blog articles",
    href: "/admin/blog",
    icon: Hexagon,
  },
  {
    label: "Messages",
    description: "View incoming messages & inquiries",
    href: "/admin/messages",
    icon: Mail,
  },
];

const recentMessages = [
  {
    id: 1,
    sender: "Sarah Johnson",
    subject: "Website Redesign Project",
    time: "2h ago",
  },
  {
    id: 2,
    sender: "Michael Chen",
    subject: "Re: Portfolio Review",
    time: "5h ago",
  },
  {
    id: 3,
    sender: "Emily Rodriguez",
    subject: "Freelance Opportunity",
    time: "1d ago",
  },
];

const recentActivities = [
  {
    id: 1,
    module: "Pages",
    changes: "Updated Home page content",
    time: "30m ago",
  },
  {
    id: 2,
    module: "Works",
    changes: "Added new project 'E-commerce Site'",
    time: "1h ago",
  },
  {
    id: 3,
    module: "About",
    changes: "Changed team member bios",
    time: "3h ago",
  },
];

export default function AdminHomePage() {
  return (
    <div className="px-8 py-8 space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Portfolio Overview</h1>
        <p className="text-slate-500 mt-1">
          Manage your portfolio site content, track activity, and review messages.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map(({ label, description, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="group flex flex-col gap-3 p-6 rounded-xl bg-white shadow-sm border border-slate-200 hover:shadow-md hover:border-[#041423] transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-[#041423]/10 transition-colors">
                <Icon className="h-5 w-5 text-slate-600 group-hover:text-[#041423] transition-colors" />
              </div>
              <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-[#041423] group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">{label}</h3>
              <p className="text-sm text-slate-500 mt-0.5">{description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <DashboardPanel title="Recent Messages">
            {recentMessages.map((msg) => (
              <MessageRow
                key={msg.id}
                sender={msg.sender}
                subject={msg.subject}
                time={msg.time}
              />
            ))}
          </DashboardPanel>

          <DashboardPanel title="Recent Activities">
            {recentActivities.map((activity) => (
              <RecentActivity
                key={activity.id}
                module={activity.module}
                changes={activity.changes}
                time={activity.time}
              />
            ))}
          </DashboardPanel>
        </div>

        <div className="flex flex-col gap-6">
          {stats.map(({ title, value, icon: Icon }) => (
            <StatCard key={title} title={title} value={value} icon={Icon} />
          ))}
        </div>
      </div>
    </div>
  );
}
