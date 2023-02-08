import React from "react";
import { useSelector } from 'react-redux';


export default function FormButton(){
    const buttonState = useSelector(state => state.form.buttonStatus);

    return(
        <button className="btn btn-success" disabled={buttonState}>Submit</button>
    );
}