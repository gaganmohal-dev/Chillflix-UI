import { useState } from "react";
import Cards from "../Movie/Cards";
import SkelotonMoreResults from "../../Loaders/SkelotonMoreResults";


function MoreResults({moreResults,loading}) {
  return (
    <>
    <div className="w-full flex justify-center text-white">
      <div className="w-full md:w-[80%] p-4">


    {loading ? 
        <SkelotonMoreResults />
    :(
    <div>
        <h1 className="text-2xl font-semibold text-white pt-6">MORE RESULTS</h1>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
          {moreResults.map((movie) => (
            <Cards key={movie.id} id={movie.id} movie={movie} variant="portrait" />
          ))}
        </div>
      </div> 
      ) 
      
      }

      </div>
    </div>
 </>
)

}

export default MoreResults;