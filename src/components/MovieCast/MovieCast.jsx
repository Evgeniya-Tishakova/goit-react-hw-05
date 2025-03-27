import { useParams } from "react-router";
import css from "./MovieCast.module.css";
import { useState, useEffect } from "react";
import { getCast } from "../../userService";
import { ClipLoader } from "react-spinners";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const getCasts = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getCast(movieId);
        console.log("cast", data);
        setCast(data.cast);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getCasts();
  }, [movieId]);

  return (
    <div className={css.container}>
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
      {cast.length > 0 && (
        <ul className={css.list}>
          {cast.map((c) => (
            <li className={css.item} key={c.id}>
              <img
                width={100}
                src={"https://image.tmdb.org/t/p/w500" + c.profile_path}
                alt={c.name}
              />
              <p className={css.text}>{c.name}</p>
              <p className={css.text}>Character: {c.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
