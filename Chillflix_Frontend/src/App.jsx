import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App(){
    const navigate = useNavigate();

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