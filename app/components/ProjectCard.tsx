import TechCard from "@/app/components/TechCard";

interface ProjectCardProps {
  onClick?: () => void;
  yearStarted?: string;
  yearEnded?: string;
  companyName?: string;
  companyLink?: string;
  position?: string;
  details?: string;
}

const ProjectCard = ({
  onClick,
  yearStarted,
  yearEnded,
  companyName,
  position,
  details,
}: ProjectCardProps) => {
  return (
    <div
      onClick={onClick}
      className="
         flex items-center gap-3 group text-sm m-4
        transition-all duration-100
        border border-transparent rounded-sm hover:shadow-2xl hover:cursor-pointer hover:bg-[#072037] hover:border-gray-800
      "
    >
      <div className="flex items-start  gap-6 p-6  ">
        <div className="w-24 max-w-md aspect-video border">
          
          
        </div>

        <div className="flex-1 flex-col border-l border-gray-300 pl-6">

          <div className="flex items-center gap-2">
            <h2 className="text-md font-semibold whitespace-nowrap">
              Mathingo
            </h2>
            
          </div>
          <div className=" text-xs text-gray-600">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien eget nunc efficitur varius. Sed at ligula a enim efficitur tincidunt. Curabitur ac odio id metus efficitur fermentum.</p>
          </div>
          <div className="mt-4 flex gap-2">
            <TechCard TechnologyName="React" />
            <TechCard TechnologyName="TypeScript"/>
            <TechCard TechnologyName="Node.js" />

      
          </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default ProjectCard;