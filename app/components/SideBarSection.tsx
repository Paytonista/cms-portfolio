import SideBarItem from "./SideBarItem";
import type { SideBarItemProps } from "./SideBarItem";

export type SideBarSectionProps = {
  section: string;
  items: SideBarItemProps[];
};

const SideBarSection = ({ section, items }: SideBarSectionProps) => {
  return (
    <div className="">
        <p className="text-[10px] tracking-[0.08em] font-bold m-1">{section}</p>
        {items.map((item) => (
            <SideBarItem key={item.label} {...item} />
            
            ))
        }
    </div>
  );
};

export default SideBarSection;