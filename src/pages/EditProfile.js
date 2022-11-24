import React, { useEffect, useState, useRef } from "react";

import AnchorLink from "../components/Link"; // Link back to home page

import Styled from "styled-components";

import SpinnerStyle from "../styles/SpinnerStyle";

import { LoadingPage, FailedPage } from "../components/shared/LoadingPage";

import { Authenticate } from "../ContextProvider";

import apiUrl from "../config";

import {
  FormContainer,
  FormWrapper,
  Form,
  FormGroupFlex,
  FormGroup,
  SubmitWrapper,
  Input,
  Label,
  Button,
  FormTitle,
  Message,
} from "../styles/FormStyle";

const EditProfile = () => {
  let { userDetails } = Authenticate();

  let [pageIsLoading, setPageIsLoading] = useState({
    loading: true,
    failed: false,
    success: false,
  });

  let [img, setImg] = useState("");

  let message = useRef(); // message element for sending sending success or failure message to user
  let [spinner, setSpinner] = useState(false); // spinner element

  let [inputs, setInputs] = useState({
    name: "",
    password: "",
    confirm_password: "",
    image: "",
  });

  //set the initial value of USER DETAILS
  let getUserInfo = async () => {
    try {
      let res = await fetch(`${apiUrl}/user/info`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      // FAILED REQUEST
      if (!data.status) {
        return setPageIsLoading({
          loading: false,
          failed: true,
          success: false,
        });
      }

      setInputs((prev) => {
        return { ...prev, ...data.message };
      });
      setPageIsLoading({
        loading: false,
        failed: false,
        success: true,
      });
    } catch (error) {
      setPageIsLoading({
        loading: false,
        failed: false,
        success: false,
      });
      return;
    }
  };
  useEffect(() => {
    setTimeout(() => {
      getUserInfo();
    }, 500);
  }, []);

  let handleOnChangeInput = ({ target: { name, value, files } }) => {
    if (name === "image") {
      let url = URL.createObjectURL(files[0]);
      setImg(url);
      setInputs({ ...inputs, [name]: files[0]});
    } else {
      setInputs({ ...inputs, [name]: value });
    }
  };

  // FUNCTION TO SUBMIT FORM WHEN USER CLICKS ON UPDATE
  let handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);

    // ARRAY TO HOLD ERROR
    let error = [];

    // DETAILS TO UPDATE
    let infoTOUpdate = {
      name: inputs.name === userDetails.name ? "" : inputs.name,
      password: inputs.password,
      image: inputs.image === userDetails.image ? "" : inputs.image,
    };

    // TEST TO SEE IF INFORMATION TO UPDATE IS SAME AS WHAT IT IS
    for (let info in infoTOUpdate) {
      if (infoTOUpdate[info] !== "") {
        error.push(info);
      }
    }
    if (error.length < 1) {
      message.current.style.color = "darkgreen";
      message.current.textContent =
        "Informations are up to date already. Please update a value and proceed";
      setTimeout(() => {
        setSpinner(false);
      }, 500);
      return;
    }

    //CHECK IF PASSWORD === CONFIRM PASSWORD
    if (inputs.password !== inputs.confirm_password) {
      message.current.style.color = "red";
      message.current.textContent = "password do not match";
      setTimeout(() => {
        setSpinner(false);
      }, 500);
      return;
    }

    // REMOVING EMPTY FEILDS FROM info to Update
    for (let info in infoTOUpdate) {
      if (infoTOUpdate[info] === "") {
        delete infoTOUpdate[info];
      }
    }

    //connecting to backend api
    try {
      const formData = new FormData();
      for (let info in infoTOUpdate) {
        formData.append(info, infoTOUpdate[info]);
      }

      let res = await fetch(`${apiUrl}/user/update`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("token"),
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
      }, 1000);
    } catch (error) {
      message.current.style.color = "red";
      message.current.textContent = "Opps! something went wrong, try again.";
      setTimeout(() => {
        setSpinner(false);
      }, 500);
    }
  };

  return pageIsLoading.success ? (
    <FormContainer>
      <AnchorLink />
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <FormTitle>Edit Profile</FormTitle>
          <FormGroup>
            <UserImg src={img || inputs.image} alt="user photo" />
            <Label>Image</Label>
            <Input type="file" name="image" onChange={handleOnChangeInput} />
          </FormGroup>
          <FormGroupFlex>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="name"
                name="name"
                value={inputs.name}
                onChange={handleOnChangeInput}
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                disabled={true}
                name="email"
                value={inputs.email || ""}
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
                onChange={handleOnChangeInput}
              />
            </FormGroup>
            <FormGroup>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                name="confirm_password"
                value={inputs.confirm_password}
                onChange={handleOnChangeInput}
              />
            </FormGroup>
          </FormGroupFlex>
          <SubmitWrapper>
            <Button type="submit">Update</Button>
          </SubmitWrapper>
          {spinner && <SpinnerStyle />}
          <Message ref={message}></Message>
        </Form>
      </FormWrapper>
    </FormContainer>
  ) : (
    <>
      {pageIsLoading.loading && <LoadingPage />}
      {pageIsLoading.failed && <FailedPage />}
    </>
  );
};

export default EditProfile;

const UserImg = Styled.img`
width: 40%;
max-width: 500px;
border-radius: 100%;
box-shadow: 0px 0px 10px #000;
margin: 10px auto;
`;
