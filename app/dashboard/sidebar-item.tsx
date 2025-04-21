const Variant = {
    primary: "text-black font-bold mb-5 text-lg",
    secondary: "text-gray-500 font-semibold text-lg hover:text-black hover:cursor-pointer"
  };
  
  const Item = ({ icon1, icon2, text, variantType }: {
    icon1: React.ReactNode;
    icon2?: React.ReactNode;
    text: string;
    variantType: "primary" | "secondary";
  }) => {
    return (
      <div className={`flex gap-2 items-center p-2 ${Variant[variantType]}`}>
        {icon1}
        {text}
        {icon2}
      </div>
    );
  };
  
  export default Item;
  