import React from "react";
import TopResults from "./TopResults";
import MoreResults from "./MoreResults";

function Results({topResults, moreResults, loading, query}) {

    if (!loading && topResults.length === 0 && moreResults.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-white mt-20 gap-3">
        <p className="text-5xl">🎬</p>
        <h2 className="text-2xl font-semibold">No results found</h2>
        <p className="text-gray-400 text-sm">
          No movies found for <span className="text-white">"{query}"</span> — try a different title
        </p>
      </div>
    )
  }
  return (
    
        <div>
            
             <TopResults topResults={topResults} loading={loading} />
            <MoreResults moreResults={moreResults} loading={loading}/> 
        </div>
    
  );
}

export default Results;