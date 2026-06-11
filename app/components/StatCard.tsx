import { LucideIcon } from "lucide-react";


interface StatCardProps {
  title?: string;
  value?: string;
  change?: string;
  icon?: LucideIcon;
}

const StatCard = ({ title, value, change, icon : Icon }: StatCardProps) => {
  return (
    <div className="flex flex-col flex-1   rounded-xs shadow-md bg-white">
        <div className="flex items-center justify-center w-full h-full gap-2 p-6">
          {Icon && (
            <Icon className="text-lg font-semibold text-slate-700" />
          )}
          <p className="text-lg font-medium tracking-widest text-slate-700">{value}</p>
        </div>
        <div className="mt-auto">
          <p className=" p-1 text-xs border-t tracking-wider font-extralight text-white text-center bg-[#041423]">{title}</p>   
        </div>
    </div>
  );
};

export default StatCard;
