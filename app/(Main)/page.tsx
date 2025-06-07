import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Navbar from "./_components/Navbar";
import Projects from "./_components/project";

export default function Home() {
  return (
  <div className="h-full bg-black w-full flex flex-col items-center text-white pt-40">
    <Navbar/>

        <div className=" flex flex-col px-20">

          <div className="flex  h-full text-center flex-col items-center justify-center ">

            <h1 className="text-4xl font-bold">Your ideas, Documents & Plans. Unified. Welcome to <span className="underline hover:cursor-pointer">Notion</span> </h1>
            <p className="text-lg mt-4">Notion is the connected workspace where <br />better,faster work happens.</p>

          <a href="#Projects">
                <Button  variant={"outline"} className="mt-8 text-black font-bold hover:cursor-pointer group">
                  Get Started 
                  <ArrowRight className="text-black font-bold group-hover:scale-105 group-hover:translate-x-1.5 "/>
              </Button>
          </a>

          </div>

          <div className="flex h-full  gap-5 ">
              <div className="  h-full w-full md:w-1/2 overflow-hidden">
                <img className="h-full max-w-lg w-full object-contain" src="/white-first.svg" alt="image1" />
              </div>
              <div className=" hidden md:block h-full w-1/2  overflow-hidden">
                <img className="h-full max-w-lg w-full object-contain" src="/second-white.svg" alt="image2" />
              </div>
          </div>

        </div>

    
        <div id="Projects" className="flex flex-col mt-10 justify-center p-20 items-center w-full min-h-screen bg-black">
            <p className="text-4xl text-center font-bold" >Start building your projects</p>   

            <div className="flex flex-wrap justify-center items-center gap-10 h-fit p-20 w-full">
              <Projects/>
               
            </div>
        </div>

        
    
  </div>
  );
}
