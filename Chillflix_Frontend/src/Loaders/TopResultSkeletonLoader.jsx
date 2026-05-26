function TopResultSkeletonLoader() {
  return (

     <div className="mt-6">
      {/* Heading skeleton — matches your <h1> */}
      <div className=" h-7 w-36 rounded-md bg-neutral-700 animate-pulse " />

      {/* Card skeleton — matches your flex layout */}
      <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-[70%] gap-6 md:gap-8 p-4">

        {/* Image skeleton — matches your Cards landscape */}
        <div className="w-full md:w-[400px] md:shrink-0 aspect-video rounded-xl bg-neutral-700 animate-pulse" />

        {/* Details skeleton */}
        <div className="flex flex-col gap-7 w-full">
          <div className="flex flex-col gap-3">

            {/* Title */}
            <div className="h-9 w-3/4 rounded-md bg-neutral-700 animate-pulse" />

            {/* Meta row — year • runtime • lang • rating */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="h-3 w-10 rounded bg-neutral-700 animate-pulse" />
              <div className="h-3 w-2  rounded bg-neutral-700 animate-pulse" />
              <div className="h-3 w-16 rounded bg-neutral-700 animate-pulse" />
              <div className="h-3 w-2  rounded bg-neutral-700 animate-pulse" />
              <div className="h-3 w-8  rounded bg-neutral-700 animate-pulse" />
              <div className="h-3 w-2  rounded bg-neutral-700 animate-pulse" />
              <div className="h-3 w-12 rounded bg-neutral-700 animate-pulse" />
            </div>
          </div>

          {/* Button skeleton */}
          <div className="h-12 w-40 rounded-[0.5rem] bg-neutral-700 animate-pulse" />
        </div>
      </div>
      </div>
   
  );
}
 


export default TopResultSkeletonLoader;