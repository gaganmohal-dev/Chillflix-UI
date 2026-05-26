import Cards from "../Movie/Cards";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TopResultSkeletonLoader from "../../Loaders/TopResultSkeletonLoader";

function TopResults({topResults, loading}) {
 
  const [runtime, setRuntime] = useState(null)
   const apiKey = import.meta.env.VITE_TMDB_KEY;
    const navigate = useNavigate()
   const topMovie = topResults[0]

  useEffect(() => {
  const fetching = async () => {
    if (!topResults[0]) return
    

    const res = await fetch(`https://api.themoviedb.org/3/movie/${topResults[0].id}?api_key=${apiKey}`)
    const data = await res.json()
    setRuntime(data.runtime)

    //  await new Promise(resolve => setTimeout(resolve, 2000))
   
  }

  fetching()
}, [topMovie?.id])  // refetch when top result changes

  // Convert minutes → "2h 23m"
  const formatRuntime = (mins) => {
    const h = Math.floor(mins / 60)
    const m = mins % 60
    return `${h}h ${m}m`
  }

  return (
    
<div className="w-full flex justify-center">
  <div className="w-full md:w-[80%] p-4">

    {loading ? (
      <TopResultSkeletonLoader />
    ) : (
  <>
    <h1 className="text-2xl font-semibold text-white pt-10">TOP RESULT</h1>

      {topResults.length > 0 && (
        <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-[70%] gap-6 md:gap-8 text-white rounded-xl p-4">

          {/* Image — full width on mobile, fixed width on desktop */}
          <div className="w-full md:w-[400px] md:shrink-0">
            <Cards id={topResults[0].id} movie={topResults[0]} variant="landscape" />
          </div>

          {/* Details — below image on mobile, beside on desktop */}
          <div className="flex flex-col gap-7 w-full">
            <div className="flex flex-col gap-3">
              <h2 className="text-white text-2xl md:text-4xl font-bold">
                {topResults[0].title}
              </h2>

              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-white text-sm">
                <span>{topResults[0].release_date?.split("-")[0]}</span>
                <span>•</span>
                {runtime && (
                  <>
                    <span>{formatRuntime(runtime)}</span>
                    <span>•</span>
                  </>
                )}
                <span>{topResults[0].original_language?.toUpperCase()}</span>
                <span>•</span>
                <span>⭐ {topResults[0].vote_average?.toFixed(1)}</span>
              </div>
            </div>

            <button className="flex items-center justify-center gap-2 bg-white text-black font-semibold px-8 md:px-22 py-4 rounded-[0.5rem] cursor-pointer hover:bg-gray-200 transition w-full md:w-fit"
            onClick={() => {navigate(`/Watch/${topResults[0].id}`)}}
            >
              <PlayArrowIcon />
              Watch Now
            </button>
          </div>

        </div>
      )}
  </>
    )}
  </div>

</div>
  );
}
export default TopResults;