// Librairie
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import firebase from './config/firebase';

// Composants
import Layout from './HOC/Layout/Layout';
import Home from './Containers/Home/Home';
import Articles from './Containers/Articles/Articles';
import Article from './Containers/Articles/Article/Article';
import ManageArticle from './Containers/Admin/Ajouter/ManageArticle';
import Contact from './Components/Contact/Contact';
import routes from './config/routes';
import Authentification from './Containers/Authentification/Authentification';
import MyArticles from '../src/Containers/MyArticles/MyArticles';


function App() {

  const [user, setUser] = useState('');

  useEffect(() => {

    firebase.auth().onAuthStateChanged(user => {

      if (user) {
        setUser(user)
      }
      else {
        setUser('')
      }
    })

  })

  return (
    <div className="App">
      <Layout user={user}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path={routes.ARTICLES} element={<Articles />} />
          <Route path={routes.ARTICLES + "/:slug"} element={<Article user={user} />} />
          <Route exact path={routes.MY_ARTICLES} element={<MyArticles user={user} />} />
          <Route exact path={routes.MANAGE_ARTICLE} element={<ManageArticle user={user} />} />
          <Route exact path={routes.AUTHENTIFICATION} element={<Authentification />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
