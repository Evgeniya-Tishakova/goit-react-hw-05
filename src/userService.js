import axios from "axios";

const options = {
  headers: {
    // Замість api_read_access_token вставте свій токен
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGZmNDUxMDZmNzBjNzBiZjM2MjE2OTRlMzAyMDQxNSIsIm5iZiI6MTc0MjI0Njg5Mi44OTIsInN1YiI6IjY3ZDg5M2VjNTk1ZjAzZmZhZTE1MGVhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.95o7774aI85KgTXgrBE312XU7tsmdS04AXZP80BrNCs",
  },
};

export const fetchMovies = async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/discover/movie",
    {
      ...options,
      params: {
        key: "9dff45106f70c70bf3621694e3020415",
        include_adult: false,
        language: "en-US",
        page: 1,
      },
    }
  );

  console.log(response.data);
  return response.data;
};

export const searchMovies = async (query) => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/search/movie",
    {
      ...options,
      params: {
        key: "9dff45106f70c70bf3621694e3020415",
        include_adult: false,
        language: "en-US",
        page: 1,
        query,
      },
    }
  );

  return response.data;
};

export const fetchMovie = async (id) => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
    ...options,
    params: {
      key: "9dff45106f70c70bf3621694e3020415",
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });

  console.log(response.data);
  return response.data;
};

export const getGenres = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list`,
    {
      ...options,
    }
  );

  console.log(response.data.genres);
  return response.data.genres;
};

export const getCast = async (movie_id) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}/credits`,
    {
      ...options,
    }
  );
  console.log(response.data);
  return response.data;
};

export const getReview = async (movie_id) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}/reviews`,
    {
      ...options,
    }
  );
  console.log(response.data);
  return response.data;
};
