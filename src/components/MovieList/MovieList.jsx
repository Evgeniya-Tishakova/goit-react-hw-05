import { Link } from "react-router-dom";
import css from "./MovieList.module.css";
import { useLocation } from "react-router";

export default function MovieList({ movies }) {
  let location = useLocation();

  return (
    <>
      <ul className={css.list}>
        {movies.map((movie) => (
          <li className={css.item} key={movie.id}>
            <Link
              to={`/movies/${movie.id}`}
              state={location}
              className={css.link}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
