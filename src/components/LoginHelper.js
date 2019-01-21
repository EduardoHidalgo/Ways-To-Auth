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
// fuente del código -> https://github.com/zeit/next.js/tree/canary/examples/with-firebase-authentication

function LoginHelper(props) {
    const [user, setUser] = useState(props.user);
    const [unsubscribe, setUnsubscribe] = useState(null);
    const [error, setError] = useState(null);
    // data del usuario
    const [name, setName] = useState(null);
    const [uid, setUid] = useState(null);

    //data
    const [messages, setMessages] = useState(props.messages);
    const [value, setValue] = useState('');

    useEffect(() => {
        if (firebase)
            firebase.initializeApp(clientCredentials);

        if (user) { addDbListener() }

        firebase.auth().onAuthStateChanged(firebaseUser => { 
            if (firebaseUser) {
                setUser(firebaseUser);

                return firebaseUser.getIdToken()
                .then(token => {
                    return fetch('http://localhost:3001/api/login', {
                        method: 'POST',
                        headers: new Headers({ 'Content-Type': 'application/json' }),
                        credentials: 'same-origin',
                        body: JSON.stringify({ token })
                    })
                })
                .then(res => addDbListener())
                .catch(function(error) {
                    console.log('error!');
                    console.log(error);
                });
            } else {
                setUser(null);
                fetch('http://localhost:3001/api/logout', {
                    method: 'POST',
                    credentials: 'same-origin'
                }).then(() => removeDbListener())
            }
        });
    }, []);

    function addDbListener() {
        var db = firebase.firestore();
    
        let unsubscribe = db.collection('messages').onSnapshot(
          querySnapshot => {
            var messages = {}
            querySnapshot.forEach(function (doc) {
              messages[doc.id] = doc.data()
            })

            if (messages) {
                setMessages(messages);
            }
          },
          error => {
            console.error(error);
          }
        );
    
        setUnsubscribe({ unsubscribe });
    }

    function removeDbListener() {
        if (unsubscribe)
            unsubscribe();
    }

    function handleLogin() {
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(function(result) {
            setName(result.user.displayName);
            setUid(result.user.uid);
        });
    }

    function handleLogout() {
        firebase.auth().signOut()
        .catch(function(error) {
            console.log(error);
            setError(error);
        });
    }

    function handleChange(e) { setValue(e.target.value) }

    function handleSubmit(e) {
        e.preventDefault();
        
        var db = firebase.firestore()

        console.log(uid);

        const date = new Date().getTime()
        db.collection("users")
          .doc(`${uid}`)
          .collection("messages")
          .doc(`${date}`)
          .set({
            id: date,
            text: value
          })
        setValue('');
    }

    const page = (
        <div>
            { user ? <button onClick={()=>handleLogout()}>Logout</button> :
            <button onClick={()=>handleLogin()}>Login</button>}

            { user && (
                <div>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <input type={'text'} onChange={(e)=>handleChange(e)} placeholder={'add message...'} value={value}/>
                    </form>
                    <ul>
                        {messages && Object.keys(messages).map(key => (
                            <li key={key}>{messages[key].text}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );

    return ( error == null ? page : error)
}

// versión de getInitialProps para componentes con Hooks
// no se que hace este código.
LoginHelper.getInitialProps = async ({ query }) => {
    const user = req && req.session ? req.session.decodedToken : null
    const messages = null;
    return { user, messages }
};

export default LoginHelper;