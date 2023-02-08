import { configureStore } from '@reduxjs/toolkit';
import termsFormReducer from './TermsFormSlice';

export default configureStore({
    reducer: {
        form: termsFormReducer,
    },
});