import { CloudCog } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { watchListContext } from "../../Contexts/watchListContext";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { useNavigate } from "react-router-dom";

function MovieBanner(){
   const apiKey = import.meta.env.VITE_TMDB_KEY;
   const [Movies, setMovies] = useState([]); 
   const navigate = useNavigate(); 
   // API FETCHING THE DATA
    useEffect(() => {
        const fetchData = async function(){
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
        const data = await res.json()
        const finalData = data.results.filter(movie => movie.backdrop_path !== null)
        setMovies(finalData)
        }

        fetchData()
    }, []) 

    const [currentIndex , setIndex] = useState(0);

    // Using Timers for Crousel to slide
            useEffect(() => {
                if(Movies.length === 0) return
                const interval = setInterval(() => {
                        setIndex(prevIndex => (prevIndex + 1) % Movies.length)
                    }, 10000)

                    return () => clearInterval(interval);
                
            }, [Movies.length])
      
        //fading the banner on scroll Down
        const [opacity, setOpacity] = useState(1)    
        useEffect(() => {

            const handler  = () => {
                const scrollPosition = window.scrollY;

                const newOpacity = Math.max(1-scrollPosition/400, 0)
                setOpacity(newOpacity);
            }

            window.addEventListener('scroll', handler);

            return () => {window.removeEventListener('scroll', handler)}
            

        }, [])


           
    const handleClick = (event) => {
        if(event.currentTarget.id == "leftClick"){
            setIndex(currentIndex => (currentIndex - 1 + Movies.length) % Movies.length)
        }else{
            setIndex(currentIndex => (currentIndex + 1) % Movies.length)
        }
    }

     const [expanded, setExpand] = useState(false)

    
      // setting up the watchlist variables
        const {watchList, setWatchList}= useContext(watchListContext)
       
    
         const AddtoWatchList = (e, movie) => {
            
            e.stopPropagation();        
            const isInWatchlist = watchList?.some(item => item.id === movie.id);
            if(isInWatchlist){
                // Removing
                setWatchList(prev => prev.filter(item => item.id !== movie.id))
            }else{
                setWatchList(prev => [...prev , movie])
            }
                        
         }
   return(
        <>    
        <div style={{opacity}} className="relative md:h-dvh w-full h-[70vh]   flex justify-center  md:justify-start  ">

               
                {Movies.map((movie,index) => (
                    
                    <div 
                    className={`hidden md:block absolute inset-0 bg-no-repeat cursor-pointer bg-cover  transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                    key={movie.id} 
                    style={{
                        backgroundImage : 
                        `url(
                            https://image.tmdb.org/t/p/original/${movie.backdrop_path}
                            )`}}
                    >
                        <div className="absolute inset-0 bg-linear-to-r 
                            from-black
                            via-black/40 
                            to-transparent
                            cursor-pointer" />
                       <div className="absolute inset-0 
                        bg-linear-to-t 
                        from-black from-0% 
                        via-black/40 via-10% 
                        to-transparent to-20%
                        cursor-pointer "/>
                    </div> 
                    
                ))}

             {/* For Mobile Layout */}
        
            {Movies.map((movie,index) => {
                const isInWatchlist = watchList?.some(item => item.id === movie.id);

                return(
                  <div 
                    className={`md:hidden  absolute top-16 w-[95%] h-[60vh] flex items-end justify-end rounded-4xl bg-red-400 bg-no-repeat bg-position-[60%] bg-cover transition-opacity duration-1000 ease-in-out    ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                    key={movie.id} 
                    onClick={() => {navigate(`/Movie/${movie.id}`)}}
                    style={{
                        backgroundImage : 
                        `url(
                            https://image.tmdb.org/t/p/original/${movie.poster_path}
                            )`}}
                     >   
                    <div className="w-full h-1/2 flex flex-col   ">
                    <div className="w-full h-full flex justify-between items-start px-2 ">
                        <button className=" bg-gray-400 opacity-80 rounded-full"
                           id="leftClick"
                           onClick={(e) => {
                            e.stopPropagation();
                            handleClick(e);
                            }}
                        >
                            <NavigateBeforeIcon sx={{ fontSize: 40 }} className="text-white"/>
                        </button>
                        <button className="bg-gray-400 opacity-80 rounded-full"
                            id="rightClick"
                            onClick={(e) => {
                            e.stopPropagation();
                            handleClick(e);
                            }}
                        >
                          <NavigateNextIcon sx={{ fontSize: 40 }} className="text-white"/>
                        </button>
                    </div>
                     <div className=" flex flex-col w-full  items-end gap-3  justify-end"> 
                     <div className="h-15 w-15 rounded-full  mr-4  bg-gray-600/80 flex justify-center items-center " onClick={(e) => AddtoWatchList(e, movie)}>
                        {isInWatchlist ? <CheckIcon fontSize="large" className="text-amber-300"/> : <AddIcon fontSize="large" className="invert"/>}
                     </div>
                     <div className="h-15 w-15 rounded-full bg-netflix-red/75 mb-8 mr-4 flex justify-center items-center bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-100"
                     
                     onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/Watch/${movie.id}`)
                     }}
                     >
                          

                        <PlayArrowOutlinedIcon fontSize="large" className="invert"/>    
                            
                     </div>
                    </div>
                    </div>  
                     
                </div>
            )
            })}
  
       

        {Movies.length > 0 && (   
            <div className="hidden md:flex w-full h-full  justify-between items-center  z-20">
            <div className=" w-2/3 h-full  px-5   flex gap-6 items-center  justify-center " key={Movies[currentIndex].id}>
                <div >
                     <button className=" bg-gray-400 opacity-80 rounded-full cursor-pointer"
                           id="leftClick"
                           onClick={handleClick}
                        >
                            <NavigateBeforeIcon sx={{ fontSize: 50 }} className="text-white"/>
                        </button>
                </div>
                
                <div className="flex flex-col gap-6 w-full">
                <div className="leading-none w-full font-semibold text-[clamp(1.8rem,10vw,4rem)]">    
                    <h1 className="text-white " >{Movies[currentIndex].title}</h1>
                </div>

                <div>
                    <p className="text-white max-w-[70%] text-[clamp(1rem,1vw,2rem)] font-semibold">
                        {/* {Movies[currentIndex].overview} */}
                        <span className="text-justify text-lg " onClick={() => {setExpand(!expanded)}}>
                    {expanded ? (
                        <>
                        {Movies[currentIndex].overview}   
                        <span className="text-white cursor-pointer  ">Show Less</span>
                        </>
                    )
                         : ( 
                         <>
                         {Movies[currentIndex].overview.slice(0,180) + "..."} 
                            <span className="text-white cursor-pointer">"Read More"</span>
                         </>
                        )}
                </span>
                    </p>
                </div>
             
                <div className=" w-full flex  gap-3  ">
                    <button className="py-3 px-10  bg-white text-small font-bold flex gap-2 cursor-pointer items-center"
                    onClick={() => {navigate(`/Watch/${Movies[currentIndex].id}`)}}
                    >
                        <img src="/images/Vector.svg" alt="" className="w-3.5"/>
                        <p>Play</p>
                    </button>
                    <button className="py-3  px-14 font-bold text-small flex gap-2 items-center cursor-pointer bg-white/30">
                        <img src="/images/Detail.svg" alt="" className="w-5" />
                        <p className="text-white">Details</p>
                    </button>
                    </div>
                </div>
                </div>
                
                <div className=" h-2/6 px-5  flex items-center ">
                      <button className=" cursor-pointer bg-gray-400 opacity-80 rounded-full"
                            id="rightClick"
                            onClick={handleClick}

                        >
                          <NavigateNextIcon sx={{ fontSize: 50 }} className="text-white"/>
                        </button>
                </div>
            </div>
          )}
             

             

             </div>   
           
        </>
  )
}

export default MovieBanner;