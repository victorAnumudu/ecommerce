import { createGlobalStyle } from "styled-components"; // importing global style component

let GlobalStyle = createGlobalStyle`
html{
    scroll-behavior: smooth;
}
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
body{
    font-size: 100%;
    font-family: ${({ theme }) => theme.robotoFont};
    padding: 0;
    margin-top: 60px;
}
 img {
    width: 100%;
    display: block;
    height: auto;
 }
`;

export default GlobalStyle;
