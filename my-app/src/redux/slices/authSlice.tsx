// src/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Iuser } from "../../Iuser";

interface AuthState {
    isAuthenticated: boolean;
    user: Iuser | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<Iuser>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('user');
        },
        restoreUser: (state) => {
            const user = localStorage.getItem('user');
            if (user) {
                state.user = JSON.parse(user);
                state.isAuthenticated = true;
            }
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
