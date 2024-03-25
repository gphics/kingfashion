import { createSlice } from "@reduxjs/toolkit";
import { stylesStateInterface } from "@/types";
const initialState: stylesStateInterface = {
    styles: [],
    recentStyles: [],
    currentStyle: {
        name: "",
        images: [],
        description: "",
        createdAt: "",
        updatedAt: "",
        categories: [],
        price: 0,
        __v: "",
        _id: ""

    },
    cartItems: [],
}
const slice = createSlice({
    name: "styleSlice",
    initialState,
    reducers: {
        addRecentStyles(state: stylesStateInterface, action) {
            state.recentStyles = action.payload
        },
        addStyles(state: stylesStateInterface, action) {
            state.styles = action.payload
        },
        addCurrentStyle(state: stylesStateInterface, action) {
            state.currentStyle = action.payload
        },
        updateCartItems(state: stylesStateInterface, action: any) {
            state.cartItems = action.payload
        }
    }
})


export const { actions: StyleSliceAction, reducer: stylesSliceReducer } = slice