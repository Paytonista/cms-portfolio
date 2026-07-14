
import TechCard ,{ TechCardProps } from "@/app/components/TechCard";
import {getMonthDifference} from "@/app/utils/date/getmonths"
import { motion } from "framer-motion";


interface ExperienceCardProps {
  onClick?: () => void;
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

const ExperienceCard = ({
  onClick,
  id,
  role,
  tech_company,
  active,
  start_date,
  end_date,
  location,
  job_description,
  tech_skills: tech_skills
}: ExperienceCardProps) => {
  return (
     <motion.div
     initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onClick={onClick}
      className="
        flex items-center gap-3 group text-sm sm:m-1 lg:m-4 w-full max-w-full p-1
        transition-all duration-100
        border border-transparent rounded-sm hover:shadow-2xl hover:cursor-pointer hover:bg-[#072037] hover:border-gray-800
      "
    >
      <div className="flex items-start gap-3 p-1 w-full min-w-0">
        <div className="w-37 shrink-0">
          <div className="flex flex-col text-xs text-gray-400 whitespace-nowrap py-1 text-center ">
            {start_date?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {end_date ? end_date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "Active"}
              
             
          </div>
        </div>

        <div className="flex flex-1 flex-col border-l border-gray-300 pl-6 min-w-0">

          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold whitespace-nowrap">
              {role}
            </h2>
            <a href="https://www.klaviyo.com/" target="_blank" className="text-sm text-gray-400 whitespace-nowrap">
              {tech_company}
            </a>
          </div>
          <div className="mt-2 text-gray-600">
            <p className="line-clamp-4 break-words">{job_description}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {tech_skills.map((tech_skill) => (
            <TechCard key={tech_skill.TechnologyName} {...tech_skill}></TechCard>
            ))}
      
          </div>
        </div>
        
      </div>
    </motion.div>
  );
};

export default ExperienceCard;