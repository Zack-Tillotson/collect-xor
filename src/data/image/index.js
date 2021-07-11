import firebase from 'firebase'

// external live dependencies
let userPromiseResolve = null
const context = {
  userPromise: new Promise(resolve => userPromiseResolve = resolve),
}

function awaitUser() {
  return context.userPromise;
}

function handleAuthChange(user) {
  if(user) userPromiseResolve(user)
}

function initialize() {
  firebase.auth().onAuthStateChanged(handleAuthChange)
}

function getRootRef() {
  return firebase.storage().ref()
}

// Given the image and a path, upload the image for the user and return the location
export function uploadItemImage(fileName, file) {
  return awaitUser().then(user => {
    const refPath = `items/${user.uid}/${fileName}`
    const metaData = {
        contentType: file.type,
    }
    return getRootRef()
        .child(refPath)
        .put(file, metaData)
        .then(snapshot => snapshot.ref.getDownloadURL())
  })
}

export default {
  initialize,
  uploadItemImage,
}