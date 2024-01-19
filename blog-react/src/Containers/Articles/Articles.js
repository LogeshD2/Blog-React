// Librairie
import React, { useEffect, useState } from "react";
import DisplayedArticles from "../../Components/DisplayedArticles/DisplayedArticles";
import axios from "../../config/axios-firebase";

function Articles() {

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


                setArticles(nouveauArticles)
            })
            .catch(error => {
                console.log(error)
            })

    }, []);

    useEffect(() => {
        document.title = 'Articles'
    })

    console.log(articles);

    return (
        <>
            <h1>Articles</h1>

            <DisplayedArticles articles={articles} />
        </>
    )
}

export default Articles;