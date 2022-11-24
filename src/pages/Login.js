import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { LoginContainer } from "../styles/ContainerStyle"; // over ALL BODY CONTAINER
import SpinnerStyle from "../styles/SpinnerStyle"; // rotating spinner

import { Authenticate } from "../ContextProvider";

import apiUrl from "../config";

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
  let { logInUser, userDetails } = Authenticate(); // context provider
  let navigate = useNavigate();

  // REDIRECT USER TO HOME PAGE IF LOGGED IN IS TRUE
  useEffect(() => {
    if (userDetails.isLoggedIn) {
      navigate("/");
    }
  });

  let message = useRef(); // message element
  let [spinner, setSpinner] = useState(false); // spinner element

  //STATES FOR INPUTS
  let [inputs, setInputs] = useState({
    password: "",
    email: "",
  });

  let onInputChange = ({ target: { name, value } }) => {
    setInputs({ ...inputs, [name]: value });
  };

  // function to handle when user clicks on login
  let handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    try {
      let res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (!data.status) {
        //what happens if the request is not successful
        message.current.style.color = "red";
        message.current.textContent = data.message;
        setTimeout(() => {
          setSpinner(false);
        }, 500);
        return;
      }
      //what happens if it is successful
      message.current.style.color = "darkgreen";
      message.current.textContent = data.message;
      localStorage.setItem("token", data.token);
      ////setting the inputs fields to empty and redirects user to login page
      setTimeout(() => {
        setSpinner(false);
        setInputs({
          password: "",
          email: "",
        });
        logInUser(); // login user in
      }, 1000);
    } catch (error) {
      message.current.style.color = "red";
      message.current.textContent = "Opps! something went wrong, try again.";
      setTimeout(() => {
        setSpinner(false);
      }, 500);
    }
  };
  return (
    <LoginContainer>
      <FormContainer>
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <FormTitle>Login</FormTitle>
            <Message ref={message}></Message>
            <FormGroupFlex>
              <FormGroup>
                <Label>Email</Label>
                <Input type="email" name="email" onChange={onInputChange} />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  onChange={onInputChange}
                />
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

            {spinner && <SpinnerStyle />}
          </Form>
        </FormWrapper>
      </FormContainer>
    </LoginContainer>
  );
};

export default Login;
