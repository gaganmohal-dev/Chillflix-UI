import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";


function App(){
    const navigate = useNavigate();
    const { pathname } = useLocation();
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

   useEffect(() => {

  const handleStorageChange = () => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/", { replace: true });
    }
  };

  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };

}, []);

    return(
        <>

        <section>
         <Outlet />
        </section>

        {/*Footer */}
        <footer>
         <Footer />
        </footer>
        </>
    )
}
export default App