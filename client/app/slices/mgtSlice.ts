import { mgtSliceState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: mgtSliceState = {
    login: { value: "" },
    isLoading: false,
    filteredStyles: [],
    allStyles: [],
    currentStyle: { name: "", price: 0, description: "", __v: "", _id: "", images: [], updatedAt: "", createdAt: "", categories: [] },
    search: "",
    allCategories: [],
    categorySearch: "",
    filteredCategories: [],
    currentCategory: { name: "" },
    profile: { email: "", fullname: "", createdAt: "", updatedAt: "", _id: "", password: "", contact: 0 }
}
const slice = createSlice({
    name: "mgtSlice",
    initialState,
    reducers: {
        updateLogin(state: mgtSliceState, { payload }) {
            state.login.value = payload
        },
        updateIsLoading(state: mgtSliceState, { payload }) {
            state.isLoading = payload
        },
        updateFilteredStyles(state: mgtSliceState, { payload }) {
            state.filteredStyles = payload
        }
        ,
        updateAllStyles(state: mgtSliceState, { payload }) {
            state.allStyles = payload
        },
        updateSearch(state: mgtSliceState, { payload }) {
            state.search = payload
        }
        , updateCurrentStyle(state: mgtSliceState, { payload }) {
            state.currentStyle = payload
        }
        , updateAllCategories(state: mgtSliceState, { payload }) {
            state.allCategories = payload
        }
        , updateCurrentStyleContent(state: mgtSliceState, { payload }) {
            const { name, value } = payload
            // @ts-ignore
            state.currentStyle[name] = value
        },
        updateCurrentCategory(state: mgtSliceState, { payload }) {
            state.currentCategory = { ...state.currentCategory, ...payload }
        },
        updateFilteredCategories(state: mgtSliceState, { payload }) {
            state.filteredCategories = payload
        },
        updateCategorySearch(state: mgtSliceState, { payload }) {
            state.categorySearch = payload
        },
        updateSingleProfile(state: mgtSliceState, { payload }) {
            const { name, value }: { name: string, value: string } = payload
            // @ts-ignore
            state.profile[name] = value

        },
        updateProfile(state: mgtSliceState, { payload }) {
            state.profile = payload
        }
    }
})

export const { reducer: mgtSliceReducer, actions: mgtSliceAction } = slice 