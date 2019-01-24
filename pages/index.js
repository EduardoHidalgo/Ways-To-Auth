import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'isomorphic-unfetch';
import clientCredentials from '../src/credentials/client';

// lidiando con contextos -> https://daveceddia.com/usecontext-hook/
// tutorial de firebase con react -> https://react-firebase-js.com/docs/react-firebase-auth/getting-started#setup
// flujos que ocasionan re-render en react -> https://stackoverflow.com/questions/41004631/trace-why-a-react-component-is-re-rendering

export default class Index extends Component {
  state = {
    user: this.props.user,
    value: '',
    messages: this.props.messages,
    error: null
  }

  static async getInitialProps ({ req, query }) {
    const user = req && req.session ? req.session.decodedToken : null
    // don't fetch anything from firebase if the user is not found
    // const snap = user && await req.firebaseServer.database().ref('messages').once('value')
    // const messages = snap && snap.val()
    const messages = null;
    return { user, messages }
  }

  // Este método se ejecuta en cada re-render, así es como es posible
  // llamar este código aunque ya se haya hecho el primer render.
  componentDidMount () {
    firebase.initializeApp(clientCredentials);

    if (this.state.user) {
      this.addDbListener();
    }

    firebase.auth().onAuthStateChanged(user => {

      if (user) {
        this.setState({ user: user });

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
        this.setState({ user: null })
        // eslint-disable-next-line no-undef
        fetch('http://localhost:3001/api/logout', {
          method: 'POST',
          credentials: 'same-origin'
        }).then(() => this.removeDbListener())
      }
    })
  }

  handleLogin = () => {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(function(result) {
      // This gives you a Google Access Token.
      console.log('token: -> ' + result.credential.accessToken);
      // The signed-in user info.
      console.log('usuario: -> ' + result.user.displayName);
     });
  }

  handleLogout = () => {
    firebase.auth().signOut()
    .then(function() { console.log('logout by client successfull')})
    .catch(function(error) {
      console.log(error);
      this.setState({ error: error })
    });
  }

  addDbListener = () => {
    console.log('obteniendo mensajes');
    var db = firebase.firestore();

    let unsubscribe = db.collection('messages').onSnapshot(
      querySnapshot => {
        var messages = {}
        querySnapshot.forEach(function (doc) {
          messages[doc.id] = doc.data()
        })
        if (messages) this.setState({ messages })
      },
      error => {
        console.error(error)
      }
    );

    this.setState({ unsubscribe });
  }

  removeDbListener = () => {
    if (this.state.unsubscribe) {
      this.state.unsubscribe()
    }
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    var db = firebase.firestore()

    const date = new Date().getTime()
    db.collection('messages')
      .doc(`${date}`)
      .set({
        id: date,
        text: this.state.value
      })
    this.setState({ value: '' })
  }

  render () {
    const { user, value, messages, error } = this.state;

    const page = ( 
      <div>
        {user ? (<button onClick={this.handleLogout}>Logout</button>) : 
        (<button onClick={this.handleLogin}>Login</button>)}
        {user && (
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type={'text'} onChange={this.handleChange} placeholder={'add message...'} value={value}/>
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

    return (
     error == null ? page : error
    )
  }
}