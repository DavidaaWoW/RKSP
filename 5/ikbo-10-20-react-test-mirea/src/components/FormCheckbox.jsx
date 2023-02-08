import React from "react";
import { useDispatch } from 'react-redux';
import {changeButtonStatus} from "../store/TermsFormSlice";
import classes from "./Form.module.css";


export default function FormCheckbox(){
    const dispatch = useDispatch();

    return(
        <input className={classes.checkbox} type="checkbox" onClick={() => dispatch(changeButtonStatus())} />
    );
}