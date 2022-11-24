import React from "react";
import Styled from "styled-components";

const PageNotFound = () => {
  return (
    // <Loading>
      <Content>
        <Error>ERROR 404</Error>
        <Text>Opps! Page not Found</Text>
      </Content>
    // </Loading>
  );
};

export default PageNotFound;

const Content = Styled.div`
height: 70vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 20px;
`;

const Error = Styled.h1`
`
const Text = Styled.p`
`;

