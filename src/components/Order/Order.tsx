import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { fetchAllDishes } from '../../store/thunks/dishesThunks';
import { placeOrder } from '../../store/thunks/ordersThunks';
import { useAppDispatch } from '../../app/hooks';
import {
  calculateTotalPrice,
  clearCurrentOrder,
  updateDishInOrder,
} from '../../store/slices/orderSlice';
import {
  Button,
  Modal,
  TextField,
  Typography,
  Box,
  CardMedia,
  IconButton,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomerInfo } from '../../types';

const initialState = {
  name: '',
  phone: '',
  address: '',
};

const Order = () => {
  const dispatch = useAppDispatch();
  const dishes = useSelector((state: RootState) => state.dishes.dishes);
  const currentOrder = useSelector((state: RootState) => state.orders.currentOrder);
  const totalPrice = useSelector((state: RootState) => state.orders.totalPrice);
  const delivery = useSelector((state: RootState) => state.orders.delivery);

  const [showModal, setShowModal] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<CustomerInfo>(initialState);

  useEffect(() => {
    dispatch(fetchAllDishes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(calculateTotalPrice(dishes));
  }, [dispatch, currentOrder, dishes]);

  const handleAddToOrder = (dishId: string) => {
    dispatch(updateDishInOrder({ dishId, amount: 1 }));
  };

  const handleRemoveFromOrder = (dishId: string) => {
    dispatch(updateDishInOrder({ dishId, amount: -1 }));
  };

  const handlePlaceOrder = () => {
    const order = {
      orders: currentOrder,
      customer: customerDetails,
      delivery,
      totalPrice,
    };

    dispatch(placeOrder(order));
    dispatch(clearCurrentOrder());
    setCustomerDetails(initialState);
    setShowModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div>
      <Typography variant="h4" textAlign="center" mb={4}>
        Order Menu
      </Typography>

      <Box display="flex" flexDirection="column" alignItems="center" gap="16px" maxWidth={800} width="100%" mx="auto">
        {dishes.map((dish) => (
          <Box
            key={dish.id}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            maxWidth="800px"
            border="1px solid #ccc"
            borderRadius="8px"
            padding="16px"
            mb="16px"
            onClick={() => handleAddToOrder(dish.id)}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                boxShadow: 3,
              },
            }}
          >
            <CardMedia
              component="img"
              height="80"
              width="80"
              image={dish.image}
              alt={dish.title}
              sx={{ borderRadius: '4px', maxWidth: '80px', objectFit: 'cover' }}
            />
            <Typography variant="h6">{dish.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              Price: {dish.price} KGZ
            </Typography>
          </Box>
        ))}
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Typography variant="h5">Total: {Object.keys(currentOrder).length > 0 ? totalPrice : 0} SOM</Typography>
        {Object.keys(currentOrder).length > 0 ? (
          <Button variant="contained" color="primary" onClick={() => setShowModal(true)} sx={{ mt: 2 }}>
            Checkout
          </Button>
        ) : (
          <Typography variant="body1" color="textSecondary">
            Your order is empty
          </Typography>
        )}
      </Box>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: 24,
            width: 400,
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h5">Your Order</Typography>
          <Box sx={{ marginBottom: '16px' }}>
            {Object.entries(currentOrder).map(([dishId, amount]) => {
              const dish = dishes.find((dish) => dish.id === dishId);
              if (!dish) return null;

              return (
                <Box key={dishId} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography>
                    {dish.title} - {amount} x {dish.price} SOM
                  </Typography>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    color="error"
                    onClick={() => handleRemoveFromOrder(dishId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              );
            })}
          </Box>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant="h6">Delivery: {delivery} SOM</Typography>
          <Typography variant="h6">Total Price: {totalPrice} SOM</Typography>

          <Divider sx={{ marginY: 2 }} />

          <TextField
            label="Name"
            name="name"
            value={customerDetails.name}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="Phone"
            name="phone"
            value={customerDetails.phone}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="Address"
            name="address"
            value={customerDetails.address}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setShowModal(false)}
              sx={{ flex: 1, marginRight: '8px' }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePlaceOrder}
              disabled={
                !customerDetails.name || !customerDetails.phone || !customerDetails.address
              }
              sx={{ flex: 1 }}
            >
              Order
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Order;
