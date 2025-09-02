import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const initialState = {
  health_concerns: [],
  diets: [],
  is_daily_exposure: null,
  is_smoke: null,
  alcohol: null,
  allergies: [],
};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setHealthConcerns: (state, action) => {
      state.health_concerns = action.payload.health_concerns;
    },
    setDiets: (state, action) => {
      state.diets = action.payload.diets;
    },
    setQuestions: (state, action) => {
      state.is_daily_exposure = action.payload.is_daily_exposure;
      state.is_smoke = action.payload.is_smoke;
      state.alcohol = action.payload.alcohol;
    },
    setAllergies: (state, action) => {
      state.allergies = action.payload.allergies;
    },
    clearSignUp: () => ({ ...initialState }),
  },
});

export const {
  setAllergies,
  setDiets,
  setHealthConcerns,
  setQuestions,
  clearSignUp,
} = signUpSlice.actions;

export const signUpReducer = signUpSlice.reducer;

export const useHealthConcernsSelector = () =>
  useSelector(state => state.signUp.health_concerns);
export const useDietsSelector = () => useSelector(state => state.signUp.diets);
export const useAllergiesSelector = () =>
  useSelector(state => state.signUp.allergies);
export const useQuestionsSelector = () =>
  useSelector(state => ({
    is_daily_exposure: state.signUp.is_daily_exposure,
    is_smoke: state.signUp.is_smoke,
    alcohol: state.signUp.alcohol,
  }));

export const useSignUpSelector = () => useSelector(state => state.signUp);
