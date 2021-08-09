import React from 'react';
import {Link} from 'react-router-dom'

import {useDispatch} from 'react-redux'
import cn from 'classnames'

import Page from 'components/Page'
import ItemList from 'components/ItemList'
import AddItem from 'components/AddItem'

import useAuth from 'data/auth/useAuth'
import useCollection from 'data/collection/useCollection'

import './component.scss'

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
    <Page className="app-home">
      <div className="app-home__header">
        <h1 className="app-home__title">Collection</h1>
        <AddItem className="app-home__add-item" />
      </div>
      <ItemList items={collection.items} />
    </Page>
  );
}

export default Component;