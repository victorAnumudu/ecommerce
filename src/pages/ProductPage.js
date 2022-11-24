import React, { useEffect, useState } from "react";

import Styled from "styled-components";

import { Authenticate } from "../ContextProvider";
import { Link, useParams, useNavigate } from "react-router-dom";

import { LoadingPage, FailedPage } from "../components/shared/LoadingPage";

import apiUrl from "../config";

const ProductPage = () => {
  let navigate = useNavigate();
  let { product_id } = useParams(); // product Id

  let { allProducts, addToCart, userDetails } = Authenticate();

  let [productDetails, setProductDetails] = useState([]);

  let [pageIsLoading, setPageIsLoading] = useState({
    loading: true,
    failed: false,
    success: false,
  });

  useEffect(() => {
    fetch(`${apiUrl}/product/${product_id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.status) {
          setTimeout(() => {
            setPageIsLoading({
              loading: false,
              failed: true,
              success: false,
            });
          }, 500);
          return setProductDetails([]);
        }
        // IF REQUEST IS SUCCESSFUL
        setTimeout(() => {
          setPageIsLoading({
            loading: false,
            failed: false,
            success: true,
          });
          setProductDetails([data.message]);
        }, 100);
      })
      .catch((err) => {
        setTimeout(() => {
          setPageIsLoading({
            loading: false,
            failed: true,
            success: false,
          });
          setProductDetails([]);
        }, 500);
      });
  }, [product_id]);

  // function to handle adding item to cart
  const handleAddToCart = (product) => {
    let itemToAddToCart = {
      id: product._id,
      category: product.category,
      title: product.title,
      price: product.price,
      image: product.image.data,
      quantity: 0,
    };
    addToCart(itemToAddToCart);
  };
  return pageIsLoading.success ? (
    productDetails.map((product) => (
      <Section key={product._id}>
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
            <ProductImg src={product.image.data || ""} alt="product" />
          </ImageCon>

          <DetailGroups>
            <DetailGroup>
              <p>Title:</p>
              <p>{product.title}</p>
            </DetailGroup>

            <DetailGroup>
              <p>Description:</p>
              <p>{product.description}</p>
            </DetailGroup>

            <DetailGroup>
              <p>Price:</p>
              <p>&#8358;{product.price}</p>
            </DetailGroup>

            <Button onClick={() => handleAddToCart(product)}>
              Add to cart
            </Button>
          </DetailGroups>
        </Product>
      </Section>
    ))
  ) : (
    <>
      {pageIsLoading.loading && <LoadingPage />}
      {pageIsLoading.failed && <FailedPage />}
    </>
  );
};

export default ProductPage;

const Section = Styled.div`
background-color: rgba(0,0,0,0.015);
min-height: 700px;
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
