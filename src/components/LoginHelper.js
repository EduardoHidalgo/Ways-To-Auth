import '../bootstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'isomorphic-unfetch';
import clientCredentials from '../credentials/client';
import { Component, useState, useEffect } from 'react';

// lidiando con contextos -> https://daveceddia.com/usecontext-hook/
// tutorial de firebase con react -> https://react-firebase-js.com/docs/react-firebase-auth/getting-started#setup
// flujos que ocasionan re-render en react -> https://stackoverflow.com/questions/41004631/trace-why-a-react-component-is-re-rendering

export default function LoginHelper(props) {
    const [user, setUser] = useState(props.user);
    const [error, setError] = useState('');
    const [unsubscribe, setUnsubscribe] = useState();

    useEffect(() => {
        firebase.initializeApp(clientCredentials);

        if (user) { addDbListener() }

        firebase.auth().onAuthStateChanged(firebaseUser => { 
            if (firebaseUser) {
                setUser(firebaseUser);

                return user.getIdToken()
                .then(token => {
                    console.log('calling API localhost:3001/api/login');
                    return fetch('http://localhost:3001/api/login', {
                        method: 'POST',
                        headers: new Headers({ 'Content-Type': 'application/json' }),
                        credentials: 'same-origin',
                        body: JSON.stringify({ token })
                    })
                })
                .then(res => this.addDbListener())
                .catch(function(error) {
                    console.log('error!');
                    console.log(error);
                });
            } else {
                setUser(null);
                fetch('http://localhost:3001/api/logout', {
                    method: 'POST',
                    credentials: 'same-origin'
                }).then(() => this.removeDbListener())
            }
        });
    }, []);

    function addDbListener() {
        console.log('obteniendo mensajes');
        var db = firebase.firestore();
        // Disable deprecated features
        db.settings({ timestampsInSnapshots: true });
    
        let unsubscribe = db.collection('messages').onSnapshot(
          querySnapshot => {
            var messages = {}
            querySnapshot.forEach(function (doc) {
              messages[doc.id] = doc.data()
            })
            if (messages) console.log(messages);
          },
          error => {
            console.error(error)
          }
        );
    
        setUnsubscribe(unsubscribe);
    }

    function removeDbListener() {
        if (unsubscribe)
            unsubscribe();
    }
}

// versión de getInitialProps para componentes con Hooks
// no se que hace este código.
LoginHelper.getInitialProps = async ({ query }) => {
    const user = req && req.session ? req.session.decodedToken : null
    // don't fetch anything from firebase if the user is not found
    // const snap = user && await req.firebaseServer.database().ref('messages').once('value')
    // const messages = snap && snap.val()
    const messages = null;
    return { user, messages }
};