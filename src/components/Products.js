import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Styled from "styled-components";

//GOODS IMPORTATION
import { Authenticate } from "../Goods";

const Products = () => {
  let { allProducts, addToCart, userDetails } = Authenticate(); // getting products from context provider

  let navigate = useNavigate();

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
    <ProductSection>
      <ProductTitle>FEATURED PRODUCTS</ProductTitle>

      <ProductItems>
        {allProducts.map((product) => (
          <ProductItem key={product.id}>
            {userDetails.role === "admin" && (
              <Action>
                <i
                  onClick={() => navigate(`/admin/delete/${product.id}`)}
                  className="fa-solid fa-trash delete"
                ></i>
                <i
                  onClick={() => navigate(`/admin/edit/${product.id}`)}
                  className="fa-solid fa-pen-to-square edit"
                ></i>
              </Action>
            )}
            {!product.inStock && <Soldout>Sold Out</Soldout>}
            <ProductItemImg src={product.image} alt="product" />
            <ProductCategory>Category: {product.category}</ProductCategory>
            <ProductItemTitle>Title: {product.title}</ProductItemTitle>
            <ProductPrice>Price: ${product.price}</ProductPrice>
            <Link to={`/product/${product.id}`}>View Product</Link>
            <AddProduct
              onClick={() => handleAddToCart(product)}
              disabled={!product.inStock}
            >
              Add to Cart
            </AddProduct>
          </ProductItem>
        ))}
      </ProductItems>
    </ProductSection>
  );
};

export default Products;

//style for product section
const ProductSection = Styled.div`
width: 100%;
padding: 20px;
border-left: 2px solid #e3e3e3;
`;

//style for product title
const ProductTitle = Styled.h1`
  position: sticky;
  top: 60px;
  text-align: center;
  z-index: 2;
  padding: 20px 0;
  margin-bottom: 20px;
  color: rgb(0, 108, 151);
  background-color: #fff;
  box-shadow: 0px 2px 0px #ccc;
  @media screen and (max-width:568px) {
  & {
    font-size: 1.2rem
  }
}
`;

//style for product ITEM WRAPPER
const ProductItems = Styled.div`
 display: flex;
 flex-wrap: wrap;
 justify-content: center;
 align-items: center;
 gap: 50px;
//  column-gap: 8px;
`;

//style for product ITEM
const ProductItem = Styled.div`
position: relative;
padding: 5px;
width: 250px;
max-width: 250px;
// height: 370px;
border-radius: 5px;
box-shadow: 0px 0px 10px #ccc;
overflow: hidden;
font-family: ${({ theme }) => theme.montserratFont};
color: #555;
& a {
  text-decoration: none;
  display: block;
  text-align: center;
  padding: 5px 0;
  color: rgb(0, 108, 151);
  @media screen and (max-width:568px) {
    & {
      font-size: .9rem;
    }
  }
}
@media screen and (max-width:786px) {
  & {
    width: 80%;
  }
}
@media screen and (max-width:568px) {
  & {
    width: 100%;
  }
}
`;

//style for product ITEM IMAGE
const ProductItemImg = Styled.img`
  height: 200px;
  animation: expand;
  animation-timing-function: linear;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  @keyframes expand{
    0%{transform: scaleX(1)}
    50%{transform: scaleX(1.02)}
    100%{transform: scaleX(1)}
  }
  &:hover {
    animation-iteration-count: 0;
}
@media screen and (max-width:568px) {
  & {
    height: 150px;
  }
}
`;
//style for product ITEM CATEGORY
const ProductCategory = Styled.p`
font-size: 1.1rem;
padding: 2px 0;
@media screen and (max-width:568px) {
  & {
    font-size: .9rem;
  }
}
`;

//style for product ITEM TITLE
const ProductItemTitle = Styled.p`
font-size: 1.1rem;
padding: 2px 0;
margin: 5px 0;
@media screen and (max-width:568px) {
  & {
    font-size: .9rem;
  }
}
`;

//style for product ITEM PRICE
const ProductPrice = Styled.p`
font-size: 1.1rem;
padding: 2px 0;
@media screen and (max-width:568px) {
  & {
    font-size: .9rem;
  }
}
`;

//style for product ITEM IMAGE
const AddProduct = Styled.button`
display: block;
padding: 10px;
width: 100%;
color: #fff;
background-color: orange;
border: none;
outline: none;
font-size: 1.2rem;
cursor: ${({ disabled }) => (disabled ? "auto" : "pointer")};
@media screen and (max-width:568px) {
  & {
    font-size: .9rem;
  }
}
`;

//style for sold element
const Soldout = Styled.span`
position: absolute;
z-index: 1;
right: 5px;
background-color: red;
display: block;
padding: 5px;
border-top-left-radius: 50px;
border-bottom-left-radius: 50px;
 color: #fff;
 font-weight: 700;
 font-size: 1rem;
 @media screen and (max-width:568px) {
  & {
    font-size: .9rem;
  }
}
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
