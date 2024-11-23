import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../utils/axiosAPI.ts';
import { IDish, IDishFromDB } from '../../types';

export const fetchAllDishes = createAsyncThunk<IDishFromDB[], void>(
  'dishes/fetchAllDishes',
  async () => {
    const response = await axiosAPI('dishes.json');
    if (response.data) {
      const dishesArray: IDishFromDB[] = Object.keys(response.data).map((key) => ({
        id: key,
        ...response.data[key],
      }));

      return dishesArray;
    } else {
      return [];
    }
  }
);

export const getOneDishFromDB = createAsyncThunk<IDishFromDB, string>(
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

export const editDish = createAsyncThunk<void, IDishFromDB>(
  'dishes/editDish',
  async (dish: IDishFromDB) => {
    await axiosAPI.put(`dishes/${dish.id}.json`, dish);
  }
);

export const deleteDish = createAsyncThunk<void, string>(
  'dishes/deleteDish',
  async (id: string, thunkAPI) => {
    await axiosAPI.delete(`dishes/${id}.json`);
    thunkAPI.dispatch(fetchAllDishes());
  }
);

