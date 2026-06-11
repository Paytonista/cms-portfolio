import { Activity } from "lucide-react";

interface RecentActivityProps {
    module: string;
    changes: string;
    time: string;
}

const RecentActivity = ({ module, changes, time }: RecentActivityProps) => {
    return (
        <div className="flex border border-slate-400 hover:bg-gray-100">
            <div className="w-48 px-5 py-3 border-r border-slate-400 flex items-center gap-2 text-sm text-slate-700 font-mono whitespace-nowrap">
                <Activity className="h-5 w-5" />
                {module}
            </div>
            <div className="flex-1 px-5 py-3 border-r border-slate-400 text-slate-500">
                {changes}
            </div>
            <div className="w-24 px-5 py-3 text-sm text-slate-500 text-right">
                {time}
            </div>
        </div>
    );
}

export default RecentActivity;