import { configureStore, createSlice } from "@reduxjs/toolkit"

const authslice = createSlice({
    name: "Auth",
    initialState: {
        isLogin: false,
    },
    reducers: {
        login(state) {
            state.isLogin = true
        },
        logout(state) {
            state.isLogin = false
        }
    }
})
export const authAction = authslice.actions;

export const store = configureStore({
    reducer: authslice.reducer
})