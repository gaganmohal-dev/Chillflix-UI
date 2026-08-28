import {Home, Tv, Film, Bell, Bookmark,Settings,LogOut, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function SideBar({isSidebarOpen}){
    const navigate = useNavigate()
    
    const MainMenu = [
        {name: "Home", icon: Home, path: '/'},
        {name: "Movies", icon: Film, path: '/movies'},
        {name: "Notifications", icon: Bell },
        {name: "My List", icon: Bookmark , path: '/my-list' },
        {name: "Gifts", icon: Gift },
    ]
    const BottomMenu = [
        {name: "Logout", icon: LogOut},
    ];

     const handleLogout = () => {
       

        setTimeout(() => {
            localStorage.clear();
            navigate("/", { replace: true });
        }, 500);
    };

    return(
        <>
            {isSidebarOpen && <div className="fixed top-0 left-0 h-screen w-[50%] bg-netflix-gray z-101">
                <div className="h-full flex flex-col justify-between text-netflix-light-gray">
                <div className="flex  items-center gap-4  p-4">
                    <img src="/images/profile.svg" alt="" className="h-9 cursor-pointer"/>
                    <div className="leading-none">
                        <h1 className="text-lg font-semibold text-white">Gagan</h1>
                        <p className="text-sm">switch Profiles</p>
                    </div>
                </div>

                <div>
                    {MainMenu.map((item, index) => {
                        
                         const Icon = item.icon
                         
                         return(
                          
                                <div key={index} className="hover:bg-gray-300  p-6">
                                    {item.path ? (
                                        <Link to={item.path} className="flex gap-5 items-center">
                                        <Icon size={25} />
                                        <span className="text-xl">{item.name}</span>
                                        </Link>
                                    ) : (
                                        <div className="flex gap-5 items-center cursor-pointer">
                                        <Icon size={25} />
                                        <span className="text-xl">{item.name}</span>
                                        </div>
                                    )}
                                </div>
                            
                         )
                    })}
                </div>

                <div className="border-t border-gray-300 py-2 mb-20">
                   {
                    BottomMenu.map((item , index) => {
                        const Icon = item.icon;
                            return(
                                <>
                                    <div key={index} className="flex gap-5 text-xl px-4 py-2 cursor-pointer "   onClick={handleLogout}>
                                        <Icon size={26}></Icon>
                                        <span className="">{item.name}</span>
                                    </div>
                                </>
                            )
                    })
                   }
                </div>
            </div>
            </div>
    }
        </>
    )
}
export default SideBar