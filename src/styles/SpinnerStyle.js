import React from "react";

import Styled, { keyframes } from "styled-components";

const SpinnerStyle = () => {
  return (
    <SpinnerWrapper>
      <Spinner></Spinner>
    </SpinnerWrapper>
  );
};

export default SpinnerStyle;

// animation
const Rotate = keyframes`
    from{transform: rotate(0deg)}
    to{transform: rotate(360deg)}
`;
const SpinnerWrapper = Styled.div`
position: fixed;
width: 100%;
top: 0;
left: 0;
bottom: 0;
background-color: rgba(0,0,0,0.4)
`;

const Spinner = Styled.div`
    position: absolute;
    top: 40%;
    left: 40%;

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
