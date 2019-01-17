import React, { useState } from 'react';
// imports para el sistema de login
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'isomorphic-unfetch';
import clientCredentials from '../src/credentials/client';
import App from '../src/components/App';

function Index(props) {
  const [user, setUser] = useState();
  const [value, setValue] = useState();
  const [messages, setMessages] = useState();
  const [error, setError] = useState();

  return (
    <React.Fragment>
      <App/>
    </React.Fragment>
  )
}

export default Index;