import css from "./MovieDetailsPage.module.css";
import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchMovie, getGenres } from "../../userService";
import ClipLoader from "react-spinners/ClipLoader";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState({});
  const [error, setError] = useState(false);

  const location = useLocation();
  const goBack = useRef(location.state || "/movies");

  useEffect(() => {
    async function getMovie() {
      try {
        setIsLoading(true);
        setError(false);
        const genres = await getGenres();
        console.log(typeof genres);

        setGenres(() => {
          const genre = {};
          for (let { id, name } of genres) {
            genre[id] = name;
          }
          return genre;
        });
        const data = await fetchMovie(movieId);
        setMovie(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovie();
  }, [movieId]);

  return (
    <div>
      <div className={css.containerLink}>
        <Link className={css.link} to={goBack.current}>
          Go Back
        </Link>
      </div>

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
      {movie && (
        <div className={css.allContainer}>
          <div className={css.containerImage}>
            <img
              src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
              alt={movie.title}
            />
            <div className={css.containerTitle}>
              <h2 className={css.title}>
                {movie.title} {movie.release_date.slice(0, 4)}
              </h2>
              <p className={css.userScore}>
                User Score: {Math.round(movie.vote_average * 10)} %
              </p>
              <h3 className={css.sectionTitle}>Overview</h3>
              <p className={css.textOverview}>{movie.overview}</p>
              <h3 className={css.sectionTitle}>Genres</h3>
              <p className={css.genres}>
                {movie.genres.map((genre) => genres[genre.id]).join(", ")}
              </p>
            </div>
          </div>

          <div className={css.containerInfo}>
            <h3 className={css.sectionTitle}>Additional Information</h3>
            <ul className={css.listInfo}>
              <li className={css.itemInfo}>
                <Link to="cast" className={css.link} state={{ from: location }}>
                  Cast
                </Link>
              </li>
              <li className={css.itemInfo}>
                <Link
                  to="reviews"
                  className={css.link}
                  state={{ from: location }}
                >
                  Reviews
                </Link>
              </li>
            </ul>

            <Suspense fallback={<div>Loading cast or reviews</div>}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}
