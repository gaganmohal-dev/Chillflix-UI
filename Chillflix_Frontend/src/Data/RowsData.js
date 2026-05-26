 const movieCategories = [
    {
        key: "upcoming",
        name: "Upcoming Movies",
        endpoint: "/movie/upcoming"
    },
    {
        key: "topRated",
        name: "Top Rated Movies",
        endpoint: "/movie/top_rated"
    },
    {
        key: "popular",
        name: "Popular Movies",
        endpoint: "/movie/popular"
    },
    {
        key: "Newly Added",
        name: "Newly Added",
        endpoint: "/movie/now_playing"
    },
    { key: "comedy", 
        name: "Comedy Movies", 
        endpoint: "/discover/movie?with_genres=35" 
    },
    {   key: "highRated", 
        name: "Top Voted", 
        endpoint: "/discover/movie?sort_by=vote_average.desc&vote_count.gte=1000" 
    },
    {   key: "action", 
        name: "Action Movies", 
        endpoint: "/discover/movie?with_genres=28" 
    },
];

export default movieCategories