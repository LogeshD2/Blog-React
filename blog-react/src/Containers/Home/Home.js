// Librairie
import axios from "../../config/axios-firebase";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import routes from "../../config/routes";
import classes from "./Home.module.css"

// Composants
import DisplayedArticles from "../../Components/DisplayedArticles/DisplayedArticles";


function Home() {

    const [articles, setArticles] = useState([]);




    useEffect(() => {

        axios.get('/articles.json')
            .then(response => {
                let nouveauArticles = [];
                for (let key in response.data) {
                    nouveauArticles.push({
                        ...response.data[key],
                        id: key
                    })
                }

                nouveauArticles.reverse();

                nouveauArticles = nouveauArticles.filter(article => article.brouillon == "false")

                nouveauArticles.splice(3)



                setArticles(nouveauArticles);
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        document.title = 'Accueil'
    })

    

    return (
        <div className={classes.Home}>
            <h1>Accueil</h1>
            <DisplayedArticles articles={articles} />
            <p className={classes.allArticles}><Link to={routes.ARTICLES}>Voir tous les articles</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                </svg>
            </p>
        </div>
    )

}


export default Home;

//?orderBy="date"&limitToLast=2