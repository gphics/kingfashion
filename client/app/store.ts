import { configureStore } from "@reduxjs/toolkit"
import { stylesSliceReducer } from "./slices/styleSlice"
import { mgtSliceReducer } from "./slices/mgtSlice"

const reduxStore = configureStore({
    reducer: {stylesSliceReducer, mgtSliceReducer}
})

export  default reduxStore