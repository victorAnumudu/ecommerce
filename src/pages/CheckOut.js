import React from "react";

import Styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";

import { Authenticate } from "../ContextProvider";

import Image from "../assets/checkout/checkout.png";

// import Payment from "../components/Payment"; // Payment Component
import AnchorLink from "../components/Link";

const CheckOut = () => {
  let navigate = useNavigate();

  let { userDetails, cart, changeItemQty, removeCartItem } = Authenticate();

  // setting payment component display
  // let [showPayment, setShowPayment] = useState(false);

  let handleChangeQty = (e, id) => {
    e.preventDefault();
    let action = e.target.name;
    changeItemQty(id, action);
  };

  //function to get cart number of items
  let cartNumber = () => {
    let numberOfItem = cart.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);
    return numberOfItem;
  };

  //function to get total price of item user bought
  let totalPrice = () => {
    let total = cart.reduce((sum, item) => {
      return sum + item.quantity * item.price;
    }, 0);
    return total;
  };

  //DELETING AN ITEM FROM THE CART
  const deleteCartItem = (id) => {
    removeCartItem(id);
  };

  // function to proceed to payment
  let proceedToPayment = () => {
    if (!userDetails.isLoggedIn) {
      navigate("/login");
      return;
    }
    navigate("/payment");
    // setShowPayment(true);
  };

  return (
    <PageContainer>
      {cart && cart.length < 1 ? (
        <EmptyCart>
          <img src={Image} alt="Logo" />
          <p>Opps! No Item was found in the Cart</p>
          <p>
            back to <Link to="/">Home</Link>
          </p>
        </EmptyCart>
      ) : (
        <CartDetail>
          <AnchorLink />
          <h1>Shopping Cart</h1>
          <Items>
            <SubTotal>
              <p>
                Subtotal ({`${cartNumber()} item${cartNumber() > 1 ? "s" : ""}`}
                )
              </p>
              <p>&#8358;{totalPrice()}</p>
            </SubTotal>
            {cart.map((item) => (
              <Item key={item.id}>
                <img src={item.image} alt="Item Logo" />
                <h2>{item.title}</h2>
                <Qty>
                  <p>QTY:</p>
                  <button
                    name="decrease"
                    onClick={(event) => handleChangeQty(event, item.id)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    name="increase"
                    onClick={(event) => handleChangeQty(event, item.id)}
                  >
                    +
                  </button>
                </Qty>
                <Price>
                  <p>Unit Price</p>
                  <p>&#8358;{item.price}</p>
                </Price>
                <Price>
                  <p>Total Price</p>
                  <p>&#8358;{item.price * item.quantity}</p>
                </Price>
                <DeleteBtn title="Delete Item">
                  <i
                    onClick={() => deleteCartItem(item.id)}
                    className="fa-solid fa-trash"
                  ></i>
                </DeleteBtn>
              </Item>
            ))}
          </Items>
          <CheckoutBtn onClick={proceedToPayment}>Check Out</CheckoutBtn>
        </CartDetail>
      )}
      {/* {showPayment && <Payment totalPrice={totalPrice()} cart={cart} setShowPayment={setShowPayment}/>} */}
    </PageContainer>
  );
};

export default CheckOut;

// STYLE FOR CHECKOUT WRAPPER
const PageContainer = Styled.div`
    min-height: 100vh;
    background-color: #e3e3e3;
    position: relative;
    padding-bottom: 50px;
`;

// style for empty Cart Display
const EmptyCart = Styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 90%;
max-width: 400px;
height: 400px;
background-color: #fff;
padding: 20px;
position: absolute;
top: 20px;
left: 50%;
transform: translate(-50%, 0%);
color: #222;
box-shadow: 0px 0px 10px #999;
border-radius: 10px;
animation: dropdown;
animation-duration: .5s;
animation-timing-function: linear;
& img{
    width: 100px;
}
& p {
    margin: 10px 0;
    font-size: 18px;
}
& a{
    text-decoration: none;
    color: orange;
    font-weight: 900;
}
@keyframes dropdown {
    0%{top: -100%}
    50%{top: 20%}
    75%{top: -20%}
    100{top: 0}
}
`;

// Style for CART DETAIL
const CartDetail = Styled.div`
    & h1{
        padding: 10px;
        text-align: center;
    }
`;

// style for SUB TOTAL DIV
const SubTotal = Styled.div`
display: flex;
justify-content: center;
column-gap: 30px;
font-weight: 900;
padding: 10px;
// background-color: #ddd;
box-shadow: 0px 0px 10px #ccc;
color: darkgreen;
& p {
    font-size: 18px;
}
`;

//style for ITEMS
const Items = Styled.div`
padding: 50px;
background-color: #fff;
width: 80%;
margin: auto;
border-radius: 5px;
`;

//style for item
const Item = Styled.div`
// display: flex;
display: grid;
grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
align-items: center;
padding: 10px 0;
border-bottom: 2px solid #ccc;
& img{
    width: 100px;
}

& h2{
    padding: 10px;
}
@media screen and (max-width:568px) {
    & {
      display: block;
      text-align: center;
    }
    & img {
        margin: auto;
    }
  }
`;

//Style for CHECK OUT BTN
const CheckoutBtn = Styled.button`
display: block;
background-color: darkgreen;
padding: 10px;
text-align: center;
border: none;
outline: none;
color: #fff;
font-size: 18px;
width: 80%;
margin: 20px auto 0 auto;
cursor: pointer;
transition: all .2s;
border-radius: 5px;
&:hover{
    background-color: green;
}
`;

//style for QTY
const Qty = Styled.div`
padding: 0 20px;
& p{
    margin: auto;
    padding: 5px 0;
} 
& button{
    width: 30px;
    height: 30px;
    cursor: pointer;
    outline: none;
    border: none;
    &:hover{
        background-color: #e3e3e3;
    }
}
& span {
    display: inline-block;
    text-align: center;
    padding: 0 10px;
}
@media screen and (max-width:568px) {
    & {
      margin: 20px 0;
    }
    & p {
        text-align: center;
    }
  }
`;

//style for PRICE
const Price = Styled.div`
padding: 0 20px;
text-align: center;
& p {
    font-size: 18px;
}
& p:nth-child(2){
    color: green;
    font-weight: 900;
}
@media screen and (max-width:568px) {
    & {
      margin: 20px 0;
    }
  }
`;

//style for DELETE BTN
const DeleteBtn = Styled.button`
width: 50px;
background-color: transparent;
border: none;
outline: none;
color: darkred;
font-size: 18px;
cursor: pointer;
transition: all .2s;
&:hover{
    color: red;
}
`;
