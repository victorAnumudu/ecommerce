import React from "react";
import { Link } from "react-router-dom";

import SpinnerStyle from "../styles/SpinnerStyle";

import { RegisterContainer } from "../styles/ContainerStyle"; // OVER ALL BODY CONTAINER

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

const Register = () => {
  let handleSubmit = (e) => {
    e.preventDefault();
    let spinner = document.getElementById("rotate");
    spinner.style.display = "block";
    setTimeout(() => {
      spinner.style.display = "none";
    }, 1000);
  };

  return (
    <RegisterContainer>
      <FormContainer>
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <FormTitle>Register</FormTitle>
            <Message className="msg">Opps!</Message>
            <FormGroupFlex>
              <FormGroup>
                <Label>Name</Label>
                <Input type="text" name="name" />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input type="email" name="email" />
              </FormGroup>
            </FormGroupFlex>

            <FormGroupFlex>
              <FormGroup>
                <Label>Password</Label>
                <Input type="password" name="password" />
              </FormGroup>
              <FormGroup>
                <Label>Confirm password</Label>
                <Input type="password" name="comfirmPwd" />
              </FormGroup>
            </FormGroupFlex>

            <FormGroup>
              <Label>Image</Label>
              <Input type="file" name="image" />
            </FormGroup>
            <SubmitWrapper>
              <Button type="submit" name="register">
                Register
              </Button>
            </SubmitWrapper>

            <p>
              Already have Account? <Link to="/login">Login</Link>
            </p>

            <SpinnerStyle id="rotate" />
          </Form>
        </FormWrapper>
      </FormContainer>
    </RegisterContainer>
  );
};

export default Register;
