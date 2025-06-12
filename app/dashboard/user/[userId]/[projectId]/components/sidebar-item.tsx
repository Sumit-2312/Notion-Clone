import React from "react";
import { ChevronDown, ChevronUp, LucideIcon } from "lucide-react";

interface SidebarItemProps {
  First?: LucideIcon;
  Second?: LucideIcon;
  Third?: LucideIcon;
  text: string;
  classname?: string; 
  closed?: boolean;
  onToggle?: () => void; // New
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  First,
  Second,
  Third,
  text,
  classname,
  closed,
  onToggle
}) => {
  return (
    <div className={`hover:cursor-pointer flex items-center justify-between gap-2 py-2 pr-2 text-white ${classname}`}>
      {/* LEFT SECTION - now clickable */}
      <div
        className="flex items-center gap-1 min-w-0 flex-1"
        onClick={onToggle}
      >
        {First && <First className="text-xl shrink-0" />}
        {typeof closed === "boolean" &&
          (closed ? (
            <ChevronUp className="text-xl shrink-0" />
          ) : (
            <ChevronDown className="text-xl shrink-0" />
          ))}
        <span className="truncate block">{text}</span>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-1 shrink-0">
        {Second && <Second className="text-xl" />}
        {Third && <Third className="text-xl" />}
      </div>
    </div>
  );
};

export default SidebarItem;
