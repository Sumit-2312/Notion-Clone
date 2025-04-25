import { LucideIcon } from "lucide-react";

const Variant = {
    primary: "text-black font-bold mb-5 text-lg",
    secondary: "text-gray-500 font-semibold text-lg hover:text-black hover:cursor-pointer"
  };
  
  //@ts-ignore
  const Item = ({ icon1, icon2, text, variantType, className,onClick,icon3 }: {
    icon1: React.ReactNode;
    icon2?: React.ReactNode;
    icon3?: React.ReactNode;
    text: string;
    variantType?: "primary" | "secondary";
    className?: string;
    onClick?:()=>void;
  }) => {
    return (
      <div onClick={onClick} className={`flex gap-2 items-center p-2 ${variantType && Variant[variantType]} ${className} `}>
        {icon1}
        {text}
        {icon3}
        {icon2}
      </div>
    );
  };
  
  export default Item;
  