import React, {useState} from 'react';
import {Link} from 'react-router-dom'

import {useDispatch} from 'react-redux'
import cn from 'classnames'

import Page from 'components/Page'

import useAuth from 'data/auth/useAuth'
import useCollection from 'data/collection/useCollection'
import actions from 'state/actions'

import ItemHeader from 'components/Item/components/Header'
import Input from 'components/ItemForm/components/Input'

import './component.scss'

const baseCn = 'app-aquired-item'

function Component(props) {

  const {itemId} = props.match.params;

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

  const item = collection && collection.items && collection.items.find(item => item.id === itemId)

  if(!item) {
    return auth.renderLoadingPage()
  }

  const handleFormSubmit = event => {
    dispatch(actions.formSubmittted('purchase'))
  }

  return (
    <Page className={baseCn}>
      <ItemHeader item={item} shape={collection.shape} className={`${baseCn}__header`} displayOwnership={false} />
      <form onSubmit={handleFormSubmit} className={`${baseCn}__form`}>
        <Input formName="purchase.properties.dateAcquired" />
        <Input formName="purchase.properties.price" />
        <Input formName="purchase.properties.note" />
        <button className="--button-like --primary">Submit</button>
      </form>
    </Page>
  );
}

export default Component;