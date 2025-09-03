import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

type SignUpState = {
  health_concerns: { id: number; name: string; priority?: number }[];
  diets: { id: number; name: string }[];
  is_daily_exposure: boolean | null;
  is_smoke: boolean | null;
  alcohol: boolean | null;
  allergies: { id: number; name: string }[];
};

const initialState: SignUpState = {
  health_concerns: [],
  diets: [],
  is_daily_exposure: null,
  is_smoke: null,
  alcohol: null,
  allergies: [],
};

// Create slice
const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setHealthConcerns: (
      state,
      action: PayloadAction<{
        health_concerns: SignUpState['health_concerns'];
      }>,
    ) => {
      state.health_concerns = action.payload.health_concerns;
    },
    setDiets: (
      state,
      action: PayloadAction<{ diets: SignUpState['diets'] }>,
    ) => {
      state.diets = action.payload.diets;
    },
    setQuestions: (
      state,
      action: PayloadAction<{
        is_daily_exposure: boolean | null;
        is_smoke: boolean | null;
        alcohol: boolean | null;
      }>,
    ) => {
      state.is_daily_exposure = action.payload.is_daily_exposure;
      state.is_smoke = action.payload.is_smoke;
      state.alcohol = action.payload.alcohol;
    },
    setAllergies: (
      state,
      action: PayloadAction<{ allergies: SignUpState['allergies'] }>,
    ) => {
      state.allergies = action.payload.allergies;
    },
    clearSignUp: () => ({ ...initialState }),
  },
});

// Export actions and reducer
export const {
  setAllergies,
  setDiets,
  setHealthConcerns,
  setQuestions,
  clearSignUp,
} = signUpSlice.actions;

export const signUpReducer = signUpSlice.reducer;

// Typed selectors
export const useHealthConcernsSelector = () =>
  useSelector((state: { signUp: SignUpState }) => state.signUp.health_concerns);

export const useDietsSelector = () =>
  useSelector((state: { signUp: SignUpState }) => state.signUp.diets);

export const useAllergiesSelector = () =>
  useSelector((state: { signUp: SignUpState }) => state.signUp.allergies);

export const useQuestionsSelector = () =>
  useSelector((state: { signUp: SignUpState }) => ({
    is_daily_exposure: state.signUp.is_daily_exposure,
    is_smoke: state.signUp.is_smoke,
    alcohol: state.signUp.alcohol,
  }));

export const useSignUpSelector = () =>
  useSelector((state: { signUp: SignUpState }) => state.signUp);
