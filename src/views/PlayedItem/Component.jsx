import React, {useState} from 'react';
import {Link} from 'react-router-dom'

import {useDispatch} from 'react-redux'
import cn from 'classnames'

import Page from 'components/Page'
import Item from 'components/Item'

import useAuth from 'data/auth/useAuth'
import useCollection from 'data/collection/useCollection'

import ItemHeader from 'components/Item/components/Header'

import './component.scss'

const baseCn = 'app-played-item'

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

  const handleSubmit = event => {}

  return (
    <Page className={baseCn}>
      <ItemHeader item={item} shape={collection.shape} imageClassName={`${baseCn}__image`} textClassName={`${baseCn}__text`} />
      <form onSubmit={handleSubmit} className={`${baseCn}__form`}>
        Form!
      </form>
    </Page>
  );
}

export default Component;