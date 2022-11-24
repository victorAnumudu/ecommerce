import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import SpinnerStyle from "../styles/SpinnerStyle";
import Styled from "styled-components";

import { RegisterContainer } from "../styles/ContainerStyle"; // OVER ALL BODY CONTAINER

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

const Register = () => {
  let { userDetails } = Authenticate();
  let navigate = useNavigate();

  // REDIRECT USER TO HOME PAGE IF LOGGED IN IS TRUE
  useEffect(() => {
    if (userDetails.isLoggedIn) {
      navigate("/");
    }
  });

  let message = useRef(); // message element for sending sending success or failure message to user
  let [spinner, setSpinner] = useState(false); // spinner element

  let [img, setImg] = useState(""); // User Selected Image

  let [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirm_pwd: "",
    image: "",
  });

  let onInputChange = ({ target: { name, value, files } }) => {
    if (name === "image") {
      let url = URL.createObjectURL(files[0]);
      setImg(url);
      setInputs({ ...inputs, [name]: files[0] });
    } else {
      setInputs({ ...inputs, [name]: value });
    }
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);

    //connecting to backend api
    try {
      const formData = new FormData();
      for (let input in inputs) {
        formData.append(input, inputs[input]);
      }

      let res = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          // "content-type": "application/json",
        },
        body: formData,
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

      ////setting the inputs fields to empty and redirects user to login page
      setTimeout(() => {
        setSpinner(false);
        setInputs({
          name: "",
          email: "",
          password: "",
          confirm_pwd: "",
          image: "",
        });
        navigate("/login");
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
    <RegisterContainer>
      <FormContainer>
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <FormTitle>Register</FormTitle>
            <Message ref={message}></Message>
            {img != "" && <UserImg src={img} alt="product" />}

            <FormGroupFlex>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={inputs.name}
                  onChange={onInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={inputs.email}
                  onChange={onInputChange}
                />
              </FormGroup>
            </FormGroupFlex>

            <FormGroupFlex>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={inputs.password}
                  onChange={onInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Confirm password</Label>
                <Input
                  type="password"
                  name="confirm_pwd"
                  value={inputs.confirm_pwd}
                  onChange={onInputChange}
                />
              </FormGroup>
            </FormGroupFlex>

            <FormGroup>
              <Label>Image</Label>
              <Input type="file" name="image" onChange={onInputChange} />
            </FormGroup>
            <SubmitWrapper>
              <Button type="submit" name="register">
                Register
              </Button>
            </SubmitWrapper>

            <p>
              Already have Account? <Link to="/login">Login</Link>
            </p>

            {spinner && <SpinnerStyle />}
          </Form>
        </FormWrapper>
      </FormContainer>
    </RegisterContainer>
  );
};

export default Register;

const UserImg = Styled.img`
width: 50%;
max-width: 500px;
border-radius: 100%;
box-shadow: 0px 0px 10px #000;
margin: 10px auto;
`;
