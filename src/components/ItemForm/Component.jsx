import React, { isValidElement, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import cn from 'classnames'

import './component.scss'
import actions from 'state/actions'

import useAuth from 'data/auth/useAuth'
import useCollection from 'data/collection/useCollection'

import AttributeList from './components/AttributeList'
import Input from './components/Input'

const formSelector = state => state.addNewItemForm

function hasMissingRequired(shape, item) {
  const isIdValid = !shape.id.required || item.id
  const isPropertiesValid = Object.keys(shape.properties).every(attr => !shape.properties[attr].required || item.properties[attr])
  const isOwnershipValid = Object.keys(shape.ownership).every(attr => !shape.ownership[attr].required || item.ownership[attr])
  return isIdValid && isPropertiesValid && isOwnershipValid
}

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

  const isValid = hasMissingRequired(collection.shape, form)

  const handleFormSubmit = event => {
    if(!isValid) return
    dispatch(actions.formSubmittted())
  }

  return (
     <div className="item-form">
      <div className="app-add-item__primary">
        <Input formName="id" />
      </div>
      <div className="app-add-item__ownership">
        <h2>Ownership</h2>
        <AttributeList attribute="ownership" />
      </div>
      <div className="app-add-item__attributes">
        <h2>More attributes</h2>
        <AttributeList attribute="properties" />
      </div>
      <div className="app-add-item__form-controls">
        <button className={cn('--button-like', '--primary', {['--disabled']: !isValid})} onClick={handleFormSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default Component;