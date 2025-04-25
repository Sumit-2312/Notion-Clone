"use client";

import React, { useState, createContext } from "react";
import { Page } from "@/types/pages";

interface PageContextType {
  Pages: Page[];
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
}

export const PageContext = createContext<PageContextType | undefined>(undefined);

const samplePages: Page[] = [
  {
    id: "1",
    pageName: "Project Alpha",
    closed: false,
    children: [
      {
        id: "1-1",
        pageName: "README.md",
        children: [],
        closed: false
      },
      {
        id: "1-2",
        pageName: "src",
        closed: false,
        children: [
          {
            id: "1-2-1",
            pageName: "index.tsx",
            children: [],
            closed: false
          },
          {
            id: "1-2-2",
            pageName: "App.tsx",
            children: [],
            closed: false
          }
        ]
      }
    ]
  },
  {
    id: "2",
    pageName: "Notes",
    closed: false,
    children: [
      {
        id: "2-1",
        pageName: "Daily Logs",
        closed: false,
        children: [
          {
            id: "2-1-1",
            pageName: "2024-04-21.md",
            children: [],
            closed: true
          },
          {
            id: "2-1-2",
            pageName: "2024-04-22.md",
            children: [],
            closed: true
          }
        ]
      }
    ]
  }
];

export const PageContextProvide = ({ children }: { children: React.ReactNode }) => {
  const [Pages, setPages] = useState<Page[]>(samplePages);


  return (

    
    <PageContext.Provider value={{ Pages, setPages}}>
      {children}
    </PageContext.Provider>
  );
};
