import '../bootstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'isomorphic-unfetch';
import clientCredentials from '../credentials/client';
import { useState, useEffect } from 'react';

// lidiando con contextos -> https://daveceddia.com/usecontext-hook/
// tutorial de firebase con react -> https://react-firebase-js.com/docs/react-firebase-auth/getting-started#setup
// flujos que ocasionan re-render en react -> https://stackoverflow.com/questions/41004631/trace-why-a-react-component-is-re-rendering
// fuente del código -> https://github.com/zeit/next.js/tree/canary/examples/with-firebase-authentication

function LoginHelper(props) {
    const [user, setUser] = useState(props.user);
    const [error, setError] = useState(null);
    const [uid, setUid] = useState(null);
    const [messages, setMessages] = useState(props.messages);
    const [value, setValue] = useState('');

    useEffect(() => {
        // si no existen instancias de firebase, crea una.
        if (!firebase.apps.length)
            firebase.initializeApp(clientCredentials);

        // en caso que ya exista un usuario logeado, directamente procede a
        // descargar el contenido.
        if(user) {
            getMessages();
        }

        // core de la autenticación. promesa que revisa el estado de la autenticación en 
        // caso que detecte en la caché la sesión del usuario.
        firebase.auth().onAuthStateChanged((firebaseUser) => {
            //valida el token nuevamente en caso de que la sesión exista.
            if (firebaseUser) {
                setUser(firebaseUser);
                return firebaseUser.getIdToken()
                .then((token) => {
                    return fetch('http://localhost:8080/api/login', {
                        method: 'POST',
                        headers: new Headers({ 'Content-Type': 'application/json' }),
                        credentials: 'same-origin',
                        body: JSON.stringify({ token })
                    })
                })
                .then(() => {
                    getMessages();
                })
                .catch(function(error) {
                    console.log('error!');
                    console.log(error);
                });
            } else {
                fetch('http://localhost:8080/api/logout', {
                    method: 'POST',
                    credentials: 'same-origin'
                })
            }
        });
    }, []);

    // Hace un llamado a la API para obtener todos los mensajes que
    // le pertenecen al usuario.
    function getMessages() {
        const url = 'http://localhost:8080/api/messages?uid=' + 
            firebase.auth().currentUser.uid;

        fetch(url, {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'same-origin'
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            setMessages(res);
        });
    }

    // realiza la autenticación del usuario por el método de Google. Exige
    // crear las credenciales del usuario y añadirlas a la db de auth.
    function LoginWithGoogle() {
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(function(result) {
            setUid(result.user.uid);
        });
    }

    function LoginWithFacebook() {
        firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(function(result) {
            setUid(result.user.uid);
        });
    }

    // cierra la sesión del usuario y limpia el usuario y los parámetros.
    function handleLogout() {
        firebase.auth().signOut()
        .then(function() { console.log('logout by client successfull')})
        .catch(function(error) {
            console.log(error);
            setError(error);
        });

        setUser(null);
    }

    function handleChange(e) { setValue(e.target.value) }

    // realiza el envio del mensaje por el submit del formulario. 
    function handleSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:8080/api/messages', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'same-origin',
            body: JSON.stringify({ uid: uid, message: value })
        }).then(() => {
            getMessages();
        })

        setValue('');
    }

    // render del html
    const page = (
        <div>
            { user ? <button onClick={()=>handleLogout()}>Logout</button> :
            <div>
                <button onClick={()=>LoginWithGoogle()}>Login with Google</button>
                <button onClick={()=>LoginWithFacebook()}>Login with Facebook</button>
            </div>}

            { user && (
                <div>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <input type={'text'} onChange={(e)=>handleChange(e)} placeholder={'add message...'} value={value}/>
                    </form>
                    <ul>
                        {messages && Object.keys(messages).map(key => (
                            <li key={key}>{messages[key].message}</li>
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

/* ------------ SPLIT LOGIC ---------------------------------------------------------------------------- */
// hook que realiza la autenticación mediante Google
function useHandleGoogleLogin(app) {
    // retorna la promesa, y espera una función .then() posterior a la ejecución
    // de la función para recibir el valor retornado por la promesa.
    return app.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(function(result) {
        return {name: result.user.displayName, uid: result.user.uid}
    });
}

export default LoginHelper;