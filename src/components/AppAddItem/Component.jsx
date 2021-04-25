import React from 'react';
import cn from 'classnames'
import './component.scss'

import Page from 'components/Page'

import useAuth from 'data/auth/useAuth'

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
      <h1>Add an item to your collection</h1>
      <div>Headline special attributes</div>
      <div>Longish list of standard attributes</div>
    </Page>
  )
}

export default Component;