import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import ProfileDropdown from "./ProfileDropDown";
function Navbar({setIsSidebarOpen}){
    const [opacity, setOpacity] = useState(0);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    useEffect(() => {
        const handler = () =>{
            const scrollPosition = window.scrollY;
            const newOpacity = Math.min(scrollPosition/450, 1)
            setOpacity(newOpacity)
        }

        window.addEventListener('scroll', handler)
        
        return () => {window.removeEventListener('scroll', handler)
        }
    }, [])
    const handleClick = () => {
        setIsSidebarOpen(true)
    }

    const handleProfileDropdown = () => {
     setIsProfileOpen(prev => !prev);
    }
    return(
    <>

    <header style={{ backgroundColor: `rgba(27, 18, 18,${opacity})` }} className="fixed z-99   w-full  ">
        <div className=" px-4 py-4  flex justify-between ">
            <div className="flex gap-8 text-small">
                <div className="flex justify-center items-center">
                    <img src="/images/NetflixLogoSvg.svg" className=" h-12 md:h-16" /> 
                </div>
             
                <ul className=" hidden md:flex text-amber-50 justify-center items-center gap-8 cursor-pointer ">
                    <li className="hover:text-gray-300"> <Link to="/Home">Home</Link></li>
                    <li className="hover:text-gray-300"><Link to="/movies" className="cursor-pointer">Movies</Link></li>
                    <li className="hover:text-gray-300"><Link to="/my-list" className="cursor-pointer">My List</Link> </li>
                </ul>
            </div>  
       
            <div className="hidden md:flex gap-8 justify-center items-center "> 
                <div>
                     <Link to="/search">
                        <img 
                        src="/images/Search.svg" 
                        alt="search" 
                        className="cursor-pointer"
                        />
                    </Link>
                </div>
                <div className="flex items-center gap-1.5"
                 onClick={handleProfileDropdown}
                >
                    <img src="/images/profile.svg" alt="" className="cursor-pointer"/>
                    <img src="/images/DownArrow.svg" alt="" className="cursor-pointer"/>
                </div> 
            </div>

            {/* Hamburger */}
            
                <div className="md:hidden flex items-center gap-5">
                     <div>
                     <Link to="/search">
                        <img 
                        src="/images/Search.svg" 
                        alt="search" 
                        className="cursor-pointer"
                        />
                    </Link>
                </div>
                    <img src="/images/profile.svg" alt="search" className="h-6" onClick={handleClick}/>
                </div> 
            
          
            </div>
            {isProfileOpen && <ProfileDropdown />}
    </header>
    </>
    )       
}
export default Navbar

