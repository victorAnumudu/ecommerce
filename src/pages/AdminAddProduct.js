import React, { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import AnchorLink from "../components/Link"; // Link back to home page

import SpinnerStyle from "../styles/SpinnerStyle";

import Styled from "styled-components";

import apiUrl from "../config";

import {
  FormContainer,
  FormWrapper,
  Form,
  FormGroupFlex,
  FormGroup,
  SubmitWrapper,
  Input,
  Select,
  Textarea,
  Label,
  Button,
  FormTitle,
  Message,
} from "../styles/FormStyle";

const AdminAddProduct = () => {
  let navigate = useNavigate();

  let message = useRef(); // message element for sending sending success or failure message to user
  let [spinner, setSpinner] = useState(false); // spinner element

  let [inputs, setInputs] = useState({
    title: "",
    category: "",
    price: "",
    image: "",
    description: "",
  });

  let [img, setImg] = useState("");

  let handleOnChangeInput = ({ target: { name, value, files } }) => {
    setInputs((prev) => {
      if (name !== "image") {
        return { ...prev, [name]: value };
      } else if (name === "image") {
        let url = URL.createObjectURL(files[0]);
        setImg(url);
        return { ...prev, [name]: files[0] };
      }
    });
  };

  // values for category of products
  const categories = [
    { name: "Select Option" },
    { name: "Glasses" },
    { name: "Cloths" },
    { name: "Shoes" },
    { name: "Electronics" },
    { name: "Watches" },
  ];

  // FUNCTION TO HANDLE SUBMIT
  let handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);

    //connecting to backend api
    try {
      const formData = new FormData();
      for (let input in inputs) {
        formData.append(input, inputs[input]);
      }
      let res = await fetch(`${apiUrl}/admin/product/add`, {
        method: "POST",
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
        setInputs({
          title: "",
          category: "",
          price: "",
          image: "",
          description: "",
        });
        navigate("/");
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
    <FormContainer>
      <AnchorLink />
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <FormTitle>Add Product</FormTitle>
          <Message ref={message}></Message>
          <FormGroup>
            {img !== "" && <ProductImg src={img} alt="product" />}
            <Label>Product Image</Label>
            <Input type="file" name="image" onChange={handleOnChangeInput} />
          </FormGroup>
          <FormGroupFlex>
            <FormGroup>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={inputs.title || ""}
                onChange={handleOnChangeInput}
              />
            </FormGroup>
            <FormGroup>
              <Label>Category</Label>
              <Select
                name="category"
                value={inputs.category || ""}
                onChange={handleOnChangeInput}
              >
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </FormGroupFlex>

          <FormGroupFlex>
            <FormGroup>
              <Label>Price</Label>
              <Input
                type="number"
                name="price"
                value={inputs.price || ""}
                onChange={handleOnChangeInput}
              />
            </FormGroup>
          </FormGroupFlex>

          <FormGroup>
            <Label>Description</Label>
            <Textarea
              type="text"
              name="description"
              value={inputs.description || ""}
              onChange={handleOnChangeInput}
            />
          </FormGroup>

          <SubmitWrapper>
            <Button type="submit">Add Product</Button>
          </SubmitWrapper>
          {spinner && <SpinnerStyle />}
        </Form>
      </FormWrapper>
    </FormContainer>
  );
};

export default AdminAddProduct;

const ProductImg = Styled.img`
width: 50%;
max-width: 500px;
border-radius: 100%;
box-shadow: 0px 0px 10px #000;
margin: 10px auto;
`;
