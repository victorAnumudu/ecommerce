import React from "react";

import Styled, { keyframes } from "styled-components";

const SpinnerStyle = ({ id }) => {
  return <Spinner id={id}></Spinner>;
};

export default SpinnerStyle;

// animation
const Rotate = keyframes`
    from{transform: rotate(0deg)}
    to{transform: rotate(360deg)}
`;

const Spinner = Styled.div`
    position: absolute;
    top: 40%;
    left: 40%;
    display: none;

    margin: auto;
    width: 100px;
    height: 100px;
    border: 3px inset orange;
    border-radius: 50%;
    
    animation-name: ${Rotate};
    animation-duration: .3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
`;
