// Librairie
import React, { useEffect, useState } from "react";
import classes from "./Layout.module.css";
import firebase from "../../config/firebase"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Composants
import Header from "../../Components/Header/Header";



function Layout(props) {

    const [user, setUser] = useState('');
    const [loadingData, setloadingData] = useState(false)



    useEffect(() => {

        firebase.auth().onAuthStateChanged(user => {

            if (user) {
                setUser(user)
            }
            else {
                setUser('')
            }
        })

        setloadingData(true)
    })

    return (
        <div className={classes.Layout}>

            <div className={classes.header}>
                <Header user={props.user} />
            </div>

            <div className="container">
                {loadingData && props.children}
            </div>

            <ToastContainer autoClose="3000" position="bottom-right" pauseOnHover={false} />
        </div>


    )
}

export default Layout;