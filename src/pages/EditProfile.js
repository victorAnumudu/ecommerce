import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AnchorLink from "../components/Link"; // Link back to home page

import { Authenticate } from "../Goods";

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

  let { user_id } = useParams(); // GETTING USER ID FROM PARAMS
  //will use useeffect to get user detail dynamically
  let [user, setUser] = useState({});

  let handleOnChangeInput = ({ target: { name, value } }) => {
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    setUser(userDetails);
  }, [user_id, userDetails]);

  return (
    <FormContainer>
      <AnchorLink />
      <FormWrapper>
        <Form>
          <FormTitle>Edit Profile</FormTitle>
          <Message className="msg">Opps!</Message>
          <FormGroup>
            <Label>Image</Label>
            <Input type="file" name="image" />
          </FormGroup>
          <FormGroupFlex>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                value={user.name || ""}
                onChange={handleOnChangeInput}
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                disabled={true}
                name="email"
                value={user.email || ""}
              />
            </FormGroup>
          </FormGroupFlex>

          <FormGroupFlex>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={user.password || ""}
                onChange={handleOnChangeInput}
              />
            </FormGroup>
            <FormGroup>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                name="confirm_password"
                value={user.confirm_password || ""}
                onChange={handleOnChangeInput}
              />
            </FormGroup>
          </FormGroupFlex>
          <SubmitWrapper>
            <Button type="submit">Update</Button>
          </SubmitWrapper>
        </Form>
      </FormWrapper>
    </FormContainer>
  );
};

export default EditProfile;
