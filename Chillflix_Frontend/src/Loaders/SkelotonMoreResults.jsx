function SkelotonMoreResults() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full md:w-[80%] p-4">

        <div className="h-7 w-44 rounded-md bg-zinc-800 animate-pulse mt-6 mb-4" />

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="w-full aspect-[2/3] rounded-xl bg-zinc-800 animate-pulse"
            />
          ))}
        </div>

      </div>
    </div>
  )
}

export default SkelotonMoreResults