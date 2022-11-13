import Styled from "styled-components";

import GlobalStyle from "./styles/GlobalStyle"; // Global Style Importation

import { ThemeProvider } from "styled-components";

import { Routes, Route } from "react-router-dom";

import { Authenticate } from "./Goods";

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
  let { alertMessage, userDetails, allProducts } = Authenticate();
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
          {userDetails.isLoggedIn && (
            <>
              <Route path="/user/orders" element={<UserOrders />} />
              <Route path="/user/profile/:user_id" element={<EditProfile />} />

              <Route path="/admin/post/product" element={<AdminAddProduct />} />
              <Route path="/admin/edit/:pid" element={<AdminEditProduct />} />
              <Route
                path="/admin/delete/:pid"
                element={<AdminDeleteProduct />}
              />
              <Route path="/admin/view/orders" element={<AdminViewOrders />} />
            </>
          )}

          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
        {alertMessage && <AlertMessage display={alertMessage} />}
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
