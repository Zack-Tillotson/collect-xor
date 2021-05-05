import firebase from "firebase/app";
import "firebase/analytics";

import "firebase/auth";
import "firebase/firestore";

import collection from './collection'

const apps = { // TODO move this to a better config location
  'bgshelf': {
    firebaseConfig: {
      apiKey: "AIzaSyBNlRMrS5F5CIymipCqEcN-xcJPsLAwDZU",
      authDomain: "bgshelf.firebaseapp.com",
      projectId: "bgshelf",
      storageBucket: "bgshelf.appspot.com",
      messagingSenderId: "842063608603",
      appId: "1:842063608603:web:33e9b69a4030d5b30271be",
      measurementId: "G-73D8JCK3R7",
    },
    collectionType: 'boardgame',
  },
}

function initialize(store, appId) {

  const config = apps[appId]

  if(!config) throw new Error('appId not recognized: ', appId, ', acceptable values: ', Object.keys(apps))

  firebase.initializeApp(config.firebaseConfig);
  collection.initialize(store, config.collectionType)
}

export default initialize