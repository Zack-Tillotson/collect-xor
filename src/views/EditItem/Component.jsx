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

  const {itemId} = props.match.params;

  let item = null
  if(collection.items) {
    item = collection.items.find(item => item.id === itemId)
  }

  return (
     <Page className="app-add-item">
      <h1>Edit item</h1>
      <ItemForm item={item} />
    </Page>
  )
}

export default Component;