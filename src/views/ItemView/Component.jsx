import React, {useState} from 'react';
import {Link} from 'react-router-dom'

import {useDispatch} from 'react-redux'
import cn from 'classnames'

import Page from 'components/Page'
import ItemFavorite from 'components/ItemFavorite'

import useAuth from 'data/auth/useAuth'
import useCollection from 'data/collection/useCollection'
import actions from 'state/actions'

import './component.scss'

function Component(props) {

  const {itemId} = props.match.params;

  const auth = useAuth()
  const collection = useCollection()

  const dispatch = useDispatch()
  const [isAttrsExpanded, updateIsAttrsExpanded] = useState(false)

  
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

  const {id, properties, ownership = {}} = item

  const handleOwnershipClick = attr => event => dispatch(actions.itemUpdated({id: itemId, ownership: {[attr]: !ownership[attr]}}))
  const handleDeleteClick = event => window.confirm('Confirm delete? This can not be undone.') && dispatch(actions.itemDelete(itemId))
  const handleExpandAttrsClicked = event => updateIsAttrsExpanded(!isAttrsExpanded)
  
  return (
    <Page className="app-item-view">
      <div className="item-view">
        <div className="item-view__favorite">
          <ItemFavorite isFavorite={ownership.favorite} onClick={handleOwnershipClick('favorite')} />
        </div>
        <div className="item-view__image" style={{backgroundImage: `url("${properties.canonicalImage}")`}} />
        <div className="item-view__text">
          <div className="item-view__label">Name</div>
          <Link to={`/app/${id}/`} className="item-list__item">
            <h1 className="item-view__name">
              {properties.name}
            </h1>
          </Link>
          <div className="item-view__label">Year Published</div>
          <div className="item-view__publisher">
            <span className="item-view__inner">
              {properties.releaseDate}
            </span>
          </div>
        </div>
        <div className="item-view__ownership">
          <div className="item-view__ownership-inner">
            <button className={cn('item-view__icon --button-like --hollow', {'--primary': ownership.owned})} onClick={handleOwnershipClick('owned')}>
              <div className="item-view__icon-img">✓</div>
              <div className="item-view__icon-label">Owned</div>
            </button>
            <button className={cn('item-view__icon --button-like --hollow', {'--primary': ownership.played})} onClick={handleOwnershipClick('played')}>
              <div className={'item-view__icon-img'}>♟</div>
              <div className="item-view__icon-label">Played</div>
            </button  >
          </div>
        </div>
        <div className="item-view__secondary">
          <h2>Attributes</h2>
          <button className="item-view__secondary-expander --button-like --minimal" onClick={handleExpandAttrsClicked}>
            {isAttrsExpanded ? 'Collapse' : 'Expand'}
          </button>
          {Object.keys(collection.shape.properties).reduce((soFar, key) => {
            const attribute = collection.shape.properties[key]

            if(attribute.type !== 'string') return soFar

            const value = properties[key] || '-'

            return [...soFar, 
              <div key={`${key}-name`} className="item-view__label">
                {attribute.copy}
              </div>
            ,
              <div key={`${key}-value`} className={cn('item-view__value', {['item-view__value--capped']: !isAttrsExpanded})}>
                {value}
              </div>
            ]
          }, [])}
        </div>
        <div className="item-view__controls">
          <Link className="--button-like --hollow" to={`/app/${itemId}/edit/`}>
            Edit
          </Link>
          <button className="--button-like --minimal" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      </div>
    </Page>
  );
}

export default Component;