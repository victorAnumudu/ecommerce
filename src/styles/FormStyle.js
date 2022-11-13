import Styled from "styled-components";

// import Image from "../assets/login/login.jpg";

export const FormContainer = Styled.div`
    min-height: 100vh;
`;

// form wrapper element div
export const FormWrapper = Styled.div`
display: flex;
  justify-content: center;
padding: 50px 20px;
`;
// form element style
export const Form = Styled.form`
background-color: rgba(255,255,255,0.8);
position: relative;
padding: 30px;
box-shadow: 0px 0px 10px #aaa;
border-radius: 30px;
width: 90%;
max-width: 1000px;

@media screen and (max-width: 768px){
  &{
    width: 90%;
    margin: 80px auto;
    background-color: rgba(255,255,255,0.9);
  }
}
`;

//Style for form group
export const FormGroupFlex = Styled.div`
display: flex;
gap: 10px;
@media screen and (max-width: 768px){
  &{
    display: block;
  }
}
`;

//Style for form group
export const FormGroup = Styled.div`
padding: 10px 0;
margin: 10px 0;
width: 100%;
`;

//Style for form group
export const SubmitWrapper = Styled.div`
padding: 10px 0;
margin: 10px 0;
`;

//label element style
export const Label = Styled.label`
  font-size: 1.2rem;
  display: block;
  width: 100%;
  `;

//Input element style
export const Input = Styled.input`
  font-size: 1.3rem;
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid orange;
  outline: none;
  `;

// Style for select tag
export const Select = Styled.select`
font-size: 1.3rem;
display: block;
width: 100%;
padding: 10px;
border-radius: 5px;
border: 1px solid orange;
outline: none;
background-color: #fff;
& option {
  color: #555;
  background-color: #fff;
}
`;

// Style for textarea
export const Textarea = Styled.textarea`
font-size: 1.3rem;
display: block;
width: 100%;
padding: 10px;
border-radius: 5px;
border: 1px solid orange;
outline: none;
background-color: #fff;
resize: none;
height: 100px;
`;

//Submit button element style
export const Button = Styled.button`
font-size: 1.3rem;
border-radius: 50px;
padding: 15px;
display: block;
width: 100%;
background-color: orange;
border: none;
cursor: pointer;
color: #fff;
font-weight: 900;
`;

//Form Header style
export const FormTitle = Styled.h1`
    fonst-size: 1.2rem;
    color: orange;
    text-align: center;
    `;

//Form Error Message style
export const Message = Styled.p`
fonst-size: 1.2rem;
margin: 10px 0;
`;
