import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Styled from "styled-components";
import { Authenticate } from "../ContextProvider";

import AnchorLink from "../components/Link"; // Link back to home page

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

const AdminEditProduct = () => {
  let { handleEditProduct, allProducts } = Authenticate();
 
  let productId = useParams().pid;
  console.log(productId)

  let [product, setProduct] = useState({});
  let [img, setImg] = useState("");

  useEffect(() => {
    setProduct(() => allProducts.find((product) => product.id == productId));
  }, [productId]);

  let handleOnChangeInput = ({ target: { name, value, files } }) => {
    setProduct((prev) => {
      if ([name] != "image") {
        return { ...prev, [name]: value };
      } else if (name === "image") {
        let url = URL.createObjectURL(files[0]);
        setImg(url);
        return { ...prev, [name]: files[0] };
      }
    });
  };

  let handleOnSubmit = (e) => {
    e.preventDefault();
    handleEditProduct(product);
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
  return (

    <FormContainer>
      <AnchorLink />
      <FormWrapper>
        <Form onSubmit={handleOnSubmit}>
          <FormTitle>Edit Product</FormTitle>
          <Message className="msg">Opps!</Message>
          <FormGroup>
            <Label>Product Image</Label>
            <ProductImg src={img || product.image} alt="product" />
            <Input type="file" name="image" onChange={handleOnChangeInput} />
          </FormGroup>
          <FormGroupFlex>
            <FormGroup>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={product.title || ""}
                onChange={handleOnChangeInput}
              />
            </FormGroup>
            <FormGroup>
              <Label>Category</Label>
              <Select
                name="category"
                value={product.category || ""}
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
                value={product.price || ""}
                onChange={handleOnChangeInput}
              />
            </FormGroup>
            <FormGroup>
              <Label>In Stock</Label>
              <Select
                name="inStock"
                value={product.inStock}
                onChange={handleOnChangeInput}
              >
                <option value={true}>True</option>
                <option value={false}>False</option>
              </Select>
            </FormGroup>
          </FormGroupFlex>

          <FormGroup>
            <Label>Description</Label>
            <Textarea
              type="text"
              name="description"
              value={product.description || ""}
              onChange={handleOnChangeInput}
            />
          </FormGroup>

          <SubmitWrapper>
            <Button type="submit">Edit Product</Button>
          </SubmitWrapper>
        </Form>
      </FormWrapper>
    </FormContainer>
  );
};

export default AdminEditProduct;

const ProductImg = Styled.img`
width: 50%;
max-width: 500px;
border-radius: 100%;
box-shadow: 0px 0px 10px #000;
margin: 10px auto;
`;
