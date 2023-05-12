import { createSlice } from "@reduxjs/toolkit";
import { axiosEcommerce, getConfig } from "../../utils/configAxios";
import { get } from "react-hook-form";

const initialState = {
    products: [],
    isShowCart: false   

}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        changeIsShowCart: (state) => {
            state.isShowCart = !state.isShowCart;
        },
        setProducts: (state, action) => {
            const newProducts = action.payload;
            state.products = newProducts;
        }
    }
})

export const { changeIsShowCart, setProducts } = cartSlice.actions;
export const getCardProducts = () => (dispatch) => {
    axiosEcommerce
        .get('cart', getConfig())
        .then((res) => dispatch(setProducts(res.data)))
        .catch((err) => console.log(err))
};

export const addProductToCart = (data) => (dispatch) => {
    axiosEcommerce
        .post('cart', data, getConfig())
        .then(() => dispatch(getCardProducts()))
        .catch((err) => console.log(err))
}

export const deleteProductFromCart = (id) => (dispatch) => {
    axiosEcommerce
        .delete(`cart/${id}`, getConfig())
        .then(() => dispatch(getCardProducts()))
        .catch((err) => console.log(err))
}

export const purchaseCart = () => (dispatch) => {
    axiosEcommerce
    .post("purchases", {}, getConfig())
    .then(() => dispatch(getCardProducts()))
    .catch((err) => console.log(err))
}

export default cartSlice.reducer;