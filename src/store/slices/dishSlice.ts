import { IDish } from '../../types';
import { createSlice } from '@reduxjs/toolkit';

interface dishState {
  dishes: IDish[];
}

const initialState: dishState = {
  dishes: [],
};

export const dishSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
});

export const dishReducer = dishSlice.reducer;