

import DashboardPanel from "./DashboardPanel";
import TechCard, {TechCardProps} from "./TechCard";
import { Calendar, MapPin, EditIcon } from "lucide-react";
import {getMonthDifference} from "@/app/utils/date/getmonths"

import { start } from "repl";



interface DashboardExperiencePanelProps {
    id : string;
    role: string;
    tech_company: string;
    active?: boolean;
    start_date: Date;
    end_date: Date | null;
    location: string;
    job_description: string;
    tech_skills: TechCardProps[];

}

const DashboardExperiencePanel = ({ id, role, tech_company, active, start_date, end_date, location, job_description, tech_skills : tech_skills} : DashboardExperiencePanelProps) => {
    return (
        <>
        <div className="flex flex-col  border border-slate-400 rounded py-3">
                <div className="flex flex-row items-start px-4 py-1"> 
                    <div className = "ml-4 ">
                        <div className="text-lg tracking-widest">{role}</div>
                        <div className="text-md">{tech_company}</div>
                        <div className="text-xs flex gap-2 text-light tracking-tight py-1">
                            <div className="flex">
                                <Calendar className="w-4 h-4 mr-0.5"/>{start_date.toLocaleDateString()} - {end_date.toLocaleDateString()}
                            </div> 
                            <div className="flex gap-1">
                                {active && <div> <p>Active </p></div>} 
                                {getMonthDifference(start_date, end_date)}  mos
                            </div> 
                            <div className="flex">
                                <MapPin className="w-4 h-4 mr-0.5"/>{location}
                            </div> 
                        </div>
                        
                    </div>
                    <div className = "flex  ml-auto gap-2 ">
                        <div className = "w-8 h-8   ">
                            <EditIcon/>
                        </div>
                        
                    </div>
                    
                </div>
                <div className="px-8 text-sm ">
                    <div>
                       {job_description}
                    </div>
                    <div className="flex py-1 gap-1">
                         {tech_skills.map((tech_skills) => (
                                <TechCard key={tech_skills.TechnologyName} {...tech_skills} />
                        ))}
                    </div>  
                </div>
                <div className="flex">       
                </div>
            </div>
        </>
    );
};

export default DashboardExperiencePanel;
