import React from "react";
import Styled from "styled-components";
import { Link } from "react-router-dom";

import { Authenticate } from "../../ContextProvider";

const AlertMessage = ({ message, color }) => {
  let { setAlertMessage } = Authenticate();

  let removeAlertDisplay = (e) => {
    // e.preventDefault();
    setAlertMessage({
      show: false,
      message: "",
      color: "red",
    });
  };
  return (
    <Alert>
      <Message>
        {message}
        <Link to="/" onClick={removeAlertDisplay}>
          Back
        </Link>
      </Message>
    </Alert>
  );
};

export default AlertMessage;

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

const Message = Styled.div`
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
box-shadow: 0px 0px 10px #999;
border-radius: 10px;
font-size: 18px;
color: ${({ color }) => (color ? color : "darkred")};

animation: dropdown;
animation-duration: .5s;
animation-timing-function: linear;
& a {
  text-decoration: none;
  display:block;
  font-size: 18px;
  color: #fff;
  margin-top: 20px;
  background-color: orange;
  padding: 10px 20px;
  border-radius: 10px;
}

@keyframes dropdown {
    0%{top: -100%};
    50%{top: 20%};
    75%{top: -20%};
    100{top: 0};
}
`;
