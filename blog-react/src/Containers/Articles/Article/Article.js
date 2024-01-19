// Librairie
import axios from "../../../config/axios-firebase";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./Article.module.css";
import routes from "../../../config/routes";
import firebase from "../../../config/firebase";
import { toast } from "react-toastify";
import moment from "moment";
import 'moment/locale/fr';

function Article(props) {

    const [article, setArticle] = useState({})

    const navigate = useNavigate();

    const params = useParams();



    useEffect(() => {

        axios.get('/articles.json?orderBy="slug"&equalTo="' + params.slug + '"')
            .then(response => {
                for (let key in response.data) {
                    setArticle({
                        ...response.data[key],
                        id: key
                    })
                }


            })
            .catch(error => {
                console.log(error)
            })


    }, [])

    useEffect(() => {
        document.title = article.titre
    })


    const buttonClickHandler = () => {

        props.user.getIdToken()
            .then(token => {
                axios.delete('/articles/' + article.id + '.json?auth=' + token)
                    .then(response => {
                        toast.success('Article supprimé avec succès')
                        navigate(routes.ARTICLES, { replace: true })
                    })
                    .catch(error => {
                        console.log(error)
                    })

            })
    }

    const buttonChangeHandler = () => {
        navigate(routes.MANAGE_ARTICLE, { state: { article: article } }, { replace: true })
    }


    moment.locale('fr');
    let date = moment.unix(article.date / 1000).calendar();

    return (
        <div className={classes.Article}>
            <h1 className={classes.titre}>{article.titre}</h1>
            <p className={classes.contenu}>{article.contenu}</p>

            {props.user.uid == article.userId ?

                <div className={classes.button}>
                    <button onClick={buttonChangeHandler}>Modifier</button>
                    <button onClick={buttonClickHandler}>Supprimer</button>
                </div>
                :

                null
            }
            <div className={classes.footer}>
                <span className={classes.auteur}><b>{article.auteur}</b></span>
                <span className={classes.date}>Pulibée {date}</span>
            </div>


        </div >
    );
}

export default Article;