import { useState, useEffect } from "react";
import { CloudCog, Search } from "lucide-react"; // or any icon library
import { useSearchParams } from "react-router-dom";
import Cards from "../Components/Movie/Cards";
import Trending from "../Components/SearchMovies/Trending";
import Results from "../Components/SearchMovies/Results";
import ClearIcon from '@mui/icons-material/Clear';
import SpinningLoader from "../Loaders/SpinningLoader";
function SearchMovie() {
  
  const apiKey = import.meta.env.VITE_TMDB_KEY;
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  // debounce purpose
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [input, setInput] = useState(query);

  // loading state

  const [loading, setLoading] = useState(true)

  useEffect(() => {
      const timer = setTimeout(() => {   // after 500sec
        setDebouncedQuery(input)
      }, 500);

     return () => clearTimeout(timer);

  }, [input])

  // “Whenever the debounced search text changes, update the URL”
  useEffect(() => {
    const cleanQuery = debouncedQuery.trim();
    const currentQuery = searchParams.get("q") || "";

    if (cleanQuery !== currentQuery) {
      if (cleanQuery) {
        setSearchParams({ q: cleanQuery }, { replace: true });
      } else {
        setSearchParams({}, { replace: true });
      }
    }
  }, [debouncedQuery]);


  const [movies, setMovies] = useState([]);
  const [topResults, setTopResults] = useState([]);
  const [moreResults, setMoreResults] = useState([]);
   useEffect(() => {

      if (!debouncedQuery.trim()) {
        setMovies([]);
        setTopResults([]);
        setMoreResults([]);
        return;
      } 

     const fetching = async () => {

      setLoading(true)
      try{
          const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${debouncedQuery}`)

          if(!res.ok){
            throw new Error('Failed to Fetch')
          }

          const data = await res.json()
          console.log(data);
          
          const filteredMovies = data.results.filter(
            movie => movie.backdrop_path 
          );

        // movies with best match for Top Results
           const q = debouncedQuery.toLowerCase();   

          const bestMatch =
            filteredMovies.find((m) => m.title.toLowerCase() === q) ||
            filteredMovies.find((m) =>
              m.title.toLowerCase().startsWith(q)
           ) ||
            filteredMovies.find((m) =>
              m.title.toLowerCase().includes(q)
           ) ||
            filteredMovies[0];

      // 🎯 Step 3: Split
      const remaining = filteredMovies.filter(
        (m) => m.id !== bestMatch?.id
      );

      // 🎯 Step 4: Set state
      
      setTopResults(bestMatch ? [bestMatch] : []);
      setMoreResults(remaining);

      }catch(err){
        console.error(err);
      }

      setLoading(false)
     }

     fetching()
   }, [debouncedQuery]);



  return (
    <>
    {/* {loading && SpinningLoader} */}
    
    <div className="w-full flex flex-col md:items-center  pt-6">
      <div className=" relative  flex justify-center w-full md:w-[80%] max-w-8xl ">
        
        {/* Icon */}
        <Search 
          className="absolute left-5 md:left-3  top-1/2 -translate-y-1/2 
                     text-gray-400 w-7 h-7 " 
        />

        {/* Input */}
        <input
          type="text"
          placeholder="Search movies"
          className="w-[95%] md:w-full h-17  pl-15 pr-4 
                    rounded-md 
                   bg-netflix-gray text-white 
                   placeholder-gray-400 
                    text-2xl
                    outline-none 
                    border border-gray-600 
                    transition-all duration-200"
          value={input}
          onChange={(e) => {
         setInput(e.target.value)
        }}
        />

         {/* Clear Button */}
          {debouncedQuery && (
            <ClearIcon
              fontSize="large"
              className="absolute right-5 md:right-3 top-1/2 -translate-y-1/2 
                        text-gray-400 cursor-pointer hover:text-white transition"
              onClick={() => setInput("")}
            />
          )}
      </div>

  
       {!debouncedQuery && <Trending />}
   </div>

    {debouncedQuery && <Results topResults={topResults} moreResults={moreResults} loading={loading} query={query} />}
    </>
  );

}

export default SearchMovie;