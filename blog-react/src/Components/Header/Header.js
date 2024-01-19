// Librairie
import React from "react";
import classes from "./Header.module.css";

// Composants
import Navigation from "./Navigation/Navigation";

// Composants



function Header(props) {
    return (
        <div className={classes.Header}>
            <div className={classes.logo}>
                Logo
            </div>
            <Navigation user={props.user} />
        </div>
    )
}

export default Header;
