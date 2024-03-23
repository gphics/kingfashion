import { configureStore } from "@reduxjs/toolkit"
import { stylesSliceReducer } from "./slices/styleSlice"

const reduxStore = configureStore({
    reducer: {stylesSliceReducer}
})

export  default reduxStore