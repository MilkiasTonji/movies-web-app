"use client";
import { data } from "@/utils/data";
import MovieCard from "./MovieCard";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { useRouter } from 'next/navigation';


const MovieList = () => {
    const router = useRouter()
  const addNewMovie = (): void => {
    console.log("Adding new movie");
    router.push("/add-movie");

  };
  return (
    <div className="flex flex-col items-center p-12">


      {data && data.length == 0 && (
        <div>
          <h1 className="text-white text-h2 my-5">Your movie list is empty</h1>
          <button
            type="button"
            className="bg-primary w-44 text-white rounded-md border-none outline-none p-2 text-h6"
            onClick={addNewMovie}
          >
            Add a new movie
          </button>
        </div>
      )}

      {/* headaers */}
      <div className="w-full flex items-center justify-between text-white pb-5">
        <div className="flex items-center gap-2 hover:cursor-pointer">
            <h1 className="text-h2">My Movies</h1>
            <IoMdAddCircleOutline className="text-white mt-3 w-6 h-6" onClick={addNewMovie} />
        </div>

        <div className="flex items-center gap-3 hover:cursor-pointer">
            <h1 className="text-regular font-bold">Logout</h1>
            <MdLogout className="text-white w-4 h-4" />
        </div>
      </div>


      {/* List of movies */}
      <div className="w-full flex flex-wrap items-center justify-start gap-5">
        {data.map((movie, index) => (
          <MovieCard thumbnail={movie.thumbnail} title={movie.title} year={movie.year} key={index} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
