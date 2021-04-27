import React from 'react'
import {useState, useEffect} from 'react'
import firebase from 'firebase'

import Login from 'components/Login'
import Page from 'components/Page'

import {logout} from './index'

import './styles.scss'

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
    <Page className="loading-page skeleton">
      <div className="skeleton__hero">&nbsp;</div>
      <div className="skeleton__block">&nbsp;</div>
      <div className="skeleton__block">&nbsp;</div>
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