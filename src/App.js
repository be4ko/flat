import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import  './App.css';
import Layout from './Pages/Layout/Layout';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import NotFound from './Pages/NotFound/NotFound';
import Brands from './Pages/Brands/Brands';
import Categories from './Pages/Categories/Categories';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import Login from './Pages/Login/Login';
import CounterContextProvider from './Context/CounterContext';
import UserContextProvider from './Context/UserContext';
import Cart from './Pages/Cart/Cart';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import CartContextProvider from './Context/CartContext';
import WishList from './Pages/WishList/WishList';
import { Toaster } from 'react-hot-toast';
import WishListContextProvider, { WishListContext } from './Context/WishListContext';

function App() {


  const routers = createBrowserRouter([
    {path:'' , element: <Layout/> , children: [
      {index:true, element:<Home/>},
      {path: 'register', element:<Register/>},
      {path: 'login', element:<Login/>},
      {path: 'brands' , element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path: 'categories' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path: 'cart' , element:<ProtectedRoute><Cart/></ProtectedRoute> },
      {path: 'wishlist' , element:<ProtectedRoute><WishList/></ProtectedRoute> },
      {path: 'details/:id', element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},

      {path: '*', element:<NotFound/>}
  ]}
  ]);



  return (
    <WishListContextProvider>
      <CartContextProvider>
        <UserContextProvider>
          <CounterContextProvider>
              <RouterProvider router={routers}></RouterProvider>
          </CounterContextProvider>
        </UserContextProvider> 
        <Toaster/>
      </CartContextProvider>
    </WishListContextProvider>
  ); 

}

export default App;
