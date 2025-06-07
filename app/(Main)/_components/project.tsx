"use client";

import NewProjectModal from "@/components/ui/newProjectModal";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Project = {
  _id: string;
  name: string;
  createdAt: string;
  projectId: number;
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { data: session } = useSession();
  // it give the session asyncronously so we put session inside useEffect bcz at first instance it can be
  // undefined so whenever it is filled in session we send the request to fetch the projects
  const router = useRouter();
  const [clicked,setClicked] = useState(false);


  async function fetchProjects(userId: string) {
    try {
      const response = await axios.get<{ projects: Project[] }>(
        `http://localhost:3000/api/${session?.userId}/projects`
      );
      setProjects(response.data.projects);
    } catch (error) {
      console.error("Error during fetching projects on home page:", error);
    }
  }

const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
  // Find the closest project div with an id
  const target = e.target as HTMLElement;
  const projectDiv = target.closest('[id]') as HTMLDivElement;
  
  if (projectDiv && projectDiv.id) {
    const projectId = projectDiv.id;
    console.log(projectId);
    if (session && session.userId && projectId) {
      router.push(`/dashboard/user/${session.userId}/${projectId}`);
    }
  }
};

  useEffect(() => {
    if (session && session.userId) {
      fetchProjects(session.userId);
    }
  }, [session]);

  return (
    <div onClick={handleClick} className="flex flex-wrap gap-4">
      {projects.length > 0 && (
        projects.map((project) => (
          <div
            id={project.projectId.toString()}
            key={project._id}
            className="group min-w-60 relative w-64 h-64 flex flex-col justify-center items-center rounded-2xl border-2 border-gray-600 text-gray-200 cursor-pointer transition duration-300 hover:border-blue-500 hover:shadow-blue-500/50 hover:shadow-lg"
          >
            <div className="text-4xl text-center font-bold text-white">{project.name}</div>
            <div className="text-1xl font-semibold absolute right-1 bottom-0 text-gray-600">
              Created at: {new Date(project.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))
      )}
       <div onClick={(e)=>{
        e.stopPropagation();  // Prevent the bubbling up 
        setClicked(true)
      }}
        className="group min-w-60 w-64 h-64 flex flex-col justify-center items-center rounded-2xl border-2 border-dashed border-gray-600 text-gray-400 cursor-pointer transition duration-300 hover:border-blue-500 hover:shadow-blue-500/50 hover:shadow-lg"
      >
          <div
            className="flex justify-center items-center w-12 h-12 rounded-full border border-gray-600 group-hover:border-blue-500 transition duration-300"
          >
            <span className="text-3xl">+</span>
          </div>
          <p className="mt-4 text-lg font-semibold group-hover:text-blue-400 transition duration-300">
            Create New Project
          </p>
        </div>

      {clicked && <NewProjectModal setclicked={setClicked} />}

    </div>
  );
};

export default Projects;
