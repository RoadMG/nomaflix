const API_KEY = "eb0a26c59b2f18bacbbff661f79a5ea0";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  id: number;
  vote_average: number;
}

export interface IGetMoviesResult {
  datas: {
    maximun: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetMoiveDetail {
  adult: boolean;
  budget: number;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  homepage: string;
  id: number;
  popularity: number;
  production_companies: [];
  production_countries: [
    {
      iso_3166_1: string;
      name: string;
    }
  ];
  release_date: string;
  runtime: number;
  video: false;
  vote_average: number;
  vote_count: number;
}

export interface IGetMovieCredit {
  id: number;
  cast: [
    {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      cast_id: number;
      character: string;
      credit_id: string;
      order: number;
    }
  ];
}

export interface IGetMovieSimilar {
  results: [
    {
      adult: boolean;
      backdrop_path: string;
      id: number;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string;
      release_date: string;
      title: string;
      video: false;
      vote_average: number;
      vote_count: number;
    }
  ];
}

export function getMovies(current: string) {
  return fetch(`${BASE_PATH}/movie/${current}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export async function getMovieDetail(movieId: string | undefined) {
  return await fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getMovieCredit(movieId: string | undefined) {
  return fetch(`${BASE_PATH}/movie/${movieId}/credits?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getMovieSimilar(movieId: string | undefined) {
  return fetch(`${BASE_PATH}/movie/${movieId}/similar?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

/////////////////////////////Movie API///////////////////////////////////

export interface IGetTvResult {
  page: number;
  results: [
    {
      poster_path: string;
      popularity: number;
      id: number;
      backdrop_path: string;
      vote_average: number;
      overview: string;
      first_air_date: string;
      origin_country: [string];
      genre_ids: [number];
      original_language: string;
      vote_count: number;
      name: string;
      original_name: string;
    }
  ];
}

export interface IGetTvDetail {
  backdrop_path: string;
  created_by: [
    {
      id: number;
      credit_id: string;
      name: string;
      gender: number;
      profile_path: string;
    }
  ];
  episode_run_time: number;
  first_air_date: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: [string];
  last_air_date: string;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };
  name: string;
  networks: [
    {
      name: string;
      id: number;
      logo_path: string;
      origin_country: string;
    }
  ];
  next_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: [string];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [
    {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }
  ];
  production_countries: [
    {
      iso_3166_1: string;
      name: string;
    }
  ];
  seasons: [
    {
      air_date: string;
      episode_count: number;
      id: number;
      name: string;
      overview: string;
      poster_path: string;
      season_number: number;
    }
  ];
  spoken_languages: [
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    }
  ];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface IGetTvCredit {
  cast: [
    {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      character: string;
      credit_id: string;
      order: number;
    }
  ];
  crew: [
    {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: null;
      credit_id: string;
      department: string;
      job: string;
    }
  ];
  id: number;
}

export interface IGetTvSimilar {
  page: number;
  results: [
    {
      backdrop_path: string;
      first_air_date: string;
      genre_ids: [number];
      id: number;
      original_language: string;
      original_name: string;
      overview: string;
      origin_country: [string];
      poster_path: string;
      popularity: number;
      name: string;
      vote_average: number;
      vote_count: number;
    }
  ];
  total_pages: number;
  total_results: number;
}

export function getTv(current: string) {
  return fetch(`${BASE_PATH}/tv/${current}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getTvDetail(tvId: string | undefined) {
  return fetch(`${BASE_PATH}/tv/${tvId}?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}

export function getTvCredit(tvId: string | undefined) {
  return fetch(`${BASE_PATH}/tv/${tvId}/credits?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getTvSimilar(tvId: string | undefined) {
  return fetch(`${BASE_PATH}/tv/${tvId}/similar?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

/////////////////////////////TV API///////////////////////////////////

export interface IGetMovieSearch {
  page: number;
  results: [
    {
      poster_path: string;
      adult: boolean;
      overview: string;

      release_date: string;
      genre_ids: [number];
      id: number;
      original_title: string;
      original_language: string;
      title: string;
      backdrop_path: string;
      popularity: number;
      vote_count: number;
      video: boolean;
      vote_average: number;
    }
  ];
}

export interface IGetTVSearch {
  page: number;
  results: [
    {
      poster_path: string;
      popularity: number;
      id: number;
      backdrop_path: string;
      vote_average: number;
      overview: string;
      first_air_date: string;
      origin_country: [string];
      genre_ids: [number];
      original_language: string;
      vote_count: number;
      name: string;
      original_name: string;
    }
  ];
  total_results: number;
  total_pages: number;
}

export function getMovieSearch(query: string | null) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`
  ).then((response) => response.json());
}

export function getTVSearch(query: string | null) {
  return fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&language=en-US&query=${query}`
  ).then((response) => response.json());
}
