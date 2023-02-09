import React, {Component} from "react";
import classes from "./RGB.module.css";

export class RGB extends Component{
    constructor(props){
        super(props);
        this.applyColor = this.applyColor.bind(this);
        this.state = {color: props.color ?? "black"};
    }

    applyColor(event){
        const {color} = this.state;
        this.setState({
            color: event.target.value!='' ? event.target.value : color
        });
    }
    render() {
        const {color} = this.state;
        return(
            <div>
                <div className={classes.color} style={{backgroundColor: color}}></div>
                <input onChange={this.applyColor} type="text"/>
            </div>
        );
    }
}