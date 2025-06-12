"use client";

import { Button } from "@/components/ui/button";
import LogoutModal from "@/components/ui/logoutModal";
import { useState } from "react";

function Workspace() {
  const [logoutOpen, setLogoutOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col justify-between border-0 relative h-screen overflow-y-scroll text-white flex-1">
      <div className="flex items-center justify-end gap-2 px-5">
        <Button className="text-black bg-white" variant="outline">
          Publish
        </Button>
        <Button onClick={() => setLogoutOpen((prev) => !prev)} className="text-black bg-white">
          Logout
        </Button>
      </div>

      <div>hello</div>

      <div className="w-full flex justify-end items-center">
        <Button className="text-black bg-white">Save changes</Button>
      </div>

      {logoutOpen && (
        <div className="absolute top-0 left-0 h-screen w-screen">
          <LogoutModal setclicked={() => setLogoutOpen(false)} />
        </div>
      )}
    </div>
  );
}

export default Workspace;
