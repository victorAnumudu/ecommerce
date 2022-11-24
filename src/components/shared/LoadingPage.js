import React from "react";
import Styled, { keyframes } from "styled-components";

export const LoadingPage = () => {
  return (
    <Loading>
      <Content>
        <Text>Loading ...</Text>
        <Spinner></Spinner>
      </Content>
    </Loading>
  );
};

export const FailedPage = () => {
  return (
    <Loading>
      <Content>
        <Text>Opps! No Information was found</Text>
      </Content>
    </Loading>
  );
};

const Loading = Styled.div`
width: 100%;
height: 70vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const Content = Styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 20px;
`;

const Text = Styled.div`
`;

// animation
const Rotate = keyframes`
    from{transform: rotate(0deg)};
    to{transform: rotate(360deg)};
`;
const Spinner = Styled.div`
width: 100px;
    height: 100px;
    border: 3px solid darkgreen;
    border-left: none;
    border-radius: 50%;
    
    animation-name: ${Rotate};
    animation-duration: .3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
`;
