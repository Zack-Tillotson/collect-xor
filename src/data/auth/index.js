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

let ui = null
function getUi() {
  if(!ui) {
    ui = new firebaseui.auth.AuthUI(firebase.auth())
  }
  return ui
}

// Start the FirebaseUI login Widget using Firebase.
export const init = targetId => {
  getUi().start(targetId, uiConfig)
}

export const logout = () => firebase.auth().signOut()

let isInitializing = false
let isInitialized = false
let user = null
let subscribers = [] // callbacks to invoke with new auth state 

export const getCurrentAuthData = () => ({isInitialized, isLoggedIn: !!user, user})

const initializeAuthDataMonitor = () => {
  isInitializing = true
  firebase.auth().onAuthStateChanged(authUser => {
    isInitialized = true
    user = authUser
    subscribers.forEach(subscriber => subscriber(getCurrentAuthData()))
  });
}

// Subscribe to auth state with this, pass in a callback which will be invoked whenever the auth state
// changes. Invoke the returned function to remove the subscription.
export const subscribe = subscriber => {
  if(!isInitializing) {
    initializeAuthDataMonitor()
  }
  subscribers.push(subscriber)
  return () => subscribers = subscribers.filter(sub => sub !== subscriber)
}