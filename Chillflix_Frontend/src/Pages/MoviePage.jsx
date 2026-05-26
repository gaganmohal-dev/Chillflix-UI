import React from "react";
import { useEffect, useState, useContext, } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import Row from "../Components/Movie/Row";
import { watchListContext } from "../Contexts/watchListContext";
import CheckIcon from '@mui/icons-material/Check';
import SpinningLoader from "../Loaders/SpinningLoader";

function MoviePage(){
    const apiKey = import.meta.env.VITE_TMDB_KEY;
    const [movie,setMovie] = useState(null)
    const [recommendedMovies, setRecommendedMovies] = useState([])
    const { id } = useParams()
    const navigate = useNavigate();
    // For LAZY LOADING
    const [loading , setLoading] = useState(true)
    const [hiResLoaded, setHiResLoaded] = useState(false)  
    

    useEffect(() => {
        setLoading(true)
        setHiResLoaded(false)
    const fetchMovie = async () => {

        const start = Date.now()

        try {

            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
            )

            const data = await response.json()

            setMovie(data)

        } catch (err) {

            console.log(err)

        } finally {

            const elapsed = Date.now() - start
            const minimumTime = 500

            if (elapsed < minimumTime) {

                await new Promise((resolve) =>
                    setTimeout(resolve, minimumTime - elapsed)
                )
            }

            setLoading(false)
        }
    }

    fetchMovie()

}, [id])

    useEffect(() => {
           try{
                fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}`).then(res => res.json())
                .then(data => setRecommendedMovies(data.results))
           }catch(err){
                console.log(err)
           } 
    }, [id])
            console.log(recommendedMovies)
   
            let releaseDate = movie?.release_date?.slice(0,4)
            let timeOfMovie = movie ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`: ""

        const [expanded, setExpand] = useState(false)
        
        
        // setting up the watchlist variables
         const {watchList, setWatchList}= useContext(watchListContext)
         const isInWatchlist = watchList?.some(item => item.id === movie?.id);
        

         const AddtoWatchList = (e) => {
            
            e.stopPropagation();        
            if(isInWatchlist){
                // Removing
                setWatchList(prev => prev.filter(item => item.id !== movie.id))
            }else{
                setWatchList(prev => [...prev , movie])
            }
                        
         }

  
    return(
        <>
            {
            loading ? (
                <SpinningLoader/>
            ) : (
            movie && (
                <>
                {console.log(movie)}

                <div className=" hidden md:block relative  w-full h-screen text-white">
                   {/* <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}  alt="Poster" className="w-full h-full"/>  */}
                  <img
                        src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
                        alt="Poster"
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[500ms] ease-out
                        ${hiResLoaded ? 'scale-100' : 'scale-80'}
                        `}
                        style={{ filter: hiResLoaded ? 'blur(0px)' : 'blur(8px)' }}
                    />

                   {/* HIGH quality — fades in once loaded, on top */}
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt="Poster"
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[600ms] ease-in
                        ${hiResLoaded ? 'opacity-100' : 'opacity-0'}
                        `}
                        onLoad={() => setHiResLoaded(true)}
                    />
                   <div className="absolute inset-0 bg-linear-to-r 
                            from-black 
                            via-black/40 
                            to-transparent" />
                       <div className="absolute inset-0 
                        bg-linear-to-t 
                        from-black from-0% 
                        via-black/40 via-10% 
                        to-transparent to-20%" />
                </div>

                    {/* For Mobile */}
                <div className=" flex justify-center  md:hidden w-full h-[57vh] text-white">
                   <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}  alt="Poster" className="w-[95%] h-full rounded-4xl object-cover"/> 
                </div>

               
                </>
            ))
         }
        

    {/* For Mobile Layout only coz the structure is gonna be different too */}
        {movie && 
         <div className=" md:hidden   mt-5 w-full text-lg font-semibold flex flex-col items-center ">
            
                <div className=" w-full h-auto text-sm text-netflix-light-gray flex justify-center gap-2"> 
                    
                    <span>{releaseDate} </span>    
                    <span>•</span>
                    <span>{timeOfMovie}</span>    
                    <span>•</span>
                    <span>Imdb {movie.vote_average.toFixed(1)} </span>    
                    <span>•</span>
                    <span>{movie.original_language}</span>    
                </div>
            <button className="w-[95%] rounded-2xl p-1.5 mt-2 bg-white"
            onClick={() => {navigate(`/Watch/${movie.id}`)}}
            >Watch Now</button>

            <div className="mt-3 w-full h-auto text-lg text-white flex justify-center gap-3">
                {movie && 
                    movie.genres.map((genre,index) => (
                     <React.Fragment key={genre.id}>
                        <span>{genre.name}</span>
                        <span>{index !== movie.genres.length - 1 && " | "}</span>
                    </React.Fragment>
                    ))
                }
            </div>    

            <div className="w-full h-auto  flex justify-center text-netflix-light-gray  p-2 leading-none">
                <span className="text-justify text-base leading-none" onClick={() => {setExpand(!expanded)}}>
                    {expanded ? (
                        <>
                        {movie.overview}   
                        <span className="text-white cursor-pointer  ">Show Less</span>
                        </>
                    )
                         : ( 
                         <>
                         {movie.overview.slice(0,100) + "..."} 
                            <span className="text-white cursor-pointer">"Read More"</span>
                         </>
                        )}
                </span>
                
            </div>

            <div className="mt-3 pl-2 w-full h-full text-white flex gap-3 ">
                
                    <button className=" w-16 cursor-pointer p-1.5 flex flex-col items-center"
                        onClick={AddtoWatchList}
                    >
                          {isInWatchlist ? <CheckIcon fontSize="medium"/> : <AddIcon fontSize="medium"/>}
                        <p className="text-sm text-netflix-light-gray wrap-break-word">{isInWatchlist ? "Added": "watchlist"}</p>
                         
                    </button>
                      
               
                <button  className="w-16 p-1.5  cursor-pointer flex flex-col items-center ">
                 <FavoriteBorderOutlinedIcon fontSize="medium"  />
                 <p className="text-sm text-netflix-light-gray">Rate</p>
                </button>   
            </div>              
         </div>
        }

    {/* for Md-lg screens */}

        

    {movie && 
       <div
            className={`p-5 absolute top-[50%] hidden md:block w-[50%] h-[50%]
            transition-all duration-[500ms] ease-out    
            ${
                hiResLoaded
                ? 'opacity-100 blur-0 translate-y-[-30%]'
                : 'opacity-0 blur-xl translate-y-[-20%]'
            }`}
        >

           {movie && 
            <div className="text-7xl  w-[140%]  line-clamp-2 text-white">
                {movie.original_title}    
            </div>
           }     
       
            <div className="w-full mt-5 text-lg font-semibold flex flex-col gap-4">
            
                <div className=" w-full h-auto text-lg text-white flex  gap-2"> 
                    
                    <span>{releaseDate} </span>    
                    <span>•</span>
                    <span>{timeOfMovie}</span>    
                    <span>•</span>
                    <span>Imdb { movie.vote_average.toFixed(1)} </span>    
                    <span>•</span>
                    <span>{movie.original_language}</span>    
                </div>

                <div className="w-full h-auto   flex justify-center text-netflix-light-gray  leading-none">
                <span className="text-justify text-lg leading-none" onClick={() => {setExpand(!expanded)}}>
                    {expanded ? (
                        <>
                        {movie?.overview}   
                        <span className="text-white cursor-pointer  ">Show Less</span>
                        </>
                    )
                         : ( 
                         <>
                         {movie?.overview.slice(0,200) + "..."} 
                            <span className="text-white cursor-pointer">"Read More"</span>
                         </>
                        )}
                </span>
                </div>

                 <div className="mt-3 w-full h-auto text-lg text-white flex  gap-3">
                {movie && 
                    movie.genres.map((genre,index) => (
                        <>
                          <span>{genre.name}</span> 
                          
                          <span>{index !== movie.genres.length - 1 && " | "}</span> 
                        </>
                    ))
                }
                </div>  

                <div className="flex gap-4">
                     <button className=" w-[60%] rounded-md p-3 mt-5 bg-white text-xl cursor-pointer transition transform hover:scale-102 duration-200 "
                     onClick={() => navigate(`/Watch/${movie.id}`)}>
                     Watch Now</button>    

                   <div className="relative group inline-block"> 
                    <button className=" w-full rounded-md p-3 mt-5 bg-white cursor-pointer transition transform hover:scale-102 duration-200"
                    onClick={AddtoWatchList}
                    >
                      {isInWatchlist ? <CheckIcon fontSize="large"/> : <AddIcon fontSize="large"/>}
                    </button>

                         <span className="absolute bottom-12 left-1/2 -translate-x-1/2 
                                        scale-0 group-hover:scale-100 transition-transform
                                        bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            {isInWatchlist ? "Added to watchlist" : "Add to watchlist"}
                        </span>
                    </div> 
                </div> 
            </div>
        </div>
      }            

        <div className="w-full h-auto mt-3 md:-mt-5 ">
            <Row name={"More Like This"} movies={recommendedMovies}/>
        </div>

        </>
    ) 

}

export default MoviePage