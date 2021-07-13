import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/style.scss";
// import Home from "./pages/HomePage";
// import About from "./pages/AboutPage";
// import Contact from "./pages/ContactPage";
// import Cart from "./pages/CartPage";
// import SignInSignUp from "./pages/SignInSignUp";
// import TermsConditions from "./pages/TermsConditionsPage";
// import Clothes from "./pages/categories/Clothes";
// import Checkout from "./pages/CheckoutPage";
// import Shoes from './pages/categories/Shoes';
// import Accessories from "./pages/categories/Accessories";
// import AccountInfo from "./pages/account/Account";
// import AccountAddressBook from "./pages/account/addressbook/AddressBook";
// import AccountMyOrders from "./pages/account/MyOrders";
// import AccountMyFavourites from "./pages/account/MyFavourites";
// import AdminDashboard from "./pages/admindashboard/AdminDashboard";
// import AdminOrders from "./pages/adminorders/AdminOrders";
// import AdminProducts from "./pages/adminproducts/AdminProducts";
// import ProductPage from "./pages/ProductPage";
// import ProductItemLayout from "./components/ProductItemLayout";
// import SearchPage from "./pages/SearchPage";
// import FavouritesPage from "./pages/FavouritesPage";
// import ConfirmOrderPage from "./pages/ConfirmOrderPage";
import { CartProvider } from "./utilities/CartContext";
import Routes from "./components/routes";
import React from 'react';
import {UserContext} from './context/UserContext';
// import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  const userCtx = React.useContext(UserContext);
  
  React.useEffect(()=>{
    userCtx.autoLogin();
  }, [])
  return (
    <>
      <Router> 
        <CartProvider>
          <Navbar />
          <Routes />

          </CartProvider>
      </Router>
    </>
  );
}

export default App;
