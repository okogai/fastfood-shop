import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IDish } from '../../types';
import { addNewDish, editDish, getOneDishFromDB } from '../../store/thunks/dishesThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { RootState } from '../../app/store.ts';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';

const initialState = {
  title: '',
  price: 0,
  image: '',
};

const DishForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const dishToEdit = useAppSelector((state: RootState) => state.dishes.dishToEdit);
  const loading = useAppSelector((state: RootState) => state.dishes.loading);

  const [dish, setDish] = useState<IDish>(initialState);

  useEffect(() => {
    if (id) {
      dispatch(getOneDishFromDB(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (dishToEdit && id) {
      setDish(dishToEdit);
    }
  }, [dishToEdit, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDish((prevDish) => ({
      ...prevDish,
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      await dispatch(editDish({ id, ...dish }));
      dispatch(getOneDishFromDB(id));
    } else {
      await dispatch(addNewDish(dish));
      setDish(initialState);
      navigate('/admin');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: '600px',
        margin: '40px auto',
        padding: 3,
        border: '1px solid #ddd',
        borderRadius: 2,
        boxShadow: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h4" align="center">
        {id ? 'Edit Dish' : 'Add New Dish'}
      </Typography>

      <TextField
        id="title"
        name="title"
        label="Title"
        variant="outlined"
        fullWidth
        value={dish.title}
        onChange={handleChange}
        required
      />

      <TextField
        id="price"
        name="price"
        label="Price"
        type="number"
        variant="outlined"
        fullWidth
        value={dish.price}
        onChange={handleChange}
        required
        inputProps={{ min: 0 }}
      />

      <TextField
        id="image"
        name="image"
        label="Image URL"
        variant="outlined"
        fullWidth
        value={dish.image}
        onChange={handleChange}
        required
      />

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Preview:
        </Typography>
        {dish.image ? (
          <Box
            component="img"
            src={dish.image}
            alt="Dish preview"
            sx={{
              width: 150,
              height: 150,
              objectFit: 'cover',
              borderRadius: 1,
              border: '1px solid #ddd',
            }}
          />
        ) : (
          <Typography color="textSecondary">Enter image URL to view.</Typography>
        )}
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          width: '200px',
          alignSelf: 'center',
        }}
        disabled={loading.fetchAddDish || loading.fetchDishEdit}
        startIcon={
          (loading.fetchAddDish || loading.fetchDishEdit) && (
            <CircularProgress size={20} color="inherit" />
          )
        }
      >
        {loading.fetchAddDish || loading.fetchDishEdit ? 'Loading...' : id ? 'Save' : 'Add'}
      </Button>
    </Box>
  );
};

export default DishForm;
