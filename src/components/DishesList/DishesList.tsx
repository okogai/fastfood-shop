import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store.ts';
import { deleteDish, fetchAllDishes } from '../../store/thunks/dishesThunks.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from '@mui/material';

const DishesList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const dishes = useAppSelector((state: RootState) => state.dishes.dishes);
  const loading = useAppSelector((state: RootState) => state.dishes.loading.fetchDishes);

  useEffect(() => {
    dispatch(fetchAllDishes());
  }, [dispatch]);

  const handleEdit = (id: string) => {
    navigate(`/admin/edit-dish/${id}`);
  };

  const handleDelete = async (id: string) => {
    dispatch(deleteDish(id));
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Dishes List
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={4}
        >
          {dishes.map((dish) => (
            <Card key={dish.id} sx={{ width: '300px' }}>
              <CardMedia
                component="img"
                height="200"
                image={dish.image}
                alt={dish.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {dish.title}
                </Typography>
                <Typography variant="body1">Price: {dish.price} KGZ</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', padding: 2 }}>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => handleEdit(dish.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(dish.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default DishesList;
