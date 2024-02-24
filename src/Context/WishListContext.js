import axios from 'axios';
import React, { createContext } from 'react'

export const WishListContext =createContext();
export default function WishListContextProvider(props){

    let headers = {
        token: localStorage.getItem('userToken')};

    async function addProductToWishList(id){
        return await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
        {productId:id},
        {headers}
        ).then(response=>response).catch(err=>err)
    }

    async function getLoggedWishList(){
        return await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',
        {headers}
        )
        .then(response=>response)
        .catch(err=>err)
    }

    async function removeProductFromWishList(id){
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {headers}
        )
        .then(response=>response)
        .catch(err=>err)
    }


    return <WishListContext.Provider value={{addProductToWishList,getLoggedWishList,removeProductFromWishList}}>
        {props.children}
    </WishListContext.Provider>
}
