import { configureStore } from '@reduxjs/toolkit';
import termsFormReducer from './TermsFormSlice';
import authenticationReducer from './AuthenticationSlice';

export default configureStore({
    reducer: {
        form: termsFormReducer,
        authenticate: authenticationReducer
    },
});