
import SideBarSection from "./SideBarSection";
import type { SideBarSectionProps } from "./SideBarSection";

type SideBarProps = {
  nav: SideBarSectionProps[];
  collapsed?: boolean;
};


/* 

EXAMPLE DATA 

const nav = [
  {section: "OVERVIEW", items: [
    {label: "Dashboard", href: "/dashboard", icon: LayoutDashboard},
    {label: "Analytics", href: "/analytics", icon: BarChart2},
  ]},
  {section: "CONTENT", items: [
    {label: "Projects", href: "/projects", icon: LayoutGrid},
    {label: "Experience", href: "/experience", icon: Mail},
    {label: "Blog Posts", href: "/blog", icon: Hexagon},
  ]},
  {section: "INBOX", items: [
    {label: "Messages", href: "/messages", icon: Mail},
  ]},
  {section: "SETTINGS", items: [
    {label: "Account", href: "/account", icon: Settings},
    {label: "Logout", href: "/logout", icon: LogOut},
  ]},
]

*/

const SideBar = ({ nav }: SideBarProps) => {




  return (
    <div> 
    <aside className="w-56 h-screen  flex flex-col border-r">
      <div className="p-4 border-b flex items-center justify-content gap-2 text-md font-medium tracking-wide ">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white shadow-sm">
            KR
          </div>
          <div>
            <p className="text-base font-semibold">CMS SYSTEM</p>
            <p className="text-xs text-slate-500">Admin panel</p>
          </div>

          </div>
            <nav className  ="flex-1 p-4 overflow-y-auto">
              {nav.map(({section, items}) => ( 
                <SideBarSection key={section} section={section} items={items} />
               ))}
            </nav>
  
    </aside>
    </div>
  );
};


export default SideBar;