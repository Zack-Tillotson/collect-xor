import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import cn from 'classnames'

import './component.scss'
import actions from 'state/actions'

import useAuth from 'data/auth/useAuth'
import useCollection from 'data/collection/useCollection'

import AttributeList from './components/AttributeList'
import Input from './components/Input'

import formSelector from 'state/selectors/form'

function hasMissingRequired(shape, item) {
  
  const isIdValid = !shape.id.required || item.id
  const isPropertiesValid = Object.keys(shape.properties).every(attr => !shape.properties[attr].required || (item.properties||{})[attr])
  const isOwnershipValid = Object.keys(shape.ownership).every(attr => !shape.ownership[attr].required || (item.ownership||{})[attr])
  return isIdValid && isPropertiesValid && isOwnershipValid
}

function Component(props) {

  const auth = useAuth()
  const collection = useCollection()
  const dispatch = useDispatch()
  const form = useSelector(formSelector)
  const [tab, updateTab] = useState('attributes')

  useEffect(() => {
    if(props.item && props.item.id !== form.id) {
      dispatch(actions.formInitialized(props.item))
    }
  }, [])

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

  const handleTabClick = attribute => event => updateTab(attribute)

  return (
     <div className="item-form">
      <div className="item-form__id">
        <Input formName="id" />
      </div>
      <div className="item-form__tabs">
        <h4 className={cn('item-form__tab-title', {['item-form__tab-title--active']: tab === 'attributes'})} onClick={handleTabClick('attributes')}>Attributes</h4>
        <h4 className={cn('item-form__tab-title', {['item-form__tab-title--active']: tab === 'ownership'})} onClick={handleTabClick('ownership')}>Ownership</h4>
      </div>
      {tab === 'attributes' && (
        <div className="item-form__attributes">
          <AttributeList attribute="properties" />
          <div className="item-form__form-controls">
            <button className={cn('--button-like', '--primary', {['--disabled']: !isValid})} onClick={handleFormSubmit}>Submit</button>
          </div>
        </div>
      )}
      {tab === 'ownership' && (
        <div className="item-form__ownership">
          <AttributeList attribute="ownership" />
          <div className="item-form__form-controls">
            <button className={cn('--button-like', '--primary', {['--disabled']: !isValid})} onClick={handleFormSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Component;