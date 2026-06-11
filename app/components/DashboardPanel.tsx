interface DashboardPanelProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const DashboardPanel = ({ title, children, className }: DashboardPanelProps) => { 
    return (
        <div className={` text-black shadow-lg drop-shadow-2xl ${className || ''}`}> 
            <div>
              <div className="border-b p-4 text-lg font-semibold text-white bg-[#041423] ">
                {title}
              </div>
              <div>
                {children}
              </div>
            </div>
          </div>
 );
}

export default DashboardPanel;