import React from "react";
import { Link } from "react-router-dom";

import { LoginContainer } from "../styles/ContainerStyle"; // over ALL BODY CONTAINER
import SpinnerStyle from "../styles/SpinnerStyle"; // rotating spinner

import { Authenticate } from "../Goods";

//form elements
import {
  FormContainer,
  FormWrapper,
  Form,
  FormGroupFlex,
  FormGroup,
  Label,
  Input,
  Button,
  FormTitle,
  Message,
  SubmitWrapper,
} from "../styles/FormStyle";

const Login = () => {
  //
  let { logInUser } = Authenticate(); // context provider

  // function to handle when user clicks on login
  let handleSubmit = (e) => {
    e.preventDefault();
    let spinner = document.getElementById("rotate");
    spinner.style.display = "block";
    setTimeout(() => {
      spinner.style.display = "none";

      logInUser(); // logging user in
    }, 1000);
  };
  return (
    <LoginContainer>
      <FormContainer>
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <FormTitle>Login</FormTitle>
            <Message className="msg">Opps!</Message>
            <FormGroupFlex>
              <FormGroup>
                <Label>Email</Label>
                <Input type="email" name="email" />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input type="password" name="password" />
              </FormGroup>
            </FormGroupFlex>
            <SubmitWrapper>
              <Button type="submit" name="login">
                Login
              </Button>
            </SubmitWrapper>

            <p>
              Don't have Account? <Link to="/signup">Register</Link>
            </p>

            <SpinnerStyle id="rotate" />
          </Form>
        </FormWrapper>
      </FormContainer>
    </LoginContainer>
  );
};

export default Login;
