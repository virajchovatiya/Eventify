import { createSlice } from '@reduxjs/toolkit';

const userDataFromLocalStorage = JSON.parse(localStorage.getItem("userData"))

const initialState = {
    userData: userDataFromLocalStorage || null,
    isLoggedIn: userDataFromLocalStorage ? true : false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            console.log(action.payload)
            state.userData = action.payload;
            state.isLoggedIn = true;
            const user = JSON.stringify(action.payload)
            localStorage.setItem("userData", user)
        },
        logout(state) {
            state.userData = null;
            state.isLoggedIn = false;
            localStorage.removeItem("userData")
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
