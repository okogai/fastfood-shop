import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomerInfo, IDishFromDB, IOrder, IOrderFromDB } from '../../types';
import { deleteOrder, fetchAllOrders, placeOrder } from '../thunks/ordersThunks';

interface orderState {
  orders: IOrderFromDB[];
  currentOrder: IOrder;
  customer: CustomerInfo;
  delivery: number;
  totalPrice: number;
  fetchOrders: boolean;
  addOrder: boolean;
  isDeletingOrder: boolean;
  error: boolean;
}

const initialState: orderState = {
  orders: [],
  currentOrder: {},
  customer: {
    name: '',
    phone: '',
    address: '',
  },
  delivery: 150,
  totalPrice: 0,
  fetchOrders: false,
  addOrder: false,
  isDeletingOrder : false,
  error: false,
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    updateDishInOrder(state, action: PayloadAction<{ dishId: string; amount: number }>) {
      const { dishId, amount } = action.payload;

      if (amount === 0) {
        delete state.currentOrder[dishId];
      } else {
        const currentAmount = state.currentOrder[dishId] || 0;
        const newAmount = currentAmount + amount;

        if (newAmount <= 0) {
          delete state.currentOrder[dishId];
        } else {
          state.currentOrder[dishId] = newAmount;
        }
      }
    },
    calculateTotalPrice(state, action: PayloadAction<IDishFromDB[]>) {
      state.totalPrice =
        Object.entries(state.currentOrder).reduce((total, [dishId, amount]) => {
          const dish = action.payload.find((dish) => dish.id === dishId);
          return dish ? total + dish.price * amount : total;
        }, 0) + state.delivery;
    },

    clearCurrentOrder(state) {
      state.currentOrder = {};
      state.customer = { name: '', phone: '', address: '' };
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.fetchOrders = true;
        state.error = false;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action: PayloadAction<IOrderFromDB[]>) => {
        state.fetchOrders = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state) => {
        state.fetchOrders = false;
        state.error = true;
      })
      .addCase(placeOrder.pending, (state) => {
        state.addOrder = true;
        state.error = false;
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.addOrder = false;
      })
      .addCase(placeOrder.rejected, (state) => {
        state.addOrder = false;
        state.error = true;
      })
      .addCase(deleteOrder.pending, (state) => {
      state.isDeletingOrder  = true;
      state.error = false;
      })
      .addCase(deleteOrder.fulfilled, (state) => {
        state.isDeletingOrder  = false;
      })
      .addCase(deleteOrder.rejected, (state) => {
        state.isDeletingOrder  = false;
        state.error = true;
      });
  },
});

export const {
  updateDishInOrder,
  calculateTotalPrice,
  clearCurrentOrder,
} = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
