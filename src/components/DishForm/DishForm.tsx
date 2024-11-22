import React, { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { IDish } from '../../types';
import { addNewDish, editDish, getOneDishFromDB } from '../../store/thunks/dishesThunks';
import { useAppDispatch } from '../../app/hooks.ts';
import { RootState } from '../../app/store.ts';

const initialState = {
  id: '',
  title: '',
  price: 0,
  image: '',
};

const DishForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const dishToEdit = useSelector((state: RootState) => state.dishes.dishToEdit);
  const loading = useSelector((state: RootState) => state.dishes.loading);

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
      navigate('/admin/dishes');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 mt-5 border rounded shadow bg-white d-flex flex-column align-items-center mx-auto"
      style={{width: '600px'}}
    >
      <h3 className="text-center mb-4">{id ? 'Edit dish' : 'Add new dish'}</h3>

      <div className="mb-3 w-100">
        <label htmlFor="title" className="form-label">Title:</label>
        <input
          id="title"
          name="title"
          type="text"
          value={dish.title}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter dish title"
          required
        />
      </div>

      <div className="mb-3 w-100">
        <label htmlFor="price" className="form-label">Price:</label>
        <input
          id="price"
          name="price"
          type="number"
          min="0"
          value={dish.price}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3 w-100">
        <label htmlFor="image" className="form-label">Image URL:</label>
        <input
          id="image"
          name="image"
          type="text"
          value={dish.image}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter image URL"
          required
        />
      </div>

      <div className="mb-3 text-center w-100">
        <h5>Preview:</h5>
        {dish.image ? (
          <img
            src={dish.image}
            alt="Dish preview"
            style={{width: '150px', height: '150px', objectFit: 'cover'}}
          />
        ) : (
          <p className="text-muted">Enter image URL to view.</p>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary d-flex align-items-center justify-content-center"
        disabled={loading.fetchAddDish || loading.fetchDishEdit}
      >
        {loading.fetchAddDish || loading.fetchDishEdit ? (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          id ? 'Save' : 'Add'
        )}
      </button>
    </form>
  );
};

export default DishForm;