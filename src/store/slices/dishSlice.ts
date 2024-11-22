import { IDish } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addNewDish, deleteDish, editDish, fetchAllDishes, getOneDishFromDB } from '../thunks/dishesThunks.ts';

interface dishState {
  dishes: IDish[];
  dishToEdit: IDish | null;
  loading: {
    fetchDishes: boolean;
    fetchOneDish: boolean;
    fetchAddDish: boolean;
    fetchDishEdit: boolean;
    fetchDishDelete: boolean;
  };
  error: boolean;
}

const initialState: dishState = {
  dishes: [],
  dishToEdit: null,
  loading: {
    fetchDishes: false,
    fetchOneDish: false,
    fetchAddDish: false,
    fetchDishEdit: false,
    fetchDishDelete: false
  },
  error: false,
};

export const dishSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDishes.pending, (state) => {
        state.loading.fetchDishes = true;
        state.error = false;
      })
      .addCase(fetchAllDishes.fulfilled, (state, action: PayloadAction<IDish[]>) => {
        state.loading.fetchDishes = false;
        state.dishes = action.payload;
      })
      .addCase(fetchAllDishes.rejected, (state) => {
        state.loading.fetchDishes = false;
        state.error = true;
      })
      .addCase(getOneDishFromDB.pending, (state) => {
        state.loading.fetchOneDish = true;
        state.error = false;
      })
      .addCase(getOneDishFromDB.fulfilled, (state, action: PayloadAction<IDish>) => {
        state.loading.fetchOneDish = false;
        state.dishToEdit = action.payload;
      })
      .addCase(getOneDishFromDB.rejected, (state) => {
        state.loading.fetchOneDish = false;
        state.error = true;
      })
      .addCase(addNewDish.pending, (state) => {
        state.loading.fetchAddDish = true;
        state.error = false;
      })
      .addCase(addNewDish.fulfilled, (state) => {
        state.loading.fetchAddDish = false;
      })
      .addCase(addNewDish.rejected, (state) => {
        state.loading.fetchAddDish = false;
        state.error = true;
      })
      .addCase(editDish.pending, (state) => {
        state.loading.fetchDishEdit = true;
        state.error = false;
      })
      .addCase(editDish.fulfilled, (state) => {
        state.loading.fetchDishEdit = false;
      })
      .addCase(editDish.rejected, (state) => {
        state.loading.fetchDishEdit = false;
        state.error = true;
      })
      .addCase(deleteDish.pending, (state) => {
        state.loading.fetchDishDelete = true;
        state.error = false;
      })
      .addCase(deleteDish.fulfilled, (state) => {
        state.loading.fetchDishDelete = false;
      })
      .addCase(deleteDish.rejected, (state) => {
        state.loading.fetchDishDelete = false;
        state.error = true;
      })
  }
});

export const dishReducer = dishSlice.reducer;