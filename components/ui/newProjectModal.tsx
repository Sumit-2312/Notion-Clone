import { useState } from "react";
import { Button } from "./button";
import axios from "axios";

export default function NewProjectModal({
  setclicked,
}: {
  setclicked: (value: boolean) => void;
}) {
  const [projectName, setProjectName] = useState("");

  // Handle click on overlay to close modal
  function handleOverlayClick(e:React.MouseEvent) {
    e.stopPropagation();
    setclicked(false);
  }

  // Prevent clicks inside modal content from closing modal
  function handleModalClick(e: React.MouseEvent) {
    e.stopPropagation();
  }

  // Handle create project API call
  async function handleCreateProject() {
    if (!projectName.trim()) {
      alert("Please enter a project name.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/create-project',{
        projectName : projectName
      });
    // add the newly created project in the provider

        setclicked(false);
      
    } catch (error) {
        console.log("error occured during creation of new project",error);
    }
  }

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-xs z-50"
    >
      <div
        onClick={handleModalClick}
        className="bg-white max-w-md w-full p-8 rounded-xl shadow-lg text-black flex flex-col gap-6 relative"
      >
        <button
          onClick={() => setclicked(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-3xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>

        <p className="text-xl font-semibold text-center">Create New Project</p>

        <input
          type="text"
          placeholder="Enter project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="border border-gray-300 rounded-md p-2 text-base"
        />

        <Button
          onClick={handleCreateProject}
          className="bg-blue-500 hover:bg-blue-600 text-white"
          variant={"outline"}
        >
          Create
        </Button>
      </div>
    </div>
  );
}
