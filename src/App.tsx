import { Route, Routes } from 'react-router-dom';
import DishesList from './components/DishesList/DishesList.tsx';
import DishForm from './components/DishForm/DishForm.tsx';

const App = () => {
  return (
  <>
    <Routes>
      <Route path='/' element={<DishesList />} ></Route>
      <Route path='/add-dish' element={<DishForm />} ></Route>
    </Routes>
  </>
);
};

export default App;
