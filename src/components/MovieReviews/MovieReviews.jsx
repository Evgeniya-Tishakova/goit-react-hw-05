import { useEffect, useState } from "react";
import css from "./MovieReviews.module.css";
import { getReview } from "../../userService";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function MovieReviews() {
  const [review, setReview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    const getReviews = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getReview(movieId);
        console.log("review", data);
        setReview(data.results);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getReviews();
  }, [movieId]);

  return (
    <>
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
      {review.length > 0 && (
        <ul className={css.list}>
          {review.map((item) => (
            <li key={item.id} className={css.item}>
              <h3 className={css.title}>Author: {item.author}</h3>
              <p className={css.descr}>{item.content}</p>
            </li>
          ))}
        </ul>
      )}
      {review.length === 0 && (
        <p className={css.text}>We don't have any reviews for this movie</p>
      )}
    </>
  );
}
