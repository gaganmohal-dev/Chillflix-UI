import React from "react";
import { useState, useEffect, useContext } from "react";
import { watchListContext } from "../Contexts/watchListContext";
import Cards from "../Components/Movie/Cards";
import SkeletonCardLoader from "../Loaders/SkelotonCardLoader";

function MyList() {
    const { watchList } = useContext(watchListContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* Page heading */}
            <div className="flex justify-center p-5">
                <h1 className="text-white text-[clamp(1.5rem,5vw,3rem)]">
                    WatchList
                </h1>
            </div>

            {/* Loading state */}
            {loading ? (
                <div className="flex justify-center">
                    <div className="grid gap-3 p-5 w-[90%] text-white grid-cols-[repeat(auto-fill,minmax(160px,1fr))] justify-items-center">
                        {Array.from({ length: 14 }).map((_, index) => (
                            <SkeletonCardLoader key={index} />
                        ))}
                    </div>
                </div>
            ) : watchList.length === 0 ? (
                /* Empty watchlist */
                <div className="flex flex-col items-center justify-center text-center py-24 px-6">
                    <div className="w-20 h-20 rounded-full bg-neutral-800/60 border border-neutral-700 flex items-center justify-center mb-6">
                        <span className="text-3xl">🔖</span>
                    </div>

                    <h2 className="text-white text-xl font-semibold mb-2">
                        Your watchlist is empty
                    </h2>

                    <p className="text-neutral-400 text-sm max-w-sm mb-8">
                        Save movies you want to watch later — they'll show up right here.
                    </p>

                    <a
                        href="/"
                        className="px-6 py-2.5 rounded-md bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors"
                    >
                        Browse Movies
                    </a>
                </div>
            ) : (
                /* Watchlist movies */
                <div className="flex justify-center">
                    <div className="grid gap-3 p-5 w-[90%] text-white grid-cols-[repeat(auto-fill,minmax(160px,1fr))] justify-items-center">
                        {watchList.map((movie) => (
                            <Cards
                                key={movie.id}
                                id={movie.id}
                                movie={movie}
                                className="w-full"
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default MyList