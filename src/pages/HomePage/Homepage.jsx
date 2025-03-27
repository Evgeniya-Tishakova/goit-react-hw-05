import css from "./Homepage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import { useEffect, useState } from "react";
import { fetchMovies } from "../../userService";
import ClipLoader from "react-spinners/ClipLoader";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("yuio");
    async function getMovies() {
      try {
        setIsLoading(true);
        setError(false);
        console.log("yuio");
        const data = await fetchMovies();
        console.log(data);
        setMovies(data.results);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, []);
  return (
    <div className={css.container}>
      <h1 className={css.title}>Trending today</h1>
      <MovieList movies={movies} />
      {isLoading && (
        <ClipLoader
          className={css.loader}
          color="#ff884b"
          loading={true}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      {error && <b>Sorry there was an error...</b>}
    </div>
  );
}
