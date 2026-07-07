import { LucideIcon } from "lucide-react";

export type SideBarItemProps = { 
  label: string;
  href: string;
  icon: LucideIcon;
  onLogout?: () => void;
};

const SideBarItem = ({ label, href, icon : Icon , onLogout}: SideBarItemProps) => {
  const handleClick =  (e: React.MouseEvent<HTMLAnchorElement>) => {
      if ( label === "Logout" && onLogout){
        e.preventDefault();
        onLogout();
      }
  }

  
  return (
    
    <a key={label} href={href} onClick={handleClick}
     className="flex items-center gap-2.5 pl-3 pr-4 py-1.5 rounded-r-md text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-700/40 border-l-2 border-transparent hover:border-slate-400 transition-all duration-150"> 
        <Icon size={16} className="mr-2" />
        {label}
    </a>
  );
};


export default SideBarItem;