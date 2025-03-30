import { useEffect, useState } from "react";
import css from "./MoviesPage.module.css";
import { ClipLoader } from "react-spinners";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../userService";
import { Formik, Form, Field } from "formik";

export default function MoviesPage({ movie }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const updateSearchParams = ({ query }) => {
    if (query !== "") {
      searchParams.set("query", query);
    } else {
      searchParams.delete("query");
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await searchMovies(query);
        setMovies(data.results);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, [query]);

  const handleSubmit = ({ query }) => {
    updateSearchParams({ query });
  };

  return (
    <div className={css.container}>
      <Formik
        initialValues={{ query: "" }}
        handleChange
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Field className={css.field} type="text" name="query" />
            <button className={css.button} type="submit">
              Search
            </button>
          </Form>
        )}
      </Formik>

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
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
