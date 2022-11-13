import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Styled from "styled-components";

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
  Select,
  Label,
  Button,
  FormTitle,
  Message,
} from "../styles/FormStyle";

const AdminDeleteProduct = () => {
  let { handleDeleteProduct, allProducts } = Authenticate();
  let navigate = useNavigate();

  let productId = useParams().pid;

  let [product, setProduct] = useState({});

  useEffect(() => {
    setProduct(() => allProducts.find((product) => product.id == productId));
  }, [productId]);

  //function to handle deleting of product
  let handleOnSubmitDelete = (e) => {
    e.preventDefault();
    handleDeleteProduct(productId);
  };
  return (
    <FormContainer>
      <AnchorLink />
      <FormWrapper>
        <Form onSubmit={handleOnSubmitDelete}>
          <FormTitle>Delete Product</FormTitle>
          <Message className="msg">Opps!</Message>
          <FormGroup>
            <ProductImg src={product.image} alt="product" />
          </FormGroup>
          <FormGroupFlex>
            <FormGroup>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={product.title || ""}
                disabled={true}
              />
            </FormGroup>
            <FormGroup>
              <Label>Category</Label>
              <Select
                name="category"
                value={product.category || ""}
                disabled={true}
              >
                <option value={product.category}>{product.category}</option>
              </Select>
            </FormGroup>
          </FormGroupFlex>

          <SubmitWrapper>
            <Button type="submit">Delete Product</Button>
          </SubmitWrapper>
        </Form>
      </FormWrapper>
    </FormContainer>
  );
};

export default AdminDeleteProduct;

const ProductImg = Styled.img`
width: 50%;
max-width: 500px;
border-radius: 100%;
box-shadow: 0px 0px 10px #000;
margin: 10px auto;
`;
