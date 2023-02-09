import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'http://localhost:3002';

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        isAuthenticated: false,
        username: '',
        responseCode: 0,
        responseMessage: ''
    },
    reducers: {
        async register(state, action) {
            const username = action.payload.username;
            const password = action.payload.password;

            const jsonBody = {
                username: username,
                password: password
            };

            const headers = { headers: {'Content-Type': 'application/json'}}
            const response = await axios.post(URL+'/register', jsonBody, headers );
            console.log(response.data);
            if(response.data.code == 200){
                state.isAuthenticated = true;
                state.username = username;
                document.cookie = "authenticated=true";
                document.username = "authenticated=" + response.data.username;
            }
            else {
                state.isAuthenticated = false;
                document.cookie = "authenticated=false";
                document.cookie = "username= ";
            }
            state.responseCode = response.data.code;
            state.message = response.data.message;
        },
        async login(state, action){
            const username = action.payload.username;
            const password = action.payload.password;

            const jsonBody = {
                username: username,
                password: password
            };

            const headers = { headers: {'Content-Type': 'application/json'}}
            const response = await axios.post(URL+'/login', jsonBody, headers );

            if(response.code == 200){
                state.isAuthenticated = true;
                state.username = response.data.username;
                document.cookie = "authenticated=true";
                document.username = "authenticated=" + response.data.username;
            }
            else {
                state.isAuthenticated = false;
                document.cookie = "authenticated=false";
                document.cookie = "username= ";
            }
            state.responseCode = response.code;
            state.message = response.message;
        },
        checkAuthentication(){
            console.log(document.cookie);
        }
    },
});

export const {register, login, checkAuthentication} = authenticationSlice.actions;

export default authenticationSlice.reducer;