import React from 'react';
import {Link} from 'react-router-dom'

import {useDispatch} from 'react-redux'
import cn from 'classnames'

import Page from 'components/Page'

import useAuth from 'data/auth/useAuth'

import './component.scss'

function Component(props) {

  const auth = useAuth()

  if(!auth.isInitialized) {
    return auth.renderLoadingPage()
  }
  
  if(!auth.isLoggedIn) {
    return auth.renderLoginPage()
  }
  
  return (
    <Page className="app-home">
      <h1>Collection</h1>
    </Page>
  );
}

export default Component;