import { configureStore } from "@reduxjs/toolkit";
import { dishReducer } from '../store/slices/dishSlice.ts';
import { orderReducer } from '../store/slices/orderSlice.ts';

export const store = configureStore({
  reducer: {
    dishes: dishReducer,
    orders: orderReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
