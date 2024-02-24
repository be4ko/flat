import axios from 'axios';
import React, { createContext } from 'react'

export const CartContext =createContext();
export default function CartContextProvider(props){

    let headers = {
        token: localStorage.getItem('userToken')};

    async function addProductToCard(id){
        return await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
        {productId:id},
        {headers}
        ).then(response=>response).catch(err=>err)
    }

    async function getLoggedCart(){
        return await axios.get('https://ecommerce.routemisr.com/api/v1/cart',
        {headers}
        )
        .then(response=>response)
        .catch(err=>err)
    }

    async function removeProductFromCart(id){
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {headers}
        )
        .then(response=>response)
        .catch(err=>err)
    }

    async function updateProductQuantity(id,count){
        return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {count},
        {headers}
        )
        .then(response=>response)
        .catch(err=>err)        
    }

    return <CartContext.Provider value={{addProductToCard,getLoggedCart,removeProductFromCart,updateProductQuantity}}>
        {props.children}
    </CartContext.Provider>
}
