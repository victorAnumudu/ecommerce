import React from "react";
import Styled from "styled-components";

import GlobalStyle from "./styles/GlobalStyle"; // Global Style Importation

import { ThemeProvider } from "styled-components";

import { Routes, Route, Navigate } from "react-router-dom";

import { Authenticate } from "./ContextProvider";

import AlertMessage from "./components/shared/AlertMessage"; // Alert Message

// component importations
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CheckOut from "./pages/CheckOut";
import ProductPage from "./pages/ProductPage";
import Footer from "./components/Footer";
import UserOrders from "./pages/UserOrders";
import EditProfile from "./pages/EditProfile";
import PageNotFound from "./pages/PageNotFound";
import Payment from "./components/Payment";

//ADMIN PAGES/ROUTES
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminEditProduct from "./pages/AdminEditProduct";
import AdminDeleteProduct from "./pages/AdminDeleteProduct";
import AdminViewOrders from "./pages/AdminViewOrders";

let theme = {
  robotoFont: `'Roboto', sans-serif`,
  montserratFont: `'Montserrat', sans-serif`,
};

function App() {
  let { alertMessage, userDetails } = Authenticate();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppDiv>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/product/:product_id" element={<ProductPage />} />
          <Route path="/user/profile/" element={userDetails.isLoggedIn ? <EditProfile /> : <Navigate to = '/login' />} />
          <Route path="/user/orders" element={userDetails.isLoggedIn ? <UserOrders /> : <Navigate to = '/login' />} />
          <Route path="/payment" element={userDetails.isLoggedIn ? <Payment /> : <Navigate to = '/checkout' />} />

          {/* ADMIN ROUTES */}
          <Route path="/admin/add/product" element={userDetails.isLoggedIn && userDetails.role ==='admin' ? <AdminAddProduct /> : <Navigate to = '/login' />} />
          <Route path="/admin/edit/:pid" element={userDetails.isLoggedIn && userDetails.role ==='admin' ? <AdminEditProduct /> : <Navigate to = '/login' />} />
          <Route path="/admin/delete/:pid" element={userDetails.isLoggedIn && userDetails.role ==='admin' ? <AdminDeleteProduct /> : <Navigate to = '/login' />} />
          <Route path="/admin/view/orders" element={userDetails.isLoggedIn && userDetails.role ==='admin' ? <AdminViewOrders /> : <Navigate to = '/login' />} />

          {/* ANY UNSPECIFIED ROUTES */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
        {alertMessage.show && <AlertMessage message={alertMessage.message} color={alertMessage.color} />}
      </AppDiv>
    </ThemeProvider>
  );
}

export default App;

const AppDiv = Styled.div`
max-width: 2000px;
margin: auto;
position: relative;
`;
