import React, { createContext, useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";

import apiUrl from "./config"; // BACKEND API LINK

// import Shoe1 from "./assets/goods/shoe1.webp";
// import Shoe2 from "./assets/goods/shoe2.webp";
// import Shoe3 from "./assets/goods/shoe3.webp";
// import Shoe4 from "./assets/goods/shoe4.webp";
// import Shoe5 from "./assets/goods/shoe5.webp";
// import Cloth1 from "./assets/goods/cloth1.webp";
// import Cloth2 from "./assets/goods/cloth2.jpg";
// import Cloth3 from "./assets/goods/cloth3.webp";
// import Cloth4 from "./assets/goods/cloth4.webp";
// import Cloth5 from "./assets/goods/cloth5.webp";
// import Watch1 from "./assets/goods/watch1.webp";
// import Watch2 from "./assets/goods/watch2.webp";
// import Watch3 from "./assets/goods/watch3.webp";
// import Watch4 from "./assets/goods/watch4.webp";
// import Watch5 from "./assets/goods/watch5.webp";
// import Electronics1 from "./assets/goods/electronics1.webp";
// import Electronics2 from "./assets/goods/electronics2.webp";
// import Electronics3 from "./assets/goods/electronics3.webp";
// import Electronics4 from "./assets/goods/electronics4.webp";
// import Electronics5 from "./assets/goods/electronics5.webp";
// import Glass1 from "./assets/hero/glass1.jpg";
// import Glass2 from "./assets/hero/glass2.jpg";

// let Goods = [
//   {
//     id: 1,
//     title: "Rolex Watch",
//     category: "Watches",
//     inStock: false,
//     price: 100,
//     image: Watch1,
//     description:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,",
//   },
//   {
//     id: 2,
//     title: "Designers Shoe",
//     category: "Shoes",
//     inStock: true,
//     price: 50,
//     image: Shoe1,
//     description:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,",
//   },
//   {
//     id: 3,
//     title: "Men's Cloth",
//     category: "Cloths",
//     inStock: true,
//     price: 70,
//     image: Cloth1,
//     description:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,",
//   },
//   {
//     id: 4,
//     title: "Blue Ray Glass",
//     category: "Glasses",
//     inStock: true,
//     price: 8,
//     image: Glass1,
//     description:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,",
//   },
//   {
//     id: 5,
//     title: "Smart Electronics",
//     category: "Electronics",
//     inStock: false,
//     price: 500,
//     image: Electronics1,
//     description:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,",
//   },
//   {
//     id: 6,
//     title: "Rolex Watch",
//     category: "Watches",
//     inStock: true,
//     price: 30,
//     image: Watch2,
//     description:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,",
//   },
//   {
//     id: 7,
//     title: "Designers Shoe",
//     category: "Shoes",
//     inStock: true,
//     price: 50,
//     image: Shoe2,
//     description:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,",
//   },
//   {
//     id: 8,
//     title: "Men's Cloth",
//     category: "Cloths",
//     inStock: true,
//     price: 20,
//     image: Cloth2,
//     description:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,",
//   },
//   {
//     id: 9,
//     title: "Blue Ray Glass",
//     category: "Glasses",
//     inStock: true,
//     price: 9,
//     image: Glass2,
//     description:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,",
//   },
//   {
//     id: 10,
//     title: "Smart Electronics",
//     category: "Electronics",
//     inStock: true,
//     price: 1000,
//     image: Electronics2,
//     description:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,",
//   },
//   {
//     id: 11,
//     title: "Rolex Watch",
//     category: "Watches",
//     inStock: false,
//     price: 120,
//     image: Watch3,
//     description:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,",
//   },
//   {
//     id: 12,
//     title: "Designers Shoe",
//     category: "Shoes",
//     inStock: true,
//     price: 100,
//     image: Shoe3,
//     description:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,",
//   },
//   {
//     id: 13,
//     title: "Men's Cloth",
//     category: "Cloths",
//     inStock: true,
//     price: 80,
//     image: Cloth3,
//     description:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,",
//   },
//   {
//     id: 14,
//     title: "Blue Ray Glass",
//     category: "Glasses",
//     inStock: true,
//     price: 10,
//     image: Glass1,
//     description:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,",
//   },
//   {
//     id: 15,
//     title: "Smart Electronics",
//     category: "Electronics",
//     inStock: false,
//     price: 500,
//     image: Electronics3,
//     description:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,",
//   },
//   {
//     id: 16,
//     title: "Rolex Watch",
//     category: "Watches",
//     inStock: true,
//     price: 200,
//     image: Watch4,
//     description:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,",
//   },
//   {
//     id: 17,
//     title: "Designers Shoe",
//     category: "Shoes",
//     inStock: true,
//     price: 60,
//     image: Shoe4,
//     description:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,",
//   },
//   {
//     id: 18,
//     title: "Men's Cloth",
//     category: "Cloths",
//     inStock: true,
//     price: 40,
//     image: Cloth4,
//     description:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,",
//   },
//   {
//     id: 19,
//     title: "Blue Ray Glass",
//     category: "Glasses",
//     inStock: true,
//     price: 20,
//     image: Glass2,
//     description:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,",
//   },
//   {
//     id: 20,
//     title: "Smart Electronics",
//     category: "Electronics",
//     inStock: true,
//     price: 900,
//     image: Electronics4,
//     description:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,",
//   },
//   {
//     id: 21,
//     title: "Rolex Watch",
//     category: "Watches",
//     inStock: true,
//     price: 10,
//     image: Watch5,
//     description:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,",
//   },
//   {
//     id: 22,
//     title: "Designers Shoe",
//     category: "Shoes",
//     inStock: true,
//     price: 40,
//     image: Shoe5,
//     description:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,",
//   },
//   {
//     id: 23,
//     title: "Men's Cloth",
//     category: "Cloths",
//     inStock: true,
//     price: 10,
//     image: Cloth5,
//     description:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,",
//   },
//   {
//     id: 24,
//     title: "Blue Ray Glass",
//     category: "Glasses",
//     inStock: true,
//     price: 20,
//     image: Glass1,
//     description:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,",
//   },
//   {
//     id: 25,
//     title: "Smart Electronics",
//     category: "Electronics",
//     inStock: true,
//     price: 600,
//     image: Electronics5,
//     description:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,",
//   },
// ];

// export default Goods;

let AuthContext = createContext();

export const AuthProvider = (props) => {
  let navigate = useNavigate();

  let [allProducts, setAllProducts] = useState([]);

  let [alertMessage, setAlertMessage] = useState({
    show: false,
    message: "",
    color: "red",
  });

  let [cart, setCart] = useState([]); // shopping cart details

  let [loadUser, setLoadUser] = useState(false);

  // active user details
  let [userDetails, setUserDetails] = useState({
    isLoggedIn: false,
    name: "",
    email: "",
    role: "",
  });
  //set the initial value of USER DETAILS
  useEffect(() => {
    let getUserInfo = async () => {
      try {
        let res = await fetch(`${apiUrl}/user/info`, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        const data = await res.json();
        if (data.message) {
          data.message.isLoggedIn = true;
          setUserDetails((prev) => {
            return { ...prev, ...data.message };
          });
        }
      } catch (error) {
        return;
      }
    };
    if (!userDetails.isLoggedIn && localStorage.getItem("token")) {
      getUserInfo();
    }
  }, [loadUser]);

  //Updating user info NOT IN USE FOR NOW
  // let handleUserDetails = (details) => {
  //   setUserDetails(details);
  // };

  //function to handle logging user in
  const logInUser = () => {
    setLoadUser(true);
    navigate("/");
  };
  const logOutUser = () => {
    setLoadUser(false);
    setUserDetails({
      isLoggedIn: false,
      name: "",
      email: "",
      role: "",
    });
    localStorage.removeItem("token");
    navigate("/");
  };

  //set the initial value of ALL PRODUCT
  useEffect(() => {
    // setAllProducts(Goods);
    let getProduct = async () => {
      try {
        let res = await fetch(`${apiUrl}/product`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
        let data = await res.json();
        if (!data.status) {
          setAllProducts([]);
        }
        setAllProducts([...data.message]);
      } catch (error) {
        setAllProducts([]);
      }
    };
    getProduct();
  }, []);

  // function to filter ALL PRODUCTS by CATEGORY
  let handleFilterProduct = async (name) => {
    //make a request to server, then filter
      try {
        let res = await fetch(`${apiUrl}/product`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
        let data = await res.json();
        if (!data.status) {
          setAllProducts([]);
        }
        setAllProducts(() =>
        data.message.filter((product) =>
        name === "all" ? product : product.category.toLowerCase() === name
      )
    );
      } catch (error) {
        setAllProducts([]);
      }

    // let products = Goods;
    // setAllProducts(() =>
    //   products.filter((product) =>
    //     name === "all" ? product : product.category.toLowerCase() === name
    //   )
    // );
  };

  // function to DELETE A PRODUCTS by ID
  let handleDeleteProduct = (id) => {
    setAllProducts((prev) => prev.filter((product) => product.id !== id));
    navigate("/");
  };

  // function to Update A PRODUCTS by ID
  let handleEditProduct = (productToUpdate) => {
    setAllProducts((prev) =>
      prev.map((product) => {
        if (product.id === productToUpdate.id) {
          return { ...product, ...productToUpdate };
        } else {
          return product;
        }
      })
    );
    navigate("/");
  };

  // function to ADD PRODUCT TO CART
  let addToCart = (product) => {
    let newItem = product;
    let newCart; // variable to hold the value to be assigned to SET CART
    let itemExist = cart.find((item) => item.id === newItem.id);
    if (itemExist) {
      setAlertMessage({
        show: true,
        message: "Opps! Item Already in Cart",
        color: "red",
      });
    } else {
      newCart = [...cart, { ...newItem, quantity: 1 }];
      setCart(newCart);
    }
  };

  //function to remove a product from CART
  let removeCartItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Change ITEM QUANTITY
  let changeItemQty = (id, action) => {
    let existingItem = cart.find((item) => item.id === id);
    if (action === "increase") {
      setCart((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : { ...item }
        )
      );
    } else if (action === "decrease" && existingItem.quantity > 1) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : { ...item }
        )
      );
    }
  };

  // values for the context provider
  let values = {
    allProducts,
    handleFilterProduct,
    handleDeleteProduct,
    handleEditProduct,
    cart,
    setCart,
    addToCart,
    removeCartItem,
    changeItemQty,
    alertMessage,
    setAlertMessage,
    userDetails,
    logInUser,
    logOutUser,
  };
  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
};

export const Authenticate = () => {
  return useContext(AuthContext);
};
