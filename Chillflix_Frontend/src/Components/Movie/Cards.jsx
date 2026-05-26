import {useContext, useState } from "react";
import { watchListContext } from "../../Contexts/watchListContext";
import {Link, useNavigate} from "react-router-dom"
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

const variants = {
  portrait: "aspect-[2/3]",
  landscape: "aspect-[16/9.5]",
  square: "aspect-square",
}

function Cards({id, movie, className, variant = "portrait"}){
    const navigate = useNavigate()
    const {watchList, setWatchList} = useContext(watchListContext)
    const isInWatchlist = watchList?.some(item => item.id === movie.id);
    const imagePath = variant === "landscape" ? movie.backdrop_path : movie.poster_path
// 
    return(
        <div 
          className={`relative shrink-0 cursor-pointer group  ${className}`}
          onClick={() => navigate(`/Movie/${movie.id}`)}
        >
            <img
                src={`https://image.tmdb.org/t/p/w500${imagePath}`}
                  className={`w-full ${variants[variant]} object-cover rounded-lg cursor-pointer`}
              
                alt="movieCard"
                loading="lazy"
            />

            {variant !== "landscape" && (
                <div className="absolute inset-0 bg-linear-to-t from-black to-transparent opacity-0 hover:opacity-100 transition duration-300">

                    <div className=" hidden lg:flex absolute bottom-15 right-2 z-35 w-12 h-12 transition delay-200  flex-col gap-2">
                        <div className="w-full h-full group/button relative inline-block">
                            <button 
                              className="w-full h-full bg-gray-400/50 rounded-full cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                if(isInWatchlist){
                                    setWatchList(prev => prev.filter(item => item.id !== movie.id))
                                } else {
                                    setWatchList(prev => [...prev, movie])
                                }
                              }}
                            >
                                {isInWatchlist ? <CheckIcon fontSize="large" /> : <AddIcon fontSize="large"/>}
                            </button>

                            <span className="absolute bottom-12 left-1/2 -translate-x-1/2 
                                            scale-0 group-hover/button:scale-100 transition-transform
                                            bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                {isInWatchlist ? "Added to watchlist" : "Add to watchlist"}
                            </span>
                        </div>

                        <button 
                          className="hidden lg:block w-full h-full bg-red-500/90 rounded-full cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/Watch/${movie.id}`)
                          }}
                        >
                            <PlayArrowOutlinedIcon fontSize="large" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cards;



















