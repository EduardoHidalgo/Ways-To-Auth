import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'isomorphic-unfetch';
import clientCredentials from '../../credentials/client';

function useFirebase(props) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // si no existen instancias de firebase, crea una.
    if (!firebase.apps.length)
    firebase.initializeApp(clientCredentials);

    // en caso que ya exista un usuario logeado, directamente procede a
    // descargar el contenido.
    if(user) getMessages()

    // core de la autenticación. promesa que revisa el estado de la autenticación en 
    // caso que detecte en la caché la sesión del usuario.
    firebase.auth().onAuthStateChanged((firebaseUser) => {
        //valida el token nuevamente en caso de que la sesión exista.
        if (firebaseUser) {
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
                // getMessages();
                return ("error! plop, vas a morir.")
            })
            .catch(function(error) {
                console.log('error en la función "useFirebase".');
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

  return { firebase, error };
}

// versión de getInitialProps para componentes con Hooks
// no se que hace este código.
useFirebase.getInitialProps = async ({ query }) => {
  const user = req && req.session ? req.session.decodedToken : null
  const messages = null;
  return { user, messages }
};

export default useFirebase;