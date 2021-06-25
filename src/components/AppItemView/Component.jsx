import React from 'react';
import {Link} from 'react-router-dom'

import {useDispatch} from 'react-redux'
import cn from 'classnames'

import Page from 'components/Page'

import useAuth from 'data/auth/useAuth'
import useCollection from 'data/collection/useCollection'
import actions from 'state/actions'

import './component.scss'

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


  const handleOwnershipClick = attr => event => dispatch(actions.itemUpdated({id: itemId, ownership: {[attr]: !item.ownership[attr]}}))
  const handleDeleteClick = event => {console.log('delete', 'TODO')}
  
  return (
    <Page className="app-item-view item-view">
      <div className="item-view__image" style={{backgroundImage: `url(${item.item.image})`}} />
      <div className="item-view__text">
        <div className="item-view__label">Name</div>
        <Link to={`/app/${item.id}/`} className="item-list__item">
          <h1 className="item-view__name">
            <span className="item-view__inner">
              {item.item.name}
            </span>
          </h1>
        </Link>
        <div className="item-view__label">Publisher</div>
        <div className="item-view__publisher">
          <span className="item-view__inner">
            {item.item.publisher}
          </span>
        </div>
      </div>
      <div className="item-view__ownership">
        <div className="item-view__ownership-inner">
          <button className={cn('item-view__icon --button-like --hollow', {'--primary': item.ownership.ownIt})} onClick={handleOwnershipClick('ownIt')}>
            <div className="item-view__icon-img">✓</div>
            <div className="item-view__icon-label">Owned</div>
          </button>
          <button className={cn('item-view__icon --button-like --hollow', {'--primary': item.ownership.favorite})} onClick={handleOwnershipClick('favorite')}>
            <div className={'item-view__icon-img'}>♥</div>
            <div className="item-view__icon-label">Favorite</div>
          </button>
          <button className={cn('item-view__icon --button-like --hollow', {'--primary': item.ownership.playedIt})} onClick={handleOwnershipClick('playedIt')}>
            <div className={'item-view__icon-img'}>♟</div>
            <div className="item-view__icon-label">Played</div>
          </button  >
        </div>
      </div>
      <div className="item-view__secondary">
        <h2>Attributes</h2>
        {Object.keys(otherAttrs).reduce((soFar, key) => {
          const attribute = otherAttrs[key]
          return [...soFar, 
            <div key={`${key}-name`} className="item-view__label">
              {attribute.copy}
            </div>
          ,
            <div key={`${key}-value`} className="item-view__value">
              {item.item[key] || '-'}
            </div>
          ]
        }, [])}
      </div>
      <div className="item-view__controls">
        <Link className="--button-like --hollow" to="/app/:itemId/edit">
          Edit
        </Link>
        <button className="--button-like --minimal" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </Page>
  );
}

export default Component;