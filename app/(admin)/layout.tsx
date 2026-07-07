"use client";

import SideBar from "@/app/components/SideBar";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import {
  LayoutDashboard, BarChart2, Mail,
  Bell, LayoutGrid, Settings, LogOut, Hexagon, Trophy
} from 'lucide-react'

const handleLogout = async () => {
    await signOut({callbackUrl: "/login"});
  };

const nav = [
  {section: "OVERVIEW", items: [
    {label: "Dashboard", href: "/admin/homepage", icon: LayoutDashboard},
    {label: "Analytics", href: "/admin/analytics", icon: BarChart2},
  ]},
  {section: "CONTENT", items: [
    {label: "Projects", href: "/admin/projects", icon: LayoutGrid},
    {label: "Experience", href: "/admin/experience", icon: Mail},
    {label: "Skills", href: "/admin/skills", icon: Trophy},
    {label: "Certificates", href: "/admin/blog", icon: Hexagon},
  ]},
  {section: "INBOX", items: [
    {label: "Messages", href: "/admin/messages", icon: Mail},
  ]},
  {section: "SETTINGS", items: [
    {label: "Account", href: "/admin/account", icon: Settings},
    {label: "Logout", href: "", icon: LogOut, onLogout: handleLogout},
  ]},
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  const pathname = usePathname();
  const formattedPathname = pathname.split("/").slice(2).join("/").charAt(0).toUpperCase() + pathname.split("/").slice(2).join("/").slice(1);


  return (
    <div className="flex">
      <SideBar  nav={nav} />
      <main className="flex-1 bg-slate-100 min-h-screen font-sans">
        <div className="flex justify-between px-6 py-5 shadow bg-white">
          <div className="flex flex-col ">
      
           
            
          </div>
        
          <div className="flex items-center text-sm text-slate-500 gap-4">
            {formattedPathname}
            <Bell className="h-5 w-5" />

          </div>
       </div>
        <div className="text-black"> 
        {children}
        </div>
        

        
      </main>
    </div>
  );
}