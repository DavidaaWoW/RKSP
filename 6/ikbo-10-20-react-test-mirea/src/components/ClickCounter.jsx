import React, {Component} from "react";
import classes from "./ClickCounter.module.css";

export class ClickCounter extends Component{
    constructor(props){
        super(props);
        this.clickIncrement = this.clickIncrement.bind(this);
        this.state = {clicks: 0};
    }

    clickIncrement(){
        const {clicks} = this.state;
        this.setState({
            clicks: clicks+1
        });
    }
    render() {
        const {clicks} = this.state
        return(
            <div className={classes.ccContainer}>
                <span className={classes.numberContainer}>{clicks}</span>
                <button className="btn btn-success" onClick={this.clickIncrement}>Click</button>
            </div>
        );
    }
}