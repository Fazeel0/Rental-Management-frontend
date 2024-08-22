import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    token: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        // params: {user, token}
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state, action) => {
            state.user = {};
            state.token = ""
        },
    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions

export default userSlice.reducer;