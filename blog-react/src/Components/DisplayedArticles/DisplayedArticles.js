// Librairie
import React from "react";
import classes from "./DisplayedArticles.module.css"

// Composants
import DisplayedArticle from "./DisplayedArticle/DisplayedArticle";


function DisplayedArticles(props) {


    let displayedArticle = props.articles.map(article => (
        <DisplayedArticle
            key={article.id}
            id={article.id}
            article={article}
            titre={article.titre}
            contenu={article.contenu}
            auteur={article.auteur}
            brouillon={article.brouillon}
            date={article.date}
            slug={article.slug}
        />
    ));



    return (
        <div className={classes.DisplayedArticles}>
            {displayedArticle}
        </div>
    )


}

export default DisplayedArticles;
