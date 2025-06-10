import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData: null,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.userData = action.payload.userData;
            state.isLoggedIn = true;
        },
        logout(state) {
            state.userData = null;
            state.isLoggedIn = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
