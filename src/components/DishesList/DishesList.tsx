import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store.ts';
import { deleteDish, fetchAllDishes } from '../../store/thunks/dishesThunks.ts';
import { useAppDispatch } from '../../app/hooks.ts';

const DishesList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const dishes = useSelector((state: RootState) => state.dishes.dishes);
  const loading = useSelector((state: RootState) => state.dishes.loading.fetchDishes);

  useEffect(() => {
    dispatch(fetchAllDishes());
  }, [dispatch]);

  const handleEdit = (id: string) => {
    navigate(`/admin/edit-dish/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this dish?')) {
      dispatch(deleteDish(id));
    }
  };

  console.log(dishes)

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Dishes List</h3>
      <div className="row">
        {loading ? (
          <div>Loading...</div>
        ) : (
          dishes.map((dish) => (
            <div key={dish.id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={dish.image}
                  alt={dish.title}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{dish.title}</h5>
                  <p className="card-text">Price: {dish.price} KGZ</p>
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={() => handleEdit(dish.id)}
                      className="btn btn-warning"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(dish.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DishesList;
