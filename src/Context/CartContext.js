import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider(props) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);

  const [cartId, setCartId] = useState('')

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  async function addProductToCard(id) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: id },
        { headers }
      )
      .then((response) => response)
      .catch((err) => err);
  }

  async function getLoggedCart() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((response) => response)
      .catch((err) => err);
  }

  async function removeProductFromCart(id) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers })
      .then((response) => response)
      .catch((err) => err);
  }

  async function updateProductQuantity(id, count) {
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        { headers }
      )
      .then((response) => response)
      .catch((err) => err);
  }

  async function startInitialCartCount() {
    const { data } = await getLoggedCart();
    setNumOfCartItems(data.numOfCartItems);
    setCartId(data?.data._id);
  }
  function payment(x) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
            shippingAddress: x,
        },
        {headers}
      )
      .then((response) => response)
      .catch((err) => err);
  }


  useEffect(() => {
    startInitialCartCount();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addProductToCard,
        getLoggedCart,
        removeProductFromCart,
        updateProductQuantity,
        numOfCartItems,
        setNumOfCartItems,
        startInitialCartCount,
        payment,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
