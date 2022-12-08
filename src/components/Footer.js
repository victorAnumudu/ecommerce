import React, { useState } from "react";

import Styles from "styled-components";

import FooterLogo from "../assets/logo.svg";
import { Authenticate } from "../ContextProvider";

const Footer = () => {
  let [input, setInput] = useState("");
  let { setAlertMessage } = Authenticate();

  const subscribe = () => {
    //valid email
    let regEx = /^[^0-9][a-zA-Z0-9._%+-]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/;
    let email = input
    if(!email || regEx.test(email) == false){
      setAlertMessage({
      show: true,
      message: "Please input a valid Email",
      color: "red",
    });
    }
    setAlertMessage({
      show: true,
      message: "You have successfully subscribed",
      color: "green",
    });
    setInput('')
  };
  return (
    <FooterElement>
      <FooterFlex>
        <Footerleft>
          <FooterImg src={FooterLogo} alt="footer logo image" />
          <FooterText>
            GoBuyIt is a Nigerian Market Store to purchase Shoes, Electronics,
            Cloths, etc. They feature information recent and most updated
            products in the aforementioned product.
          </FooterText>
        </Footerleft>
        <FooterRight>
          <Subscribe>Subscribe</Subscribe>
          <Submit onClick={subscribe}>&#62;</Submit>
          <Input type="text" placeholder="Enter your email" value={input} onChange={(e)=>setInput(e.target.value)}/>
        </FooterRight>
      </FooterFlex>

      <CopyRight>@copyright AnumuduCV 2021</CopyRight>
    </FooterElement>
  );
};

export default Footer;

// Style for FOOTER CONTAINER
const FooterElement = Styles.footer`
    color: #fff;
    background-color: #000;
    padding: 10px 50px;
    @media screen and (max-width: 768px){
        & {
            padding: 20px;
        }
    }
`;

const FooterFlex = Styles.div`
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 992px){
        & {
            flex-wrap: wrap;
            margin: 10px 0;
        }
    }

`;

// styles for footer left side
const Footerleft = Styles.div`
width: 50%;
@media screen and (max-width: 992px){
    & {
        width: 100%;
    }
}
`;

const FooterImg = Styles.img`
width: 150px;
display: block;
`;

// style for footer text
const FooterText = Styles.p`
margin: 20px 0;
font-size: 1.2rem;
`;

// styles for footer right side
const FooterRight = Styles.div`
width: 40%;
display: flex;
padding: 5px;
background-color: #e3e3e3;
height: 60px;
position: relative;
border-radius: 5px;
@media screen and (max-width: 992px){
    & {
        width: 100%;
    }
`;

// styles for Subscribe
const Subscribe = Styles.div`
position: absolute;
top: 50%;
transform: translate(10%, -50%);
background-color: #000;
padding: 10px;
font-size: 1.2rem;
border-radius: 5px;
`;

// styles for Subscribe
const Submit = Styles.div`
position: absolute;
top: 50%;
right: 10px;
transform: translate(0%, -50%);
background-color: #000;
padding: 4px 10px;
font-size: 1.2rem;
border-radius: 50%;
`;

// styles for Input
const Input = Styles.input`
padding: 10px 50px 10px 120px;
width: 100%;
font-size: 1.2rem;
outline: none;
border: none;
background-color: transparent;
& placeholder{
    color: #000;
}
`;

// footer copyright
const CopyRight = Styles.p`
    border-top: 2px solid #e3e3e3;
    padding: 10px 0;
    font-size: 1.2rem;
    text-align: right;
`;
