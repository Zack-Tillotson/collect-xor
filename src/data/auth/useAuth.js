import React from 'react'
import {useState, useEffect} from 'react'
import firebase from 'firebase'

import Login from 'components/Login'
import Page from 'components/Page'

import {subscribe, getCurrentAuthData, logout} from './index'

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

  const [data, updateData] = useState(getCurrentAuthData())
  
  useEffect(() => {
    return subscribe(updateData)
  }, [])
  
  return {
    ...data,
    renderLoadingPage,
    renderLoginPage,
    logout,
  }
}

export default useAuth