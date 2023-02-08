import React, {Component} from "react";
import logo from '../MIREA_Gerb_Colour.png';
import classes from "./Header.module.css";
import {Link, Outlet} from "react-router-dom";

export class Header extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#"><img className={classes.img} src={logo} alt=""/></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">

                                <li className="nav-item">
                                    <Link to="/" className="nav-link active" aria-current="page">ClickCounter</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/RGB" className="nav-link" aria-current="page">RGB</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/chat" className="nav-link" aria-current="page">chat</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Outlet/>
            </div>
        );
    }
}
