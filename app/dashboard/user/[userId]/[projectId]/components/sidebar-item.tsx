import React from "react";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  First?: LucideIcon;
  Second?: LucideIcon;
  Third?: LucideIcon;
  text: string;
  classname?: string; 
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  First,
  Second,
  Third,
  text,
  classname = "",
}) => {
  return (
    <div className={`relative flex items-center text-white gap-2 p-2 ${classname}`}>
      {First && <First size={20} />}
      {Second && <Second size={20} />}
      {Third && <Third size={20} />}
      <span className="text-base">{text}</span>
    </div>
  );
};

export default SidebarItem;
