import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  return (
    <>
      <ul className={css.list}>
        {movies.map((movie) => (
          <li className={css.item} key={movie.id}>
            <Link to={`/movies/${movie.id}`} className={css.link}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
