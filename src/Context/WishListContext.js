import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const WishListContext = createContext();
export default function WishListContextProvider(props) {
  const [numOfFavItems, setNumOfFavItems] = useState(0);

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  async function addProductToWishList(id) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: id },
        { headers }
      )
      .then((response) => response)
      .catch((err) => err);
  }

  async function getLoggedWishList() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers })
      .then((response) => response)
      .catch((err) => err);
  }

  async function removeProductFromWishList(id) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  async function startInitialFavCount() {
    const { data } = await getLoggedWishList();
    setNumOfFavItems(data.count);
  }

  useEffect(() => {
    startInitialFavCount();
  }, []);

  return (
    <WishListContext.Provider
      value={{
        addProductToWishList,
        getLoggedWishList,
        removeProductFromWishList,
        startInitialFavCount,

        numOfFavItems,
        setNumOfFavItems,
      }}
    >
      {props.children}
    </WishListContext.Provider>
  );
}
