import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../utils/axiosAPI.ts';
import { IDish } from '../../types';

export const fetchAllDishes = createAsyncThunk<IDish[], void>(
  'dishes/fetchAllDishes',
  async () => {
    const response = await axiosAPI('dishes.json');
    if (response.data) {
      const dishesArray: IDish[] = Object.keys(response.data).map((key) => ({
        id: key,
        ...response.data[key],
      }));

      return dishesArray;
    } else {
      return [];
    }
  }
);

export const getOneDishFromDB = createAsyncThunk<IDish, string>(
  'dishes/getOneDishFromDB',
  async (id: string) => {
    const response = await axiosAPI.get(`dishes/${id}.json`);
    if (response.data) {
      return { id, ...response.data };
    }
  }
);

export const addNewDish = createAsyncThunk<void, IDish>(
  'dishes/addNewDish',
  async (dish: IDish) => {
    await axiosAPI.post('dishes.json', dish);
  }
);

export const editDish = createAsyncThunk<void, IDish>(
  'dishes/editDish',
  async (dish: IDish) => {
    await axiosAPI.put('dishes.json', dish);
  }
);

export const deleteDish = createAsyncThunk<void, string>(
  'dishes/deleteDish',
  async (id: string) => {
    await axiosAPI.delete(`dishes/${id}.json`);
  }
);

