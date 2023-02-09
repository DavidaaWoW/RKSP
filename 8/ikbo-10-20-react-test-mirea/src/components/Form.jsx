import React from "react";
import classes from "./Form.module.css";
import FormCheckbox from "./FormCheckbox";
import FormButton from "./FormButton";

function FileHelper(pathOfFileToReadFrom)

{
        const request = new XMLHttpRequest();
        request.open("GET", pathOfFileToReadFrom, false);
        request.send(null);
        const returnValue = request.responseText;
        console.log(__dirname);
        return returnValue;
}

const PATH = '/agreement.html';
const text = FileHelper(PATH);

export default function Form(){


    return(
        <div className={classes.formContainer}>
            <p className={classes.formText} dangerouslySetInnerHTML={{__html: text}}></p>
            <div className={classes.inputContainer}>
                <FormCheckbox />
                <FormButton />
            </div>
        </div>
    );
}