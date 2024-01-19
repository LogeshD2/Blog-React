// Librairie
import React from "react";
import classes from "./DisplayedArticle.module.css"
import { Link } from "react-router-dom";
import routes from "../../../config/routes";



function DisplayedArticle(props) {


    return (
        <Link to={routes.ARTICLES + '/' + props.slug}>
            <div className={classes.DisplayedArticle} >
                <h1>{props.titre}</h1>
                <p>{props.titre}</p>
                <p>Publiée par {props.auteur}</p>
            </div>
        </Link>
    )
}

export default DisplayedArticle;