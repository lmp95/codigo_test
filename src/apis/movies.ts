import { apiWithTag } from '.';
import { MovieDetail, MoviesApiResponse } from '../types/movie';
import {
  API_TAG_MOVIE_DETAIL,
  API_TAG_POPULAR_MOVIES,
  API_TAG_UPCOMING_MOVIES,
} from './apiTags';

export const moviesApi = apiWithTag.injectEndpoints({
  endpoints: builder => ({
    getUpcomingMovies: builder.infiniteQuery<
      MoviesApiResponse,
      { language: string },
      number
    >({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: lastPage => {
          if (lastPage.page < lastPage.total_pages) {
            return lastPage.page + 1;
          }
          return undefined;
        },
      },
      query: ({ queryArg, pageParam }) => {
        return {
          url: `movie/upcoming?language=${queryArg.language}&page=${pageParam}`,
          method: 'GET',
        };
      },
      providesTags: [API_TAG_UPCOMING_MOVIES],
    }),
    getPopularMovies: builder.infiniteQuery<
      MoviesApiResponse,
      { language: string },
      number
    >({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: lastPage => {
          if (lastPage.page < lastPage.total_pages) {
            return lastPage.page + 1;
          }
          return undefined;
        },
      },
      query: ({ queryArg, pageParam }) => {
        return {
          url: `movie/popular?language=${queryArg.language}&page=${pageParam}`,
          method: 'GET',
        };
      },
      providesTags: [API_TAG_POPULAR_MOVIES],
    }),
    getMovieDetail: builder.query<
      MovieDetail,
      { movieId: string; language: string }
    >({
      query: ({ movieId, language }) => {
        return {
          url: `movie/${movieId}?language=${language}`,
          method: 'GET',
        };
      },
      providesTags: [API_TAG_MOVIE_DETAIL],
    }),
  }),
});

export const {
  useGetUpcomingMoviesInfiniteQuery,
  useGetPopularMoviesInfiniteQuery,
  useGetMovieDetailQuery,
} = moviesApi;
