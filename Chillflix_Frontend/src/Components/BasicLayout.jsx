import { useState, useEffect} from "react"
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import Footer from "./Footer";

function BasicLayout(){


     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { pathname } = useLocation();
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

     useEffect(() => {
        if(isSidebarOpen){
            document.body.style.overflow = "hidden";
        }else{
            document.body.style.overflow = "auto"
        }

        return() =>
            document.body.style.overflow = "auto"
        
     }, [isSidebarOpen])
    return(
        <>
         <div className="min-h-screen flex flex-col">
            <header>    
                <Navbar setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen = {isSidebarOpen} />
            </header>
            
            <main className="grow">
                <Outlet />
            </main>


        {/* Sidebar */}
           {isSidebarOpen && (
                <div
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-black/40 z-40"
                />
             )}
            <SideBar 
                isSidebarOpen = {isSidebarOpen}
            />

             
                {/*Footer */}
                <footer >
                <Footer />
                </footer>
       </div>
        </>
    )
}
export default BasicLayout