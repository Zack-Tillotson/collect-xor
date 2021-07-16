import React, { isValidElement } from 'react';

import './component.scss'

import Page from 'components/Page'
import ItemForm from 'components/ItemForm'

import useAuth from 'data/auth/useAuth'
import useCollection from 'data/collection/useCollection'

function Component(props) {

  const auth = useAuth()
  const collection = useCollection()

  if(!auth.isInitialized) {
    return auth.renderLoadingPage()
  }
  
  if(!auth.isLoggedIn) {
    return auth.renderLoginPage()
  }

  if(!collection.meta.isInitialized) {
    return auth.renderLoadingPage() 
  }

  return (
     <Page className="app-add-item">
      <h1>Add an item</h1>
      <ItemForm />
    </Page>
  )
}

export default Component;