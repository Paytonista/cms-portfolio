

import DashboardPanel from "./DashboardPanel";
import TechCard, {TechCardProps} from "./TechCard";
import { Calendar, MapPin, EditIcon, Trash2 } from "lucide-react";
import {getMonthDifference} from "@/app/utils/date/getmonths"

import { useState } from "react";

import { start } from "repl";



interface DashboardProjectPanelProps {
    id : string;
    project_name: string;
    details: string;
    highlight_image: string;
    tooltip_images: string[];
    tech_skills: TechCardProps[];
    onEdit?: (experience : DashboardProjectPanelProps) => void;
    onDelete?: (id : string) => void;

}

const DashboardProjectPanel = ({ id, project_name, details, highlight_image, tooltip_images, tech_skills : tech_skills , onEdit, onDelete} : DashboardProjectPanelProps) => {

  const [showCarousel, setShowCarousel] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () =>
    setCurrentIndex((prev) => (prev + 1) % tooltip_images.length);
  const goPrevious = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + tooltip_images.length) % tooltip_images.length
    );

    return (
        <>
        <div className="flex flex-col  border border-slate-400 rounded py-3">
                <div className="flex flex-row items-start px-4 py-1"> 
                    <div className = "ml-4 ">
                        <div className="text-lg tracking-widest">{project_name}</div>
                        <div className="text-md">{details}</div>
                        
                    </div>
                    <div className = "flex  ml-auto gap-2 ">
                        <div className = "w-8 h-8   ">
                            <EditIcon 
                            className="m-1 transition-transform duration-200 hover:scale-125"
                            
                            onClick={() => onEdit?.({id, project_name, details, highlight_image, tooltip_images, tech_skills})}/>
                            <Trash2 
                            className="m-1 transition-transform duration-200 hover:scale-125"
                            onClick={() => onDelete?.(id)}/>
                        </div>
                        
                    </div>
                    
                </div>
                <div className="px-8 text-sm ">
                    <div>
                       {details}
                    </div>
                    <div className="flex py-1 gap-1">
                         {tech_skills.map((tech_skills) => (
                                <TechCard key={tech_skills.TechnologyName} {...tech_skills} />
                        ))}
                    </div>  
                </div>
                <div className="p-2 flex gap-2 ">   
                    
                    <div className="w-full aspect-video max-w-xs text-center  ">
                        <label> Highlight Image</label>
                        <img src="https://l8zje028s7.ufs.sh/f/OHWUQDzpm86O2FHIuPNOAWlKbgTDIU0LwnrtmCsjX1M6PpSE" />
                    
                    </div>  
                    <div className="w-full aspect-video max-w-xs text-center border">
                        Tooltip Image
                    
                    </div>  
                    <div className="w-full aspect-video max-w-xs text-center border">
                        Tooltip Image
                    
                    </div>  
                    <div className="w-full aspect-video max-w-xs text-center border">
                        Tooltip Image
                    
                    </div>  
                    <div className="w-full aspect-video max-w-xs text-center border">
                        Tooltip Image
                    
                    </div>  
                      
                </div>
            </div>
        </>
    );
};

export default DashboardProjectPanel;
