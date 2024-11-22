import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../utils/axiosAPI.ts';
import { IDish } from '../../types';

export const fetchAllDishes = createAsyncThunk<IDish[], void>(
  'dishes/fetchAllDishes',
  async () => {
    const response = await axiosAPI('dishes.json');
    if (response.data) {
      return response.data;
    }
  }
);

export const getOneDishFromDB = createAsyncThunk<IDish, string>(
  'dishes/fetchAllDishes',
  async (id: string) => {
    const response = await axiosAPI(`dishes/${id}`);
    if (response.data) {
      return response.data;
    }
  }
);

export const addNewDish = createAsyncThunk<void, IDish>(
  'dishes/addNewDish',
  async (dish: IDish) => {
    await axiosAPI.post('dishes', dish);
  }
);

export const editDish = createAsyncThunk<void, IDish>(
  'dishes/addNewDish',
  async (dish: IDish) => {
    await axiosAPI.put('dishes', dish);
  }
);

export const deleteDish = createAsyncThunk<void, string>(
  'dishes/addNewDish',
  async (id: string) => {
    await axiosAPI.delete(`dishes/${id}`);
  }
);

