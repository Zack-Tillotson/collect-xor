import React from 'react'
import {useState, useEffect} from 'react'
import firebase from 'firebase'

import Login from 'components/Login'
import Page from 'components/Page'

import {logout} from './index'

import titleLogo from 'assets/bgshelf/splash-250x250.webp'

function renderLoginPage() {
  return (
    <Page className="login-page">
      Begin by logging in.
      <Login />
    </Page>
  )
}

function renderLoadingPage() {
  return (
    <Page className="loading-page page__loader">
      <img src={titleLogo} alt="Loading, please wait" />
    </Page>
  )
}

function useAuth() {

  const [isInitialized, updateIsInitialized] = useState(false)
  const [isLoggedIn, updateIsLoggedIn] = useState(false)
  const [user, updateUser] = useState(null)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      updateIsInitialized(true)
      updateUser(user)
      updateIsLoggedIn(!!user)
    });
    return unsubscribe
  }, [])
  
  return {
    isInitialized,
    isLoggedIn,
    user,
    renderLoadingPage,
    renderLoginPage,
    logout,
  }
}

export default useAuth