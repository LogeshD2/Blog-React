// Librairie
import React, { useState, useEffect } from "react";
import classes from "./Authentification.module.css";
import checkValidity from "../../shared/utility";
import firebase from "../../config/firebase";
import routes from "../../config/routes";

//Composants
import Input from "../../Components/UI/Input/Input";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Authentification(props) {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({

        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email',
            },
            required: {
                empty: '',
                email: ''
            },
            value: '',
            label: 'Email',
            valid: false,
            errorMessage: 'Email incorrect'
        },

        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password',
            },
            required: {
                minLength: 6,
                empty: ''
            },
            value: '',
            label: 'Password',
            valid: false,
            errorMessage: 'Veuillez entrez un mot de passe d\'au moins 6 caractères'
        }
    })

    const [valid, setValid] = useState(false);
    const [registerError, setRegisterError] = useState(false);
    const [loginError, setLoginError] = useState(false);

    useEffect(() => {
        document.title = 'Authentification';
    })

    let formElementArray = [];

    for (let key in inputs) {
        formElementArray.push({
            id: key,
            config: inputs[key]
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


    const registerClickHandler = (event) => {
        event.preventDefault();

        firebase.auth().createUserWithEmailAndPassword(inputs.email.value, inputs.password.value)
            .then(response => {
                toast.success('Félicitations pour votre inscription')
                //navigate(routes.HOME, {replace: true})
            })
            .catch(error => {
                switch (error.code) {
                    case "auth/email-already-in-use":
                        setRegisterError(true)
                        break;
                }
            })

    }

    const loginClickHandler = (event) => {
        event.preventDefault();

        firebase.auth().signInWithEmailAndPassword(inputs.email.value, inputs.password.value)
            .then(response => {
                toast.success('Bienvenue')
                navigate(routes.HOME, { replace: true })
            })
            .catch(error => {
                switch (error.code) {
                    case "auth/invalide-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                    case "auth/wrong-password":
                        setLoginError(true)
                        break;
                }
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
            <h1> Authentification</h1>


            <div className={classes.Authentification}>
                {registerError ? <p className={classes.register}>Email incorrect</p> : null}
                {loginError ? <p className={classes.login}>Impossible de vous connecter</p> : null}
                {formElement}
                <div className={classes.button}>

                    <button type="submit" disabled={!valid} onClick={(e) => registerClickHandler(e)}>
                        Inscription
                    </button>

                    <button type="submit" disabled={!valid} onClick={(e) => loginClickHandler(e)}>
                        Connexion
                    </button>

                </div>
            </div>
        </>
    )
}

export default Authentification;

