import React, { useEffect, useState } from "react";

import Styled from "styled-components";

import { Authenticate } from "../Goods";
import { Link, useParams, useNavigate } from "react-router-dom";

const ProductPage = () => {
  let navigate = useNavigate();
  let { product_id } = useParams(); // product Id

  let { allProducts, addToCart, userDetails } = Authenticate();

  let [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    let selectedProduct = allProducts.find((item) => item.id == product_id); // finding the all products to get specified product clicked by user
    setProductDetails((prev) => ({ ...prev, ...selectedProduct }));
    return () => setProductDetails({});
  }, [allProducts, product_id]);

  // function to handle adding item to cart
  const handleAddToCart = (product) => {
    let itemToAddToCart = {
      id: product.id,
      category: product.category,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 0,
    };
    addToCart(itemToAddToCart);
  };
  return (
    <Section>
      <Link to="/">Back to Shopping</Link>
      <Product>
        <ImageCon>
          {userDetails.role === "admin" && (
            <Action>
              <i
                onClick={() => navigate(`/admin/delete/${product_id}`)}
                className="fa-solid fa-trash delete"
              ></i>
              <i
                onClick={() => navigate(`/admin/edit/${product_id}`)}
                className="fa-solid fa-pen-to-square edit"
              ></i>
            </Action>
          )}
          <ProductImg src={productDetails.image} alt="product" />
        </ImageCon>

        <DetailGroups>
          <DetailGroup>
            <p>Title:</p>
            <p>{productDetails.title}</p>
          </DetailGroup>

          <DetailGroup>
            <p>Description:</p>
            <p>{productDetails.description}</p>
          </DetailGroup>

          <DetailGroup>
            <p>Price:</p>
            <p>${productDetails.price}</p>
          </DetailGroup>

          <Button onClick={() => handleAddToCart(productDetails)}>
            Add to cart
          </Button>
        </DetailGroups>
      </Product>
    </Section>
  );
};

export default ProductPage;

const Section = Styled.div`
background-color: rgba(0,0,0,0.015);
& a {
  display: block;
  position: sticky;
  top: 60px;
  color: orange;
  font-weight: 900;
  text-decoration: none;
  background-color: #fff;
  z-index: 1;
  padding: 20px;
}
`;

// style for product wrapper
const Product = Styled.div`
position: relative;
padding: 50px;
width: 100%;
margin: auto;
display: flex;
align-items: center;
justify-content: center;
gap: 10px;
@media screen and (max-width:768px) {
  & {
    flex-wrap: wrap;
  }
`;

//style for pfoduct image wrapper
const ImageCon = Styled.div`
width: 50%;
max-width: 600px;
overflow: hidden;
box-shadow: 0px 0px 10px #ccc;
border-radius: 5px;
position: relative;
@media screen and (max-width:768px) {
  & {
    width: 80%;
  }
`;

// style for product image
const ProductImg = Styled.img`
max-width: 800px;
margin: auto;
height: auto;
display: block;


animation: expand;
animation-timing-function: linear;
animation-duration: 2s;
animation-iteration-count: infinite;
@keyframes expand{
  0%{transform: scale(1)}
  50%{transform: scale(1.05)}
  100%{transform: scale(1)}
}
&:hover {
  animation-iteration-count: 0;
}
`;

const DetailGroups = Styled.div`
width: 50%;
@media screen and (max-width:768px) {
  & {
    width: 80%;
  }
`;

const DetailGroup = Styled.div`
padding: 10px;
margin: 5px 0;
& p:nth-child(1){
  text-transform: uppercase;
  color: #333;
}
& p:nth-child(2){
  color: #666;
}
`;

const Button = Styled.button`
background-color: orange;
color: #fff;
font-weight: 900;
font-size: 18px;
border: none;
outline: none;
cursor: pointer;
padding: 10px;
border-radius: 5px;
`;

//Style for delate and edit product
const Action = Styled.div`
position: absolute;
z-index: 1;
top: 5px;
left: 5px;
display: flex;
gap: 10px;
padding: 5px;
background-color: #fff;
border-radius: 5px;
& .delete{
  color: #555;
  font-size: 18px;
  cursor: pointer;
}

& .edit{
  color: #555;
  font-size: 18px;
  cursor: pointer;
}
`;
