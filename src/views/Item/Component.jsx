import React, {useState} from 'react';
import {Link} from 'react-router-dom'

import {useDispatch} from 'react-redux'
import cn from 'classnames'

import Page from 'components/Page'
import Item from 'components/Item'

import useAuth from 'data/auth/useAuth'
import useCollection from 'data/collection/useCollection'


import './component.scss'

function Component(props) {

  const {itemId} = props.match.params;

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

  const item = collection && collection.items && collection.items.find(item => item.id === itemId)

  if(!item) {
    return auth.renderLoadingPage()
  }

  return (
    <Page className="app-item">
      <Item item={item} itemId={itemId} shape={collection.shape} />
    </Page>
  );
}

export default Component;