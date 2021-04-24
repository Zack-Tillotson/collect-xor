import firebase from 'firebase'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

import '../index' // ensure it's loaded first

const uiConfig = {
  signInSuccessUrl: `${window.location.host}/app/`,
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  tosUrl: () => window.alert('This software is licensed "AS IS" and with all faults.'),
  privacyPolicyUrl: () => window.alert('The owner of this website is the sole owner of data collected by the site, it is not used for commercial purposes. Use at your own risk.')
};

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());

const init = targetId => ui.start(targetId, uiConfig);

export default init