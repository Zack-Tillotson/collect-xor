import React from 'react';
import {useDispatch} from 'react-redux'
import cn from 'classnames'

import './component.scss'
import actions from 'state/actions'

import Page from 'components/Page'

import useAuth from 'data/auth/useAuth'
import useCollection from 'data/collection/useCollection'

import PrimaryAttributes from './components/PrimaryAttributes'
import Ownership from './components/Ownership'
import AttributeList from './components/AttributeList'

function Component(props) {

  const auth = useAuth()
  const collection = useCollection()
  const dispatch = useDispatch()

  if(!auth.isInitialized) {
    return auth.renderLoadingPage()
  }
  
  if(!auth.isLoggedIn) {
    return auth.renderLoginPage()
  }

  if(!collection.meta.isInitialized) {
    return auth.renderLoadingPage() 
  }

  let requiredAttrs = {}
  let otherAttrs = {}
  Object.keys(collection.shape.item).forEach(key => {
    const attr = collection.shape.item[key]
    if(attr.required) {
      requiredAttrs[key] = attr
    } else {
      otherAttrs[key] = attr
    }
  })

  const handleFormSubmit = event => {
    dispatch(actions.formSubmittted(auth.user))
  }

  return (
     <Page className="app-add-item">
      <h1>Add an item</h1>
      <PrimaryAttributes attributes={requiredAttrs} className="app-add-item__primary" />
      <div className="app-add-item__ownership">
        <h2>Ownership attributes</h2>
        <Ownership attributes={collection.shape.ownership} />
      </div>
      <div className="app-add-item__attributes">
        <h2>More attributes</h2>
        <AttributeList attributes={otherAttrs} />
      </div>
      <div className="app-add-item__form-controls">
        <button className="--button-like --primary" onClick={handleFormSubmit}>Submit</button>
      </div>
    </Page>
  )
}

export default Component;