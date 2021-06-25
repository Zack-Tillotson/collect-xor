import React, { isValidElement, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import cn from 'classnames'

import './component.scss'
import actions from 'state/actions'

import useAuth from 'data/auth/useAuth'
import useCollection from 'data/collection/useCollection'

import PrimaryAttributes from './components/PrimaryAttributes'
import Ownership from './components/Ownership'
import AttributeList from './components/AttributeList'

const formSelector = state => state.addNewItemForm

function Component(props) {

  const auth = useAuth()
  const collection = useCollection()
  const dispatch = useDispatch()
  const form = useSelector(formSelector)

  useEffect(() => {
    dispatch(actions.formInitialized(props.item))
  }, [props.item])

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

  const isValid = Object.keys(requiredAttrs).every(key => form.item[key])

  const handleFormSubmit = event => {
    if(!isValid) return
    dispatch(actions.formSubmittted())
  }

  return (
     <div className="item-form">
      <PrimaryAttributes attributes={requiredAttrs} className="app-add-item__primary" />
      <div className="app-add-item__ownership">
        <h2>Ownership</h2>
        <Ownership attributes={collection.shape.ownership} />
      </div>
      <div className="app-add-item__attributes">
        <h2>More attributes</h2>
        <AttributeList attributes={otherAttrs} />
      </div>
      <div className="app-add-item__form-controls">
        <button className={cn('--button-like', '--primary', {['--disabled']: !isValid})} onClick={handleFormSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default Component;