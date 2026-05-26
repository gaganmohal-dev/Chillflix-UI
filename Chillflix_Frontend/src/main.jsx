import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import App from "./App";
import HomePage from "./Pages/Home";
import MoviePage from "./Pages/MoviePage";
import '../src/index.css'
import BasicLayout from "./Components/BasicLayout";
import { watchListContext } from "./Contexts/watchListContext";
import MyList from "./Pages/MyList";
import Movies from "./Pages/Movies";
import SearchMovie from "./Pages/SearchMovie";
import WatchScreen from "./Pages/WatchScreen";
import SignUpSignIn from "./Pages/Auth (Client)/SignUpSignIn";

const router = createBrowserRouter([
  {
  path: "/",
  element: <SignUpSignIn />
  },  
  {
        path: "Home",
        element: <BasicLayout  />,
        children: [
          { index: true, element: <HomePage /> },
          {path:"movies", element: <Movies />}
        ]
  },
  {
    path: "/my-list",
    element: <MyList />
  },
  {
    path: "/Movie/:id",
    element: <App />,
    children: [
      { index: true, element: <MoviePage /> }
    ]
  },
  {
    path:"/search",
    element: <SearchMovie />
  },
  {
    path: "/Watch/:id",
    element: <WatchScreen />
  }

])

function Root() {
   const [watchList, setWatchList] = useState(() => {
    const saved = localStorage.getItem("watchList");
    return saved ? JSON.parse(saved) : [];
  });

    useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

   return(
    <>
      <watchListContext.Provider value={{watchList, setWatchList}} >
            <RouterProvider router={router} />
      </watchListContext.Provider>
    </>  

   )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />)