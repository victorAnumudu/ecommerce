import React from "react";
import Styled from "styled-components";

const Main = (props) => {
  return <MainSection>{props.children}</MainSection>;
};

export default Main;

const MainSection = Styled.main`
display: flex;
    position: relative;
`;
