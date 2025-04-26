import { PageContext } from "@/providers/PageProvider";
import { useContext, useEffect, useState } from "react";
import Item from "./sidebar-item";
import { ChevronDown, ChevronRight, Ellipsis, File } from "lucide-react";
import { Page } from "@/types/pages";
import { rename } from "fs";

// This will be called for parent page and it will recursively render all the children
const PageItem = ({ 
  page, 
  level = 0, 
  selectedId, 
  setSelectedId 
}: { 
  page: Page; 
  level?: number; 
  selectedId: string; 
  setSelectedId: (id: string) => void; 
}) => {

  
  const context = useContext(PageContext);
  const { setPages,Pages } = context!;
  const [isRenaming,setRenaming] = useState(false);
  const [renameText,setRenameText] = useState("");


  const togglePageState = (id: string, close: boolean, pages: Page[]): Page[] => {
    return pages.map((p) => {
      if (p.id === id) {
        return { ...p, closed: close };
      }
      if (p.children && p.children.length > 0) {
        return { ...p, children: togglePageState(id, close, p.children) };
      }
      return p;
    });
  };

  const handleToggle = () => {
    // Set the selected ID
    setSelectedId(page.id);
    
    // Toggle the page state if it has children
    if (page.children && page.children.length > 0) {
      if (page.closed) {
        setPages((prev) => togglePageState(page.id, false, prev));
      } else {
        setPages((prev) => togglePageState(page.id, true, prev));
      }
    }
  };

  const handleDelete = () => {

    const deletePageRecursive = (pages: Page[], pageIdToDelete: string): Page[] => {
      return pages
        .filter((pg) => pg.id !== pageIdToDelete) // remove the page
        .map((pg) => ({
          ...pg,
          children: deletePageRecursive(pg.children || [], pageIdToDelete) // recurse into children
        }));
    };
  
    const updatedPages = deletePageRecursive(Pages, page.id);
    setPages(updatedPages);
  };

  const handleRenameSave = () => {
    if (!renameText.trim()) return;
  
    const updatePages = (pages: Page[], pageIdToModify: string): Page[] => {
      return pages.map((pg) => {
        if (pg.id === pageIdToModify) {
          return { ...pg, pageName: renameText };  // Bas return karo
        }
        if (pg.children && pg.children.length > 0) {
          return { ...pg, children: updatePages(pg.children, pageIdToModify) };  // Yahan pageIdToModify
        }
        return pg;
      });
    };
  
    const newPages: Page[] = updatePages(Pages, page.id);
    setPages(newPages);
    setRenaming(false);  // Kaam hone ke baad false
  };
  
  


  // Check if this page is the selected one
  const isSelected = selectedId === page.id;

  return (
    <div>
      {/* Parent page item */}
      <div 
        className="flex items-center parentDiv group" 
        style={{ paddingLeft: `${level * 16}px` }}
      >
        {/* Toggle Chevron */}
        {page.children && page.children.length > 0 ? (
          <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
            {page.closed ? (
              <ChevronRight className="cursor-pointer" onClick={handleToggle} />
            ) : (
              <ChevronDown className="cursor-pointer" onClick={handleToggle} />
            )}
          </div>
        ) : (
          <div className="flex-shrink-0 w-5 h-5"></div>
        )}

        <div className="group/item flex items-center">
          {/* Page Name */}
          <div className="flex-grow">
              {isRenaming ? (
                <input
                  className="text-black font-semibold w-fit text-lg px-1 rounded-md"
                  value={renameText}
                  onChange={(e) => setRenameText(e.target.value)}
                  onBlur={handleRenameSave}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleRenameSave();
                    }
                  }}
                  autoFocus
                />
              ) : (
                <Item
                  icon1={<File />}
                  text={page.pageName}
                  className={`${isSelected ? "text-black " : "text-gray-500 "} font-semibold w-fit text-lg hover:cursor-pointer`}
                  onClick={handleToggle}
                />
              )}
            </div>


        {/* Ellipsis and Menu - NEW isolated group */}
        <div className="relative ml-2">
          <div className="group/ellipsis relative">
            {/* Ellipsis icon */}
            <Ellipsis className="opacity-0 group-hover/item:opacity-100 cursor-pointer transition-opacity duration-200" />

            {/* Menu */}
            <div className="hidden group-hover/ellipsis:flex flex-col absolute right-0 top-6 bg-black text-white rounded-md shadow-lg p-2 z-20 w-32">
              <div onClick={()=>{
                setRenaming(true);
                setRenameText(page.pageName);
              }} className="border-b border-gray-500 pb-2 mb-2 cursor-pointer hover:bg-gray-800 px-2">
                Rename
              </div>
              <div onClick={handleDelete} className="cursor-pointer hover:bg-gray-800 px-2">
                Delete
              </div> 

            </div>
          </div>
        </div>
        </div>

      </div>


      {/* Recursively render children */}
      {!page.closed && page.children.length > 0 &&
        page.children.map((child) => (
          <PageItem 
            key={child.id} 
            page={child} 
            level={level + 1} 
            selectedId={selectedId} 
            setSelectedId={setSelectedId} 
          />
        ))}
    </div>
  );
};

const PagesComponent = ({selectedId , setSelectedId}) => {
  const context = useContext(PageContext);

  if (!context) {
    return <div>No pages yet</div>;
  }

  const { Pages } = context;

  return (
    <div className="sidebar-pages mt-2 mb-5">
      {Pages.map((page) => (
        <PageItem 
          key={page.id} 
          page={page} 
          selectedId={selectedId} 
          setSelectedId={setSelectedId} 
        />
      ))}
    </div>
  );
};

export default PagesComponent;