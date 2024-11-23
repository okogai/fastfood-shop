import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../utils/axiosAPI.ts';
import { IOrderFromDB } from '../../types';

export const fetchAllOrders = createAsyncThunk<IOrderFromDB[], void>(
  'orders/fetchAllOrders',
  async () => {
    const response = await axiosAPI('orders.json');
    if (response.data) {
      const ordersArray: IOrderFromDB[] = Object.keys(response.data).map((key) => ({
        id: key,
        ...response.data[key],
      }));

      return ordersArray;
    } else {
      return [];
    }
  }
);

export const placeOrder = createAsyncThunk<void, IOrderFromDB>(
  'orders/placeOrder',
  async (order: IOrderFromDB) => {
    await axiosAPI.post('orders.json', order);
  }
);
