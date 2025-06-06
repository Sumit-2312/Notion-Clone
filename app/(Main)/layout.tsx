import Footer from "./_components/footer";
import Navbar from "./_components/Navbar";

const MainLayout = ({children}:{
    children: React.ReactNode;
}) => {
    return ( 
        <div className="h-full flex flex-col  ">
            
           <div className="flex-1 ">
            {children}
           </div>
            <Footer/>
        </div>
     );
}
 
export default MainLayout;