
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SpinningLoader from "../Loaders/SpinningLoader";
function WatchScreen() {
    const {id} = useParams();
    const apiKey = import.meta.env.VITE_TMDB_KEY;
   const [videoLoading, setVideoLoading] = useState(true);
    // state for getting key out of videos links for youtube 
    const [key, setKey] = useState("");

    useEffect(() => {
        const fetchTrailor = async function(){
            try{
                  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`)
                  const data = await res.json()  

                  console.log(data.results)
                
                  const trailer =
                data.results.find(
                    v =>
                        v.type === "Trailer" &&
                        v.site === "YouTube"
                ) ||

                data.results.find(
                    v =>
                        v.type === "Teaser" &&
                        v.site === "YouTube"
                ) ||

                data.results.find(
                    v =>
                        v.type === "Featurette" &&
                        v.site === "YouTube"
                ) ||

                data.results[0];

            // SAVE KEY
            if (trailer) {
                setKey(trailer.key);
            }

            }catch(err){
                console.log(err)
            }
        }

        fetchTrailor();
    }, [id])



  return (
    
    <div className="w-screen h-screen bg-black overflow-hidden">
    
     { videoLoading && <SpinningLoader /> }
      
      {key && (
        <div className="w-full h-[90%] flex items-center">
          <iframe
             className="
              w-full 
              h-full
              md:h-full
            "
            src={`https://www.youtube.com/embed/${key}?autoplay=1`}
            title="Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
            onLoad={() => setVideoLoading(false)}
          />
        </div>
        )
      }
      </div>
    
    
  );
}

export default WatchScreen;