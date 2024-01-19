// Librairie
import React, { useEffect, useState } from "react";
import axios from "../../config/axios-firebase";

// Composants
import DisplayedArticles from "../../Components/DisplayedArticles/DisplayedArticles";

function MyArticles(props) {

    const [mesArticles, setMesArticles] = useState([]);

    useEffect(() => {

        axios.get('/articles.json?orderBy="userId"&equalTo="' + props.user.uid + '"')
            .then(response => {
                const nouveauMesArticles = [];
                for (let key in response.data) {
                    nouveauMesArticles.push({
                        ...response.data[key],
                        id: key
                    })
                }
                console.log(nouveauMesArticles);
                setMesArticles(nouveauMesArticles)

            })
            .catch(error => {
                console.log(error)
            })

    }, [])

    console.log(mesArticles)

    return (
        <>
            <h1>Mes Articles</h1>

            <DisplayedArticles articles={mesArticles} />
        </>
    )
}

export default MyArticles;