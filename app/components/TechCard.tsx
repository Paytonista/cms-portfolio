
export interface TechCardProps  {
  TechnologyName: string;
}

const TechCard = ({ TechnologyName }: TechCardProps) => {
  return (
    <div
      
      className={`
       rounded-xl px-3 py-1 bg-[#0F4C75]
      `}
    >
      <p className="text-[#BBE1FA] font-bold text-xs"> 
      {TechnologyName}
      </p>
    </div>
   
  );
};

export default TechCard;