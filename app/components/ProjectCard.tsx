import { useState, Fragment} from "react";
import TechCard , {TechCardProps}from "@/app/components/TechCard";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { motion } from "framer-motion";

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
    console.log("goNext called, currentIndex:", currentIndex);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tooltip_images.length);
    
  };

  const goPrevious = () => {
    console.log("goPrevious called, currentIndex:", currentIndex);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + tooltip_images.length) % tooltip_images.length);

  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onClick={onClick ? onClick : () => setOpen(!isOpen)}
      className="
        relative flex items-center gap-3 group text-sm m-4 w-full
        transition-all duration-100
        hover:shadow-lg 
        cursor-pointer      
      "
    > <div
        onClick = {(e) => {
            e.stopPropagation();
          }}
        className={`
          fixed inset-0 z-50 overflow-hidden backdrop-blur-md flex items-center justify-center
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
        {tooltip_images.length > 1 && (
          <button 
            onClick={(e) => {
            e.stopPropagation();
            goPrevious();
          }}
            className={`relative z-51 transition-opacity duration-200 ${ currentIndex === 0 ? "opacity-0" : "opacity-100" }`}
            >
            <ChevronLeftIcon />
          </button>        
            )}
        
        {tooltip_images.length > 1 && (
          <img
            key={tooltip_images[currentIndex]}
            src={tooltip_images[currentIndex]}
            loading="lazy"
            className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain relative z-51"
          />
        )}

        {tooltip_images.length > 1 && (
          <button onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
            className={`relative z-51 transition-opacity duration-200 ${ currentIndex === tooltip_images.length - 1 ? "opacity-0" : "opacity-100" }` }
            >
            <ChevronRightIcon/>
          </button>        
            )}

        
      </div>
        
        
        <div className="flex items-start lg:flex-col  gap-6 p-6 w-full min-w-0 ">
          <div className="w-28 md:w-38 lg:w-48 max-w-xl aspect-video lg:border shrink-0">
            <img
              src={highlight_image}
              className="w-full h-full object-cover"
            />
            
      
            
          </div>

          <div className="flex-1 flex-col min-w-0 border-l border-gray-300 pl-6">

            <div className="flex items-center gap-2">
              <h2 className="text-md font-semibold truncate">
                {project_name}
              </h2>
              
            </div>
            <div className=" text-xs text-gray-600">
              <p className="text-justify break-words">{details}</p>
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
              {tech_skills.map((tech_skill) =>(
                <TechCard key={tech_skill.TechnologyName} {...tech_skill}/>
              ))}
            </div>
          </div>  
        </div>


    </motion.div>
  );
};

export default ProjectCard;