import React, { useState } from "react";

import Styled from "styled-components"; //style module importation
// import Logo from "../assets/logo.png"; // Nav Bar Logo
import Logo from "../assets/logo.svg"; // Nav Bar Logo

import NavLink from "./Navbar/NavLink"; // Nav Link
import { useLocation, useNavigate } from "react-router-dom";

import { Authenticate } from "../Goods"; // context provider importation

// FUNCTION NAV COMPONENT
const Navbar = () => {
  let navigate = useNavigate(); // instantiating navigatiom

  let [toggleMenu, setToggleMenu] = useState(false); // state for toggling menu on mobile screen

  const { pathname } = useLocation();

  let { cart, userDetails, logOutUser } = Authenticate(); // getting cart from context provider

  //function to get cart item number
  let cartNumber = () => {
    let numberOfItem = cart.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);
    return numberOfItem;
  };

  let onLinkClick = (e) => {
    // checking to see if user is on mobile screen and removes menu options from screen
    if (toggleMenu) {
      onToggleMenu();
    }
  };

  //function to CHANGE THE STATE OF TOGGLE MENU
  let onToggleMenu = () => {
    setToggleMenu((prev) => !prev);
  };

  //function to reset the toggle menu to default on screen resize
  window.onresize = () => {
    if (toggleMenu) {
      onToggleMenu();
    }
  };

  //function to handle when user clicks on check out BTN
  const handleCheckout = () => {
    navigate("/checkout");
  };
  return (
    <Nav>
      <NavLogo src={Logo} alt="Logo Img" />
      <NavToggler onClick={onToggleMenu}>
        <NavTogglerBar1 toggle={toggleMenu} />
        <NavTogglerBar2 toggle={toggleMenu} />
      </NavToggler>
      <NavLinks ontoggle={toggleMenu}>
        <NavLink
          path="/"
          name="Home"
          active={pathname === "/"}
          onclick={onLinkClick}
        />
        {userDetails.isLoggedIn && (
          <UserEmail>
            <p>
              {userDetails.email}{" "}
              <i className="fa-solid fa-caret-down arrow-down"></i>
            </p>
            <ul>
              <NavLink path="/user/orders" name="Orders History" />
              <NavLink path="/user/profile/1" name="Edit Profile" />
              {userDetails.role === "admin" && (
                <>
                  <NavLink path="/admin/post/product" name="Add Product" />
                  <NavLink path="/admin/view/orders" name="All Order History" />
                </>
              )}
            </ul>
          </UserEmail>
        )}
        {!userDetails.isLoggedIn && (
          <NavLink
            path="/login"
            name="Login"
            active={pathname === "/login"}
            onclick={onLinkClick}
          />
        )}
        {!userDetails.isLoggedIn && (
          <NavLink
            path="/signup"
            name="Signup"
            active={pathname === "/signup"}
            onclick={onLinkClick}
          />
        )}
        <CartBtn onClick={handleCheckout}>
          <i className="fa-solid fa-cart-shopping"></i>
          <span>{cartNumber()}</span>
        </CartBtn>
        {userDetails.isLoggedIn && (
          <LogoutBtn
            onClick={() => {
              setTimeout(logOutUser, 1000);
            }}
          >
            Logout
          </LogoutBtn>
        )}
      </NavLinks>
    </Nav>
  );
};

export default Navbar;

//style for NAV COMPONENT

const Nav = Styled.nav`
background-color: #fff;
max-width: 2000px;
margin: auto;
padding: 0px 30px;
display: flex;
justify-content: space-between;
align-items: center;
position: fixed;
z-index: 9;
top: 0;
left: 0;
right: 0;
background-color: #000;
@media screen and (max-width:768px) {
  & {
    display: block;
  }
}
`;

//style fro NAV LOGO COMPONENT
const NavLogo = Styled.img`
  width: 140px;
  padding: 10px;
`;

//style fro NAV LINKS COMPONENT
const NavLinks = Styled.div`
display: flex;
justify-content: space-between;
align-items: center;
@media screen and (max-width:768px) {
  & {
    display: block;
    position: absolute;
    top: 100%;
    right: ${({ ontoggle }) => (ontoggle ? "0" : "-100%")};
    width: 50%;
    padding: 0 10px;
    height: 100vh;
    text-align: right;
    transition: right .5s;
    background-color: #000;
  }
}
`;

//style fro NAV TOGGLE COMPONENT
const NavToggler = Styled.div`
width: 30px;
height: 35px;
position: absolute;
top: 20%;
right: 30px;
transform: translate(0%, -5%);
display: none;
cursor: pointer;
@media screen and (max-width:768px) {
  & {
    display: block;
  }
}
`;

//style fro NAV TOGGLE COMPONENT
const NavTogglerBar1 = Styled.div`
  height: 3px;
  background-color: #fff;
  margin-top: ${({ toggle }) => (toggle ? "15px" : "10px")};
  transform: ${({ toggle }) => (toggle ? "rotate(-45deg)" : "rotate(0deg)")};
  transition: all .3s;
`;

const NavTogglerBar2 = Styled.div`
  height: 3px;
  background-color: #fff;
  margin-top: ${({ toggle }) => (toggle ? "-3px" : "5px")};
  transform: ${({ toggle }) => (toggle ? "rotate(45deg)" : "rotate(0deg)")};
  transition: all .3s;
`;

//style for logout btn
const LogoutBtn = Styled.button`
  padding: 5px;
  font-size: 1.2rem;
  border: none;
  outline: none;
  border-radius: 5px;
  background-color: orange;
  color: #fff;
  cursor: pointer;
  transition: all .2s;
  &:hover{
    background-color: #555;
  }
`;

const CartBtn = Styled.button`
display: flex;
justify-content: center;
align-items: center;
padding: 5px;
font-size: 1.2rem;
border: none;
outline: none;
border-radius: 5px;
background-color: orange;
color: #fff;
cursor: pointer;
margin: 0 20px;
transition: all .2s;
@media screen and (max-width:768px) {
  & {
    display: block;
    margin: 10px 0 10px auto;
  }
}
&:hover{
  background-color: #555;
}
& i {
margin-right: 10px;
}
`;

//style for user email display
const UserEmail = Styled.div`
position: relative;
cursor: pointer;
& p {
  color: #fff;
}
& ul {
  display: none;
  position: absolute;
  z-index: 1;
  left: 0;
  top: 80%;
  width: 100%;
  padding: 5px;
  background-color: #000;
  border-radius: 5px;
}
&:hover ul {
  display: block;
}
& a {
  color: orange;
  maegin: 10px 0;
  font-size: 16px;
}
`;
