import Styled from "styled-components";

import Image from "../assets/ecommerce.jpg"; // login bg
import RegisterBg from "../assets/signup/bg.jpg"; // register bg
import Image1 from "../assets/login/login.jpg";

export const LoginContainer = Styled.div`
    width: 100%;
    background-image: url(${Image});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    @media screen and (max-width: 768px){
      &{
        background-image: url(${Image1});
        background-size: cover;
        min-height: 100vh;
      }
    }
`;

export const RegisterContainer = Styled.div`
    width: 100%;
    background-image: url(${Image});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    @media screen and (max-width: 768px){
      &{
        background-image: url(${Image1});
        background-size: cover;
        min-height: 100vh;
      }
    }
`;
