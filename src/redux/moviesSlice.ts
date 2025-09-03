import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

type MoviesState = {
  liked_movies: number[];
};

const initialState: MoviesState = {
  liked_movies: [],
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    toggleLikedMovie: (state, action: PayloadAction<number>) => {
      const movieId = action.payload;
      const exists = state.liked_movies.includes(movieId);

      if (exists) {
        state.liked_movies = state.liked_movies.filter(id => id !== movieId);
      } else {
        state.liked_movies.push(movieId);
      }
    },
  },
});

export const { toggleLikedMovie } = moviesSlice.actions;
export const moviesReducer = moviesSlice.reducer;

export const useLikedMoviesSelector = () =>
  useSelector((state: { movies: MoviesState }) => state.movies.liked_movies);
