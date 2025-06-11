"use client";

import { ProjectContext } from "@/providers/PageProvider";
import { FolderType, ProjectType } from "@/types/projectsSchema";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Sidebar from "./components/sidebar";

export default function Dashboard({params}:{params:{userId:string,projectId:string}}){

    const {userId,projectId} = params;
    const [Errors,setErrors] = useState<string|null>(null);
    const context = useContext(ProjectContext);
    const [project,setProject] = useState<ProjectType|null>();
    
    if( !context ){
        setErrors("something went wrong");
        return <div>Error: Context not available</div>;
    }
    
    const {setProjects} = context;

    const FetchFolders = async ()=>{
        try{
            const response = await axios.get(`http://localhost:3000/api/project/${projectId}`);
            const AllFolders: FolderType[] = response.data.folders;
            const project: ProjectType = response.data.project;

            setProjects((prev: { [projectName: string]: ProjectType }) => {

                const updatedProject: ProjectType = {
                    ...project,
                    folders: AllFolders
                };

                setProject(updatedProject);
                
                return {
                    ...prev,
                    [project.projectName]: updatedProject
                };
            });
        }
        catch(error:any){
            setErrors(error?.message || "An error occurred");
        }
    }

    useEffect(()=>{
        FetchFolders();
    },[projectId,project]); 

    if (Errors) {
        return <div className="text-red-500 text-xl">Error: {Errors}</div>;
    }

    return (
        <div className="text-white text-4xl border border-amber-300 w-full flex h-screen">
            <Sidebar project={project}/>
        </div>
    )
}