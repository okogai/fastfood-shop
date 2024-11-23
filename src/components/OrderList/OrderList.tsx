import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Typography, CircularProgress, Paper } from '@mui/material';
import { RootState } from '../../app/store';
import { fetchAllOrders, deleteOrder } from '../../store/thunks/ordersThunks';
import { fetchAllDishes } from '../../store/thunks/dishesThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { IDishFromDB, IOrderFromDB } from '../../types';

const OrderList = () => {
  const dispatch = useAppDispatch();
  const { orders, fetchOrders, isDeletingOrder } = useSelector(
    (state: RootState) => state.orders
  );
  const { dishes } = useAppSelector((state: RootState) => state.dishes);

  useEffect(() => {
    dispatch(fetchAllOrders());
    dispatch(fetchAllDishes());
  }, [dispatch]);

  const handleDeleteOrder = (orderId: string | undefined) => {
    if (orderId){
      dispatch(deleteOrder(orderId));
    }
  };

  const calculateOrderTotal = (order: IOrderFromDB, dishes: IDishFromDB[]) => {
    let total = 0;
    Object.entries(order.orders).forEach(([dishId, quantity]) => {
      const dishDetails = dishes.find((dish) => dish.id === dishId);
      if (dishDetails) {
        total += dishDetails.price * quantity;
      }
    });

    return total + order.delivery;
  };

  if (fetchOrders || isDeletingOrder) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (orders.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4">No orders added yet</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box width="90%" maxWidth="800px">
        <Typography variant="h4" align="center" gutterBottom>
          Orders List
        </Typography>
        {orders.map((order: IOrderFromDB) => (
          <Paper
            key={order.id}
            elevation={3}
            sx={{ p: 2, mb: 3, borderRadius: 2 }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box flex="1">
                {Object.entries(order.orders).map(([dishId, quantity]) => {
                  const dishDetails = dishes.find((dish) => dish.id === dishId);

                  return dishDetails ? (
                    <Typography key={dishId}>
                      {dishDetails.title} - x{quantity}
                    </Typography>
                  ) : null;
                })}
                <Typography>Delivery: {order.delivery} KGZ</Typography>
              </Box>

              <Box flex="1" textAlign="center">
                {Object.entries(order.orders).map(([dishId, quantity]) => {
                  const dishDetails = dishes.find((dish) => dish.id === dishId);

                  return dishDetails ? (
                    <Typography key={dishId}>
                      {dishDetails.price * quantity} KGZ
                    </Typography>
                  ) : null;
                })}
              </Box>

              <Box flex="1" textAlign="right">
                <Typography variant="body2" fontWeight="bold" mb={1} fontSize={18}>
                  Total: {calculateOrderTotal(order, dishes)} KGZ
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleDeleteOrder(order.id)}
                >
                  Complete Order
                </Button>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default OrderList;