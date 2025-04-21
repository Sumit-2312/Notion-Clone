"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-button";
import ScrollHook from "@/hooks/navbar-scroll";
import { useRouter } from "next/navigation";


const Navbar = () => {
    const router = useRouter();
    const scrolling = ScrollHook();

    return ( 
        <div  className={`flex fixed top-0 left-0 hover:cursor-pointer w-full items-center justify-between p-4 ${scrolling ? "border-b-1 border-gray-600" : " "}`}>
            <div onClick={()=> router.push("/")} className="flex items-center gap-2"> 
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-8 h-8 text-black fill-current"
>
  <path
    className="text-white"
    fill="currentColor"
    fillRule="evenodd"
    clipRule="evenodd"
    d="M18.403.068 1.805 1.291C.466 1.406 0 2.28 0 3.326v18.155c0 .816.29 1.513.99 2.444l3.902 5.063c.64.815 1.223.99 2.447.93l19.275-1.163c1.63-.116 2.097-.873 2.097-2.153V6.178c0-.662-.262-.853-1.034-1.416a89.567 89.567 0 0 1-.132-.097L22.247.941C20.966.011 20.44-.107 18.403.068ZM7.776 5.843c-1.574.106-1.931.13-2.825-.596L2.678 3.443c-.232-.233-.115-.524.467-.581l15.957-1.164c1.339-.117 2.038.35 2.562.756l2.737 1.979c.116.058.407.407.058.407l-16.48.99-.203.013ZM5.94 26.427V9.087c0-.756.233-1.105.932-1.164l18.926-1.105c.642-.058.933.35.933 1.105v17.223c0 .758-.117 1.398-1.166 1.456L7.455 27.65c-1.05.058-1.515-.29-1.515-1.223Zm17.88-16.41c.116.525 0 1.049-.526 1.108l-.872.174v12.8c-.758.408-1.457.64-2.039.64-.932 0-1.165-.29-1.864-1.163l-5.707-8.96v8.67l1.806.407s0 1.047-1.458 1.047l-4.017.233c-.117-.233 0-.815.408-.931l1.048-.29V12.287l-1.456-.117c-.116-.524.174-1.28.99-1.338l4.31-.29 5.94 9.077v-8.03l-1.514-.174c-.117-.641.349-1.107.931-1.164l4.02-.234Z"
  />
            </svg>

                <h1 className="text-2xl font-bold">Notion</h1>
            </div>
            <div className="flex gap-4">
                <ModeToggle/>
                <Button onClick={()=>router.push('/login')} variant={"outline"}
                className="text-black font-bold hover:cursor-pointer">
                    Login
                </Button>
            </div>
        </div>
     );
}
 
export default Navbar;