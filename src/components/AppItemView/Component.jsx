import React from 'react';
import {Link} from 'react-router-dom'

import {useDispatch} from 'react-redux'
import cn from 'classnames'

import Page from 'components/Page'

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

  const item = collection && collection.items && collection.items.find(item => item.id === itemId)

  if(!item) {
    return auth.renderLoadingPage()
  }
  
  return (
    <Page className="app-item-view item-view">
      <div className="item-view__image" style={{backgroundImage: `url(${item.item.image})`}} />
      <div className="item-view__text">
        <div className="item-view__label">Name:</div>
        <Link to={`/app/${item.id}/`} className="item-list__item">
          <h3 className="item-view__name">
            <span className="item-view__inner">
              {item.item.name}
            </span>
          </h3>
        </Link>
        <div className="item-view__label">Publisher:</div>
        <div className="item-view__publisher">
          <span className="item-view__inner">
            {item.item.publisher}
          </span>
        </div>
      </div>
      <div className="item-view__ownership">
        <div className={cn('item-view__icon', {['item-view__icon--active']: item.ownership.ownIt})}>
          <div className="item-view__icon-img">✓</div>
          <div className="item-view__icon-label">Owned</div>
        </div>
        <div className={cn('item-view__icon', {['item-view__icon--active']: item.ownership.favorite})}>
          <div className={'item-view__icon-img'}>♥</div>
          <div className="item-view__icon-label">Favorite</div>
        </div>
        <div className={cn('item-view__icon', {['item-view__icon--active']: item.ownership.playedIt})}>
          <div className={'item-view__icon-img'}>♟</div>
          <div className="item-view__icon-label">Played</div>
        </div>
      </div>
    </Page>
  );
}

export default Component;