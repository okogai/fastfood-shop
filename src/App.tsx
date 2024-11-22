import { Route, Routes } from 'react-router-dom';
import DishesList from './components/DishesList/DishesList.tsx';
import DishForm from './components/DishForm/DishForm.tsx';

const App = () => {
  return (
  <>
    <Routes>
      <Route path='/admin' element={<DishesList />} ></Route>
      <Route path='/admin/add-dish' element={<DishForm />} ></Route>
      <Route path='/admin/edit-dish/:id' element={<DishForm />} ></Route>
    </Routes>
  </>
);
};

export default App;
