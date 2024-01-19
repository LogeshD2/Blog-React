// Librairie
import React, { useState, useEffect } from "react";
import classes from "./ManageArticle.module.css";
import axios from "../../../config/axios-firebase";
import checkValidity from "../../../shared/utility";
import firebase from "../../../config/firebase";
import { toast } from "react-toastify";

// Composants
import Input from "../../../Components/UI/Input/Input";
import { useLocation, useNavigate } from "react-router-dom";
import fire from "../../../config/firebase";
import routes from "../../../config/routes";



function ManageArticle(props) {

    const { state } = useLocation();
    const navigate = useNavigate()

    console.log(state)

    const [inputs, setInputs] = useState({
        titre: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "Titre de l'article"
            },
            required: {
                empty: ' ',
                minLength: 5,
                maxLength: 80
            },
            value: state && state.article ? state.article.titre : '',
            label: 'Titre',
            valid: state && state.article ? true : false,
            errorMessage: 'Veuillez entrez au moins entre 5 et 80 caractères',
        },

        contenu: {
            elementType: 'textarea',
            elementConfig: {},
            required: {
                empty: ' ',
            },
            value: state && state.article ? state.article.contenu : '',
            label: 'Contenu',
            valid: state && state.article ? true : false,
            errorMessage: '',
        },

        auteur: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Auteur de l\'article'
            },
            required: {
                empty: ' ',
                minLength: 5,
                maxLength: 100
            },
            value: state && state.article ? state.article.auteur : '',
            label: 'Auteur',
            valid: state && state.article ? true : false,
            errorMessage: 'Veuillez entrez au moins entre 5 et 100 caractères',
        },

        brouillon: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {
                        value: true,
                        content: 'Brouillon'
                    },
                    {
                        value: false,
                        content: 'Publiée'
                    }
                ]
            },
            required: {},
            label: 'Etat',
            value: state && state.article ? state.article.brouillon : '',
            valid: true,
            errorMessage: ''
        }
    });

    const [valid, setValid] = useState(state && state.article ? true : false);

    useEffect(() => {
        document.title = 'Gérer un article'
    })


    const userId = props.user.uid
    console.log(userId)
    const date = Date.now().toLocaleString("fr");

    const buttonClickHandler = (event) => {
        event.preventDefault();

        const article = {
            titre: inputs.titre.value,
            contenu: inputs.contenu.value,
            auteur: inputs.auteur.value,
            brouillon: inputs.brouillon.value,
            date: date,
            slug: slug,
            userId: userId
        }


        firebase.auth().currentUser.getIdToken()
            .then(token => {
                if (state && state.article) {

                    axios.put('/articles/' + state.article.id + '.json?auth=' + token, article)
                        .then(response => {
                            toast.success('Article modifé avec succès')
                            navigate(routes.ARTICLES + '/' + article.slug, { replace: true })
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
                else {
                    axios.post('/articles.json?auth=' + token, article)
                        .then(response => {
                            toast.success('Article ajouté avec succès')
                            navigate('/articles', { replace: true })
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }

            })

    }

    const inputChangedHandler = (event, id) => {

        const nouveauInputs = { ...inputs };

        nouveauInputs[id].value = event.target.value;

        nouveauInputs[id].valid = checkValidity(event.target.value, nouveauInputs[id].required)

        let inputValid = true;

        for (let key in nouveauInputs) {
            inputValid = nouveauInputs[key].valid && inputValid;
        }

        setInputs(nouveauInputs);
        setValid(inputValid)

    }


    function generateSlug(str) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to = "aaaaeeeeiiiioooouuuunc------";
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

        return str;
    }

    const slug = generateSlug(inputs.titre.value);


    let formElementArray = [];

    for (let key in inputs) {
        formElementArray.push({
            id: key,
            config: inputs[key]
        })
    }




    let formElement = formElementArray.map(form => (
        <Input
            key={form.id}
            id={form.id}
            elementType={form.config.elementType}
            type={form.config.elementConfig.type}
            placeholder={form.config.elementConfig.placeholder}
            label={form.config.label}
            option={form.config.elementConfig.options}
            value={form.config.value}
            valid={form.config.valid}
            errorMessage={form.config.errorMessage}

            changed={(e) => inputChangedHandler(e, form.id)}

        />

    ));


    return (
        <>
            <h1>Ajouter</h1>

            <form onSubmit={(e) => buttonClickHandler(e)}>
                {formElement}



                <div className={classes.button}>
                    <button type="submit" disabled={!valid}>
                        {state && state.article ? "Modifer l'article" : "Ajouter l'article"}
                    </button>
                </div>
            </form>
        </>
    )
}

export default ManageArticle;