import React, {Component} from "react";
import {ClickCounter} from "./ClickCounter";

export class Body extends Component{

    render() {
        return(
            <div>
                <ClickCounter></ClickCounter>
            </div>
        );
    }
}