import React, { useState, useEffect } from "react";

import Styled from "styled-components";

import { Link } from "react-router-dom";

import Image from "../assets/checkout/checkout.png";

import { Authenticate } from "../ContextProvider";

import AnchorLink from "../components/Link";
import apiUrl from "../config";

const UserOrders = () => {
  let { userDetails } = Authenticate();

  // setting orders from localstorage orders
  let [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   let ordersRecord = JSON.parse(localStorage.getItem("orders"));
  //   let userOrders = ordersRecord.filter(
  //     (item) => item.id === userDetails.email
  //   );
  //   setOrders(userOrders);
  // }, [userDetails.email]);

  useEffect(() => {
    fetch(`${apiUrl}/user/view/orders`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.message);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <PageContainer>
      {orders && orders.length < 1 ? (
        <EmptyCart>
          <img src={Image} alt="Logo" />
          <p>Opps! No Order yet</p>
          <p>
            back to <Link to="/">Home</Link>
          </p>
        </EmptyCart>
      ) : (
        <OrderDetail>
          <AnchorLink />
          <h1>Orders</h1>
          <Items>
            {orders.map((item, index) => (
              <Order key={index}>
                <TitleHeader>
                  <TitleDetails>
                    Date and Time of Order: <p>{item.createdAt}</p>
                  </TitleDetails>
                  <TitleDetails>
                    Total Amount of Order: <p>&#8358;{item.total_amount}</p>
                  </TitleDetails>
                  <TitleDetails>
                    Payment Status: <p>{item.payment_status}</p>
                  </TitleDetails>
                  <TitleDetails>
                    Delivery Status: <p>{item.isDelivered.toString()}</p>
                  </TitleDetails>
                </TitleHeader>
                {item.items.map((order, index) => (
                  <Item key={index}>
                    <img src={order.image} alt="Item Logo" />
                    <h2>{order.title}</h2>
                    <Qty>
                      <p>QTY:</p>
                      <p>{order.quantity}</p>
                    </Qty>
                    <Price>
                      <p>Unit Price</p>
                      <p>&#8358;{order.price}</p>
                    </Price>
                    <Price>
                      <p>Total Price</p>
                      <p>&#8358;{order.price * order.quantity}</p>
                    </Price>
                  </Item>
                ))}
              </Order>
            ))}
          </Items>
        </OrderDetail>
      )}
    </PageContainer>
  );
};

export default UserOrders;

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
const OrderDetail = Styled.div`
    & h1{
        padding: 10px;
        text-align: center;
    }
`;

//style for ITEMS
const Items = Styled.div`
padding: 50px;
background-color: #fff;
width: 90%;
margin: auto;
border-radius: 5px;
`;

//style for Orders
const Order = Styled.div`
border-bottom: 2px solid #ccc;
padding: 0 5px;
&:nth-of-type(even){
    background-color: rgba(0,0,0,.05);
}
`;
//order header title
const TitleHeader = Styled.div`
padding: 10px 0;
// display:flex;
// justify-content: center;
// flex-wrap: wrap;
// gap: 50px;
`;

//Style for Date element
const TitleDetails = Styled.div`
padding: 10px 0;
& p {
    font-weight: 900;
    font-family: ${({ theme }) => theme.montserratFont};
}
`;

//style for item
const Item = Styled.div`
// display: flex;
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
align-items: center;
padding: 10px 0;

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
