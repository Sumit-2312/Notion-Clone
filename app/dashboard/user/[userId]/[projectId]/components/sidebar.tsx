"use client";

import { useEffect, useRef, useState } from "react";
import SidebarItem from "./sidebar-item";
import { ArrowDown10, ChevronsLeftRight, Settings } from "lucide-react";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { useSession } from "next-auth/react";
import { ProjectType } from "@/types/projectsSchema";

export default function Sidebar({project}:{
    project: ProjectType
}) {
  const [width, setWidth] = useState(30);
  const [username,setUsername] = useState("Unknown") 
  const isResizing = useRef(false);
//   const {data:session} = useSession(authOptions);

//   useEffect(()=>{
//     if(session?.user?.name)  setUsername(session.user.name);

//   },[session]);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;

    const mouseX = e.clientX;
    const totalWidth = window.innerWidth;
    let vw = (mouseX / totalWidth) * 100;

    vw = Math.max(20, Math.min(vw, 50)); 
    setWidth(vw);
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);

    document.body.classList.remove("no-select");
  };

  const handleMouseDown = () => {
    isResizing.current = true;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    document.body.classList.add("no-select");
  };

  return (
    <div
      className="bg-black relative text-white flex flex-col gap-5 px-5 py-10 h-screen"
      style={{ width: `${width}vw` }}
    >
      <div
        onMouseDown={handleMouseDown}
        className="absolute top-0 right-0 h-full w-[10px] cursor-col-resize bg-zinc-400 hover:bg-blue-700"
      ></div>

    <SidebarItem  text={`Hey ${username}`} />
    <SidebarItem classname="absolute bottom-2" First={Settings} text="Settings" />

    <SidebarItem text={project.projectName}/>
    </div>
  );
}
