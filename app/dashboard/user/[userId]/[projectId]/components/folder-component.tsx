"use client";

import { useState } from "react";
import { FolderType } from "@/types/projectsSchema";
import { ChevronDown, ChevronRight, Folder as FolderIcon } from "lucide-react";

export default function Folders({ folders }: { folders: FolderType[] | undefined }) {
  const [openFolders, setOpenFolders] = useState<{ [key: number]: boolean }>({});

  const toggleFolder = (folderId: number) => {
    setOpenFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  return (
    <div className="text-sm">
      {folders && folders.length > 0 ? (
        folders.map(folder => (
          <div
            key={folder.folderId}
            className="flex items-center gap-1 cursor-pointer hover:bg-gray-800 p-1 rounded"
          >
            { folder.closed === false ? (
              <ChevronDown className="w-4 h-4 text-white" />
            ) : (
              <ChevronRight className="w-4 h-4 text-white" />
            )}
            <FolderIcon className="w-4 h-4 text-yellow-400" />
            <span className="text-shadow-white">{folder.name}</span>
          </div>
        ))
      ) : (
        <div className="text-gray-400 italic">No folder created...</div>
      )}
    </div>
  );
}
