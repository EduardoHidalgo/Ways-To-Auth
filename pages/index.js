import React, { Fragment } from 'react';
// imports para el sistema de login
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'isomorphic-unfetch';
import clientCredentials from '../src/credentials/client';
import Main from '../src/components/App';

function Index(props) {
  return (
    <Fragment>
        <Main/>
    </Fragment>
  )
}

export default Index;