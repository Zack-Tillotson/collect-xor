import firebase from 'firebase'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

import '../index' // ensure core Firebase module is loaded first

const uiConfig = {
  signInSuccessUrl: window.location.href,
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  tosUrl: () => window.alert('This software is licensed "AS IS" and with all faults.'),
  privacyPolicyUrl: () => window.alert('The owner of this website is the sole owner of data collected by the site, it is not used for commercial purposes. Use at your own risk.')
};

// Initialize the FirebaseUI Widget using Firebase.
export const init = targetId => {
  const ui = new firebaseui.auth.AuthUI(firebase.auth())
  ui.start(targetId, uiConfig)
}

export const logout = () => firebase.auth().signOut()
