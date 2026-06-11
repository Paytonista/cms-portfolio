import type { Metadata } from "next";

import StatCard from "@/app/components/StatCard";
import { Users, Eye, Clock, TrendingUp, User } from "lucide-react";
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

const recentMessages = [
  { id: 1, sender: "Sarah Johnson", subject: "Website Redesign Project", time: "2h ago" },
  { id: 2, sender: "Michael Chen", subject: "Re: Portfolio Review", time: "5h ago" },
  { id: 3, sender: "Emily Rodriguez", subject: "Freelance Opportunity", time: "1d ago" }
];

const recentActivities = [
  { id: 1, module: "Pages", changes: "Updated Home page content", time: "30m ago" },
  { id: 2, module: "Works", changes: "Added new project 'E-commerce Site'", time: "1h ago" },
  { id: 3, module: "About", changes: "Changed team member bios", time: "3h ago" }
];


export default function AdminHomePage() {
  return (
    <div className="">

      
      <div className="flex gap-6 px-10 py-6">
        {stats.map(({ title, value, icon: Icon }) => (
          <StatCard key={title} title={title} value={value} icon={Icon} />
        ))}
        
      </div>
      <div className="grid grid-cols-[65%_32%] gap-10 px-10   border-black">
        <div className=" flex flex-col gap-3 text-black"> 
          <DashboardPanel title="Recent Messages">
            {recentMessages.map((msg) => (
              <MessageRow key={msg.id} sender={msg.sender} subject={msg.subject} time={msg.time} />
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
        <DashboardPanel title="Quick Actions" className="">
          empty
        
        </DashboardPanel>
      </div>
      

    
      
    </div>
    
  );
}
