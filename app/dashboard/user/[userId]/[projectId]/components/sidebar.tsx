"use client";

import { useEffect, useRef, useState } from "react";
import SidebarItem from "./sidebar-item";
import {
  FilePlusIcon,
  FolderPlusIcon,
  Settings
} from "lucide-react";
import { useSession } from "next-auth/react";
import { FolderType, ProjectType } from "@/types/projectsSchema";
import { IProject } from "@/types/database";
import Folders from "./folder-component";

interface projectT extends IProject {
  folders: FolderType[];
  closed: boolean;
}

export default function Sidebar({ project }: { project: projectT | null | undefined }) {
  const [width, setWidth] = useState(30);
  const [username, setUsername] = useState("Unknown");
  const [projectClosed, setProjectClosed] = useState(project?.closed ?? false);

  const isResizing = useRef(false);
  //@ts-ignore
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.username) setUsername(session.user.username);
  }, [session]);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    const vw = Math.max(20, Math.min((e.clientX / window.innerWidth) * 100, 50));
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

      <SidebarItem classname="text-3xl font-bold" text={`Hey ${username}`} />
      <SidebarItem classname="absolute text-xs left-5 bottom-2" First={Settings} text="Settings" />

      {project && (
        <SidebarItem
          onToggle={() => setProjectClosed((prev) => !prev)}
          closed={projectClosed}
          Third={FilePlusIcon}
          Second={FolderPlusIcon}
          classname="text-xl"
          text={project.name}
        />
      )}

      { !projectClosed && project && <Folders folders={project?.folders} /> }

    </div>
  );
}
