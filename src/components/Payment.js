import React, { useState, useRef } from "react";

import { PaystackButton } from "react-paystack"; // PAYSTACK BUTTON TO ACTIVATE PAYSTACK
import { PaystackPublicKey } from "../config";
import "../styles/paystack_button.css";

import Styled from "styled-components";
import { Link } from "react-router-dom";

import SpinnerStyle from "../styles/SpinnerStyle";

import { Authenticate } from "../ContextProvider";

import apiUrl from "../config";

const Payment = (/*{ totalPrice, setShowPayment }*/) => {
  let { cart, setCart, userDetails, setAlertMessage } = Authenticate();
  // let navigate = useNavigate();

  let message = useRef(); // message element for sending sending success or failure message to user
  let [spinner, setSpinner] = useState(false); // spinner element

  //function to get total price of item user bought
  let totalPrice = () => {
    let total = cart.reduce((sum, item) => {
      return sum + item.quantity * item.price;
    }, 0);
    return total;
  };

  //FUNCTION TO ADD ORDER DETAILS TO ORDER TABLE
  let handlePayment = async (e) => {
    setSpinner(true);
    let paymentType = "";
    if (e && e.target.name === "cash") {
      paymentType = "pay on delivery";
    } else {
      paymentType = "card";
    }

    try {
      let orderDetails = {
        email: userDetails.email,
        cart,
        totalAmount: totalPrice(),
        paymentType,
        paymentStatus: paymentType === "card" ? "paid" : "not paid",
      };

      let res = await fetch(`${apiUrl}/user/order`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(orderDetails),
      });
      let data = await res.json();

      // if request fails
      if (!data.status) {
        message.current.style.color = "red";
        message.current.textContent = data.message;
        setTimeout(() => {
          setSpinner(false);
          // setShowPayment(false);
          setAlertMessage({
            show: false,
            message: data.message,
            color: "red",
          });
        }, 500);
      }
      message.current.style.color = "darkgreen";
      message.current.textContent = data.message;
      setCart([]); // SETTING CART TO EMPTY ARRAY
      setTimeout(() => {
        setSpinner(false);
        // setShowPayment(false);
        setAlertMessage({
          show: true,
          message: data.message,
          color: "darkgreen",
        });
      }, 1000);
    } catch (error) {
      message.current.style.color = "red";
      message.current.textContent = "Opps! something went wrong";
      setTimeout(() => {
        setSpinner(false);
        // setShowPayment(false);
        setAlertMessage({
          show: false,
          message: "Opps! something went wrong",
          color: "red",
        });
      }, 500);
    }

    //remember to clear cart

    // setTimeout(() => {
    //   setSpinner(false);

    //   // add to order local storage
    //   if (localStorage.getItem("orders")) {
    //     let oldOrderRecord = JSON.parse(localStorage.getItem("orders"));
    //     let newOrder = {
    //       id: userDetails.email,
    //       totalAmount: totalPrice,
    //       order: cart,
    //     };
    //     let newOrderRecord = [...oldOrderRecord, newOrder];
    //     localStorage.setItem("orders", JSON.stringify(newOrderRecord));
    //   } else {
    //     //set orders storage in localstorage
    //     let newOrder = {
    //       id: userDetails.email,
    //       totalAmount: totalPrice,
    //       order: cart,
    //     };
    //     localStorage.setItem("orders", JSON.stringify([newOrder]));
    //   }

    //   //clearcart
    //   setCart([]);

    //   navigate("/");
    // }, 1000);
  };

  //PAYLOAD TO SEND TO PAYSTACK
  let paystackPayload = {
    email: userDetails.email,
    amount: totalPrice() * 100,
    publicKey: PaystackPublicKey, // from config
    text: "Pay With Card",
    onSuccess: () => {
      handlePayment();
    },
    onClose: () => {
      let reply = window.confirm("are you sure, you want to exit?");
      if (!reply) {
        return;
      }
    },
  };

  return (
    <Alert>
      <FormWrapper>
        <Form>
          <Message ref={message}></Message>
          <InputGroup>
            <Label>Total Amount</Label>
            {/* <Input type="text" disabled={true} value={`${totalPrice}`} /> */}
            <TotalAmount>&#8358;{`${totalPrice()}`}</TotalAmount>
          </InputGroup>
          <InputGroup>
            <Label>Email</Label>
            <Input type="text" disabled={true} value={userDetails.email} />
          </InputGroup>

          <Anchor>
            <p>
              Back to <Link to="/">Home</Link>
            </p>
          </Anchor>

          {spinner && <SpinnerStyle />}
        </Form>
        <PaystackButton className="paystack-button" {...paystackPayload} />
        <Submit type="submit" name="cash" onClick={handlePayment}>
          PAY ON DELIVERY
        </Submit>
      </FormWrapper>
    </Alert>
  );
};

export default Payment;

// style for IsSuccessMessage
const Alert = Styled.div`
// position: fixed;
// top: 0;
// left: 0;
// bottom: 0;
// width: 100%;
height: 600px;
overflow: auto;
 z-index: 100;
 background-color: rgba(0,0,0,.8)
`;

const FormWrapper = Styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 90%;
max-width: 400px;
background-color: #fff;
padding: 20px;
position: relative;
top: 20px;
left: 50%;
transform: translate(-50%, 0%);
color: #222;
box-shadow: 0px 0px 10px #999;
border-radius: 10px;
font-size: 18px;
color: darkred;

animation: dropdown;
animation-duration: .5s;
animation-timing-function: linear;

@keyframes dropdown {
    0%{top: -100%}
    50%{top: 20%}
    75%{top: -20%}
    100{top: 0}
}
`;

const Message = Styled.p`
font-size: 16px;
`;

const Form = Styled.form`
width: 100%;
box-shadow: 0px 0px 10px #ccc;
border-radius: 5px;
padding: 5px 10px;
`;

const TotalAmount = Styled.p`
color: darkgreen;
`;
const InputGroup = Styled.div`
    padding: 5px 0;
    margin: 5px 0;
`;
const Label = Styled.label`
    display: block;
    width: 100%;
    padding: 10px 0;
    font-size: 18px;
`;

const Input = Styled.input`
width: 100%;
padding: 10px;
border: 1px solid #ccc;
outline: none;
border-radius: 5px;
font-size: 18px;
`;

const Anchor = Styled.div`
padding: 10px 0;
& a {
  color: orange;
  font-weight: 900;
  text-decoration:none;
}
`;

const Submit = Styled.button`
    cursor: pointer;
    display: block;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid transparent;
    outline: none;
    background-color: orange;
    color: #fff;
    font-weight: 900;
    font-size: 14px;
    width: 100%;
    margin-top: 20px;
    
    letter-spacing: 0.1rem;
    height: 45px;
`;
