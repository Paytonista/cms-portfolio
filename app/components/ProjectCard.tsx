import { useState, Fragment} from "react";
import TechCard , {TechCardProps}from "@/app/components/TechCard";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface ProjectCardProps {
  onClick?: () => void;
  project_name : string;
  developedAt?: string;
  details?: string;
  highlight_image: string;
  tooltip_images: string[];
  tech_skills: TechCardProps[];
}

const ProjectCard = ({
  onClick,
  project_name,
  details,
  highlight_image,
  tooltip_images,
  tech_skills : tech_skills,
}: ProjectCardProps) => {
  const [isOpen, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => {
    
  };

  const goPrevious = () => {
    
  };

  return (
    <div
      onClick={onClick ? onClick : () => setOpen(!isOpen)}
      className="
        relative flex items-center gap-3 group text-sm m-4
        transition-all duration-100
         hover:shadow-lg
        cursor-pointer
        
        
      "
    > <div
        className={`
          fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center
          transition-all duration-300 ease-in-out
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        <div
          onClick = {(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
          className="absolute inset-0 bg-black opacity-50"
        ></div>
        

        {tooltip_images.map((src) => (
          <Fragment key={src}>
            <img
                src={src}
                className="max-w-md aspect-video border"
            />
            {tooltip_images.length > 1 && (
            <>
            
              
              
            </>
            )}
 
          
          </Fragment>
          ) 
        )}

        
      </div>
        
        
        <div className="flex items-start  gap-6 p-6  ">
          <div className="w-24 max-w-md aspect-video border">
            
            
          </div>

          <div className="flex-1 flex-col border-l border-gray-300 pl-6">

            <div className="flex items-center gap-2">
              <h2 className="text-md font-semibold whitespace-nowrap">
                {project_name}
              </h2>
              
            </div>
            <div className=" text-xs text-gray-600">
              <p>{details}</p>
            </div>
            <div className="mt-4 flex gap-2">
              {tech_skills.map((tech_skill) =>(
                <TechCard key={tech_skill.TechnologyName} {...tech_skill}/>
              ))}
            </div>
          </div>  
        </div>


    </div>
  );
};

export default ProjectCard;