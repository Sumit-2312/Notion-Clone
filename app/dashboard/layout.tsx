import Sidebar from "./_sidebar";

const DashboardLayout = ({children}:{
    children: React.ReactNode;
}) => {
    return ( 
        <div className="h-screen flex w-full bg-black text-white  ">
           <Sidebar />
           <div className="h-screen overflow-y-scroll scrollbar-none border flex-grow ">
            {/* flex grow will make sure that it takes the remaining space */}
                {children}
           </div>
        </div>
     );
}
 
export default DashboardLayout;