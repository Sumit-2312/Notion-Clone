"use client";

import { ProjectContext } from "@/providers/PageProvider";
import { FolderType, ProjectType } from "@/types/projectsSchema";
import axios from "axios";
import { use, useContext, useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import { IProject } from "@/types/database";
import Workspace from "./components/Workspace";

interface projectT extends IProject {
    folders: FolderType[]
}

export default function Dashboard({params}:{params:Promise<{userId:string,projectId:string}>}){

    const {projectId} = use(params);
    const [Errors,setErrors] = useState<string|null>(null);
    const context = useContext(ProjectContext);
    const [project,setProject] = useState<projectT|null>();
    
    if( !context ){
        setErrors("something went wrong");
        return <div>Error: Context not available</div>;
    }
    
    const {setProjects} = context;

    const FetchFolders = async ()=>{
        try{
            const response = await axios.get(`http://localhost:3000/api/project/${projectId}`);
            const AllFolders: FolderType[] = response.data.folders;
            const response_project: ProjectType = response.data.project;

            setProjects((prev: { [projectName: string]: ProjectType }) => {

                const updatedProject: ProjectType = {
                    ...response_project,
                    folders: AllFolders,
                    closed:true
                };

                setProject(updatedProject);
                
                return {
                    ...prev,
                    [response_project.projectName]: updatedProject
                };
            });
        }
        catch(error:any){
            setErrors(error?.message || "An error occurred");
        }
    }

    useEffect(()=>{
        FetchFolders();
    },[projectId]); 

    if (Errors) {
        return <div className="text-red-500 text-xl">Error: {Errors}</div>;
    }

    return (
        <div className="text-white text-4xl border border-amber-300 w-full flex h-screen">
            <Sidebar project={project}/>
            <Workspace/>
        </div>
    )
}