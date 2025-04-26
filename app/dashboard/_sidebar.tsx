"use client";

import { useState, useRef, useContext } from "react";
import Item from "./sidebar-item";
import {ChevronsUpDown, Plus, PlusCircle, Search, Settings, Trash } from "lucide-react";
import Profile from "@/components/ui/profile-icon";
import PagesComponent from "./All-pages";
import { PageContext } from "@/providers/PageProvider";

const Sidebar = () => {
  const [width, setWidth] = useState(300); 
  const isResizing = useRef(false);
  const {setPages} = useContext(PageContext);
  const [selectedId, setSelectedId] = useState("");


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


  const handlePages = () => {
    const value = prompt("Enter file name:");
    if (!value) return;
  
    const addPageById = (pages: any[]): any[] => {
      return pages.map((page) => {
        if (page.id === selectedId) {
          return {
            ...page,
            children: [
              ...(page.children || []),
              {
                pageName: value,
                id: Math.random().toString(),
                closed: true,
                children: []
              }
            ]
          };
        } else if (page.children && page.children.length > 0) {
          return {
            ...page,
            children: addPageById(page.children)
          };
        }
        return page;
      });
    };
  
    setPages((prev: any) => addPageById(prev));
  };


  const handleFolderAdd = ()=>{
    let value = prompt("Enter folder name: ");
    setPages((prev:any)=>[...prev,{
      pageName: value,
      children: [],
      id : Math.random().toString(),
      closed: false
    }])
  }
  
  

  return (
    <div
      style={{ width: `${width}px` }}
      className="h-full group bg-gray-200 text-black flex flex-col p-4 relative overflow-x-hidden overflow-y-scroll"
    >
     
      <Item text={"Sumit"} icon1={<Profile letter="S"/>} variantType="primary" icon2={<ChevronsUpDown/>} />

      <div className="text-gray-500 hover:text-black flex items-center ">
        <Item icon1={<Search/>}  variantType="secondary" />
        <input type="text" placeholder="Search" className="text-black text-lg px-2 py-3" />
      </div>
     
      <Item text={"Settings"} icon1={<Settings/>} variantType="secondary" />
     
      <Item onClick={handlePages} text={"New page"} icon1={<PlusCircle/>} variantType="secondary"/>

      <PagesComponent selectedId={selectedId} setSelectedId={setSelectedId}/>
     
      <Item onClick={handleFolderAdd} text={"Add a folder"} icon1={<Plus/>} variantType="secondary" />
     
      <Item text={"Trash"} icon1={<Trash/>} variantType="secondary" />
    

      <div
        onMouseDown={startResize}
        className="absolute top-0 right-0 w-1 h-full cursor-ew-resize bg-gray-200  hover:bg-gray-600"
      ></div>

    </div>
  );
};

export default Sidebar;
