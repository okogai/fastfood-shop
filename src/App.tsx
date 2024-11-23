import { Route, Routes } from 'react-router-dom';
import DishesList from './components/DishesList/DishesList.tsx';
import DishForm from './components/DishForm/DishForm.tsx';
import OrderList from './components/OrderList/OrderList.tsx';
import Order from './components/Order/Order.tsx';
import NavBar from './components/NavBar/NavBar.tsx';

const App = () => {
  return (
    <>
      <header>
        <NavBar/>
      </header>
      <Routes>
        <Route path='/' element={<Order/>}></Route>
        <Route path='/admin' element={<DishesList/>}></Route>
        <Route path='/admin/orders' element={<OrderList/>}></Route>
        <Route path='/admin/add-dish' element={<DishForm/>}></Route>
        <Route path='/admin/edit-dish/:id' element={<DishForm/>}></Route>
        <Route path='*' element={<h1 style={{textAlign: 'center'}}>Page not found</h1>}></Route>
      </Routes>
    </>
  );
};

export default App;
