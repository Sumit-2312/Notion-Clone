"use client";

import { Button } from "@/components/ui/button";
import LogoutModal from "@/components/ui/logoutModal";
import ScrollHook from "@/hooks/navbar-scroll";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";


const Navbar = () => {
    const router = useRouter();
    const scrolling = ScrollHook();
    const {data:session} = useSession();
    const [clicked,setClicked] = useState(false);

    return ( 
        <div  className={`flex fixed top-0 left-0 z-50 hover:cursor-pointer w-full items-center justify-between p-4 ${scrolling ? "border-b-1 border-gray-600" : " "}`}>

            <div onClick={()=> router.push("/")} className="flex items-center gap-2"> 
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-8 h-8 text-black fill-current"
        >

            </svg>

                <h1 className="text-2xl font-bold">Notion</h1>

            </div>

            <div className="flex pr-4 gap-4">
               { session ? (
                    <Button
                        onClick={()=> setClicked(true)}
                        variant={"outline"}
                        className="text-black font-bold hover:cursor-pointer"
                    >
                        Logout
                    </Button>
                    ) : (
                    <Button
                        onClick={() => signIn()}
                        variant={"outline"}
                        className="text-black font-bold hover:cursor-pointer"
                    >
                        Login
                    </Button>
                    )
                }
            </div>

        {clicked && <LogoutModal setclicked={setClicked} />}


        </div>
     );
}
 
export default Navbar;