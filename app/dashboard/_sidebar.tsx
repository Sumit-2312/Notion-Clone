"use client";

import { useState, useRef } from "react";
import Item from "./sidebar-item";
import {ChevronsUpDown, Plus, PlusCircle, Search, Settings, Trash } from "lucide-react";
import Profile from "@/components/ui/profile-icon";

const Sidebar = () => {
  const [width, setWidth] = useState(300); 
  const isResizing = useRef(false);

  const startResize = () => {
    isResizing.current = true;
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResize);
  };

  const resize = (e: MouseEvent) => {
    if (isResizing.current) {
      setWidth(Math.min(window.innerWidth * 0.8, Math.max(200, e.clientX)));
    }
  };

  const stopResize = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResize);
  };

  return (
    <div
      style={{ width: `${width}px` }}
      className="h-full group bg-gray-200 text-black flex flex-col p-4 relative"
    >
     
      <Item text={"Sumit"} icon1={<Profile letter="S"/>} variantType="primary" icon2={<ChevronsUpDown/>} />

      <Item text={"Search"} icon1={<Search/>} variantType="secondary" />
     
      <Item text={"Setting"} icon1={<Settings/>} variantType="secondary" />
     
      <Item text={"New page"} icon1={<PlusCircle/>} variantType="secondary" />
     
      <Item text={"Add a page"} icon1={<Plus/>} variantType="secondary" />
     
      <Item text={"Trash"} icon1={<Trash/>} variantType="secondary" />
    

      <div
        onMouseDown={startResize}
        className="absolute top-0 right-0 w-1 h-full cursor-ew-resize bg-gray-200  hover:bg-gray-600"
      ></div>

    </div>
  );
};

export default Sidebar;
