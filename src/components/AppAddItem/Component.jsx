import React from 'react';
import cn from 'classnames'
import './component.scss'

import Page from 'components/Page'

import useAuth from 'data/auth/useAuth'
import useCollection from 'data/collection/useCollection'

import PrimaryAttributes from './components/PrimaryAttributes'
import Ownership from './components/Ownership'
import AttributeList from './components/AttributeList'

function Component(props) {

  const auth = useAuth()
  const collection = useCollection()

  if(!auth.isInitialized) {
    return auth.renderLoadingPage()
  }
  
  if(!auth.isLoggedIn) {
    return auth.renderLoginPage()
  }

  return (
     <Page className="app-add-item">
      <h1>Add an item to your collection</h1>
      <div className="app-add-item__primary">
        <h2>Required attributes</h2>
        <PrimaryAttributes attributes={collection.item} />
      </div>
      <div className="app-add-item__ownership">
        <h2>Ownership attributes</h2>
        <Ownership attributes={collection.ownership} />
      </div>
      <div className="app-add-item__attributes">
        <h2>More attributes</h2>
        <AttributeList attributes={collection.item} />
      </div>
      <div className="app-add-item__form-controls">
        <button className="--button-like --primary">Submit</button>
      </div>
    </Page>
  )
}

export default Component;