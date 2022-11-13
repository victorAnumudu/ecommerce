import React from "react";
import Styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

import SpinnerStyle from "../styles/SpinnerStyle";

import { Authenticate } from "../Goods";

const Payment = ({ totalPrice }) => {
  let navigate = useNavigate();

  let { cart, setCart, userDetails } = Authenticate();

  // function to handle payment
  let handlePayment = (e) => {
    e.preventDefault();
    let message = document.querySelector(".msg");
    message.textContent = "Successfully";
    message.style.color = "darkgreen";

    let spinner = document.getElementById("rotate");
    spinner.style.display = "block";
    setTimeout(() => {
      spinner.style.display = "none";

      // add to order local storage
      if (localStorage.getItem("orders")) {
        let oldOrderRecord = JSON.parse(localStorage.getItem("orders"));
        let newOrder = {
          id: userDetails.email,
          totalAmount: totalPrice,
          order: cart,
        };
        let newOrderRecord = [...oldOrderRecord, newOrder];
        localStorage.setItem("orders", JSON.stringify(newOrderRecord));
      } else {
        //set orders storage in localstorage
        let newOrder = {
          id: userDetails.email,
          totalAmount: totalPrice,
          order: cart,
        };
        localStorage.setItem("orders", JSON.stringify([newOrder]));
      }

      //clearcart
      setCart([]);

      navigate("/");
    }, 1000);
  };

  return (
    <Alert>
      <FormWrapper>
        <Form>
          <Message className="msg"></Message>
          <InputGroup>
            <Label>Total Amount</Label>
            <Input type="text" disabled={true} value={`$ ${totalPrice}`} />
          </InputGroup>
          <InputGroup>
            <Label>Card Details</Label>
            <Input type="text" />
          </InputGroup>
          <InputGroup>
            <Label>Card PIN</Label>
            <Input type="text" />
          </InputGroup>
          <Anchor>
            <p>
              Back to <Link to="/">Home</Link>
            </p>
          </Anchor>
          <Submit type="submit" onClick={handlePayment}>
            Pay
          </Submit>

          <SpinnerStyle id="rotate" />
        </Form>
      </FormWrapper>
    </Alert>
  );
};

export default Payment;

// style for IsSuccessMessage
const Alert = Styled.div`
position: fixed;
top: 0;
left: 0;
bottom: 0;
width: 100%;
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
position: absolute;
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
    font-size: 18px;
`;
