import { useState, useEffect, useRef } from "react";
import MovieBanner from "../Components/Movie/MovieBanner"
import Row from "../Components/Movie/Row";
import movieCategories from "../Data/RowsData.js"
import SpinningLoader from "../Loaders/SpinningLoader.jsx";
function HomePage(){

    
    const apiKey = import.meta.env.VITE_TMDB_KEY;
    const [movies,setMovies] = useState({})
    const [loading,setLoading] = useState(true)
    // For Optimizing loading (Lazy loading untill not scrolled!)
    const [visibleCount, setVisibleCount] = useState(3);
    const visibleCategories = movieCategories.slice(0, visibleCount);
    const [moviesByCategory, setMoviesByCategory] = useState({});
    
    useEffect(() => {
        // setLoading(true)
        const loadRows = async () => {
           const startTime = Date.now();
             await new Promise(resolve => setTimeout(resolve, 1000));
                const results = await Promise.all(
                visibleCategories.map(cat =>
                    fetch(`https://api.themoviedb.org/3${cat.endpoint}${
                    cat.endpoint.includes("?") ? "&" : "?"
                    }api_key=${apiKey}`)
                )
            );

        const data = await Promise.all(results.map(res => res.json()));

        const formatted = {};
        visibleCategories.forEach((cat, i) => {
        formatted[cat.name] = data[i].results;
    });

        setMoviesByCategory(prev => ({
        ...prev,
        ...formatted
        }));
       
        // setLoading(false);
    };

    loadRows();

    }, [visibleCount]);

const loaderRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
            setVisibleCount(prev => {
                const next = prev + 3;
                return next > movieCategories.length
                ? movieCategories.length
                : next;
            });
            }
    }, {threshold:1});

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => observer.disconnect();
    }, []);
   
    // if (loading && Object.keys(moviesByCategory).length === 0) {
    //     return <SpinningLoader />;
    // }

    return(
        <>
        
        {/*calling Movie banner  */}
        
            <MovieBanner />
      
       
        {/* Rows */}
        <section>
         
             <div>
                {visibleCategories.map(category => (
                <Row
                    key={category.name}
                    title={category.name}
                    movies={moviesByCategory[category.name] || []}
                />
                ))}

               
                <div ref={loaderRef} style={{ height: "50px" }}></div>
            </div>
        </section>
            
        </>
    )
}

export default HomePage;