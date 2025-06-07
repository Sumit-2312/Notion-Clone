"use client";

import React, { createContext, useState } from "react";
import { project as ProjectType } from "../types/projectsSchema";

interface ProjectContextType {
  projects: { [projectName: string]: ProjectType };
  setProjects: React.Dispatch<React.SetStateAction<{ [projectName: string]: ProjectType }>>;
}

export const ProjectContext = createContext<ProjectContextType | null>(null);

export default function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<{ [projectName: string]: ProjectType }>({});

  return (
    <ProjectContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectContext.Provider>
  );
}
