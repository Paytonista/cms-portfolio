export interface TechCardProps {
  TechnologyName: string;
}

const TechCard = ({ TechnologyName }: TechCardProps) => {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 bg-[#0F4C75]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#BBE1FA] shrink-0" />
      <p className="text-[#BBE1FA] font-medium text-xs tracking-wide">
        {TechnologyName}
      </p>
    </div>
  );
};

export default TechCard;