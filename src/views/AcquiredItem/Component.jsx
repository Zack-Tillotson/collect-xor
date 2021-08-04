import React, {useState} from 'react';
import {Link} from 'react-router-dom'

import {useDispatch} from 'react-redux'
import cn from 'classnames'

import Page from 'components/Page'
import Item from 'components/Item'

import useAuth from 'data/auth/useAuth'
import useCollection from 'data/collection/useCollection'

import ItemHeader from 'components/Item/components/Header'
import Input from 'components/ItemForm/components/Input'

import './component.scss'

const baseCn = 'app-aquired-item'

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

  const handleSubmit = event => {
    event.preventDefault()
  }

  return (
    <Page className={baseCn}>
      <ItemHeader item={item} shape={collection.shape} imageClassName={`${baseCn}__image`} textClassName={`${baseCn}__text`} />
      <form onSubmit={handleSubmit} className={`${baseCn}__form`}>
        <Input formName="purchase.properties.dateAcquired" />
        <Input formName="purchase.properties.price" />
        <Input formName="purchase.properties.note" />
        <button className="--button-like --primary">Submit</button>
      </form>
    </Page>
  );
}

export default Component;