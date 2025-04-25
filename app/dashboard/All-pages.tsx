import { PageContext } from "@/providers/PageProvider";
import { useContext, useEffect, useState } from "react";
import Item from "./sidebar-item";
import { ChevronDown, ChevronRight, Ellipsis, File } from "lucide-react";
import { Page } from "@/types/pages";

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
  const { setPages } = context!;
  const [clicked,setClicked] = useState(false);

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

  useEffect(()=>{
    console.log(page.id , clicked)
  },[clicked])
  // Check if this page is the selected one
  const isSelected = selectedId === page.id;

  return (
    <div>
      {/* Parent page item */}
      <div 
          className="flex items-center  " 
          style={{ paddingLeft: `${level * 16}px` }}
        >
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

            <div className="flex-grow">
              <Item
                icon1={<File />}
                text={page.pageName}
                className={`${isSelected ? "text-black " : "text-gray-500 "} font-semibold w-fit text-lg hover:cursor-pointer`}
                onClick={handleToggle}
              />
            </div>

            <div className="relative group border border-black">
                <div className="hover:cursor-pointer">
                  <Ellipsis 
                    onClick={() => setClicked((prev) => !prev)} 
                    className="hidden group-hover:block" 
                  />
                </div>
                {clicked && 
                  <div className="flex flex-col bg-black text-white p-3 rounded-md absolute right-0 top-6 shadow-lg z-10 w-32">
                    <div className="border-b border-gray-500 pb-2 mb-2 cursor-pointer hover:bg-gray-800 px-2">Rename</div>
                    <div className="cursor-pointer hover:bg-gray-800 px-2">Delete</div> 
                  </div>
                }
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