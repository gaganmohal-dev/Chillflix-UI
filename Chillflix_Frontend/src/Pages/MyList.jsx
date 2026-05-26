import React from "react";
import { useState, useEffect, useContext } from "react";
import { watchListContext } from "../Contexts/watchListContext";
import Cards from "../Components/Movie/Cards";
import SkeletonCardLoader from "../Loaders/SkelotonCardLoader";

function MyList(){
    const {watchList, setWatchList}= useContext(watchListContext)
    const [loading , setLoading]= useState(true)
  
    useEffect(() => {

        // Simulating loading
        setTimeout(() => {
            setLoading(false)
        }, 1500)

    }, [])

    return(
        <>
            <div className="flex justify-center p-5 "> 
                <h1 className="text-white text-[clamp(1.5rem,5vw,3rem)]">WatchList</h1>
            </div>
            <div className="flex justify-center">
            <div className="grid gap-3 p-5 w-[90%] text-white grid-cols-[repeat(auto-fill,minmax(160px,1fr))] justify-items-center">
                 {
                        loading
                        ?
                        Array.from({ length: 14 }).map((_, index) => (
                            <SkeletonCardLoader key={index} />
                        ))

                        :
                        watchList.map((movie) => (
                            <Cards
                                key={movie.id}
                                id={movie.id}
                                movie={movie}
                                className="w-full"
                            />
                        ))
                    }

            </div>
            </div>
        </>
    )   
}

export default MyList