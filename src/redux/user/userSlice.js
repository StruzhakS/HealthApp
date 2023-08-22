import { createSlice } from '@reduxjs/toolkit';
import {
  getDefaultWaterAndCalories,
  updateWaterOperations,
} from './userOperations';

const initialState = {
  defaultWater: 0,
  defaultCalories: 0,

  goalFat: 0,
  goalCarbo: 0,
  goalProtein: 0,

  fat: 0,
  carbo: 0,
  protein: 0,

  water: 0,
  calories: 0,

  error: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getDefaultWaterAndCalories.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.defaultWater = payload.defaultWater;
        state.defaultCalories = payload.defaultCalories;

        state.water = payload.water;
        state.calories = payload.calories;

        state.goalFat = payload.goalFat;
        state.goalCarbo = payload.goalCarbo;
        state.goalProtein = payload.goalProtein;

        state.fat = payload.fat;
        state.carbo = payload.carbonohidrates;
        state.protein = payload.protein;
      })
      .addCase(updateWaterOperations.fulfilled, (state, { payload }) => {
        state.water = payload.water;
      })
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, { payload }) => {
          state.error = payload;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        state => {
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.isLoading = true;
        }
      );
  },
});

export const { logout, updateAuthStep, updateAuthUser } = userSlice.actions;
export default userSlice.reducer;
