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
  const [expandedAttrs, updateExpandedAttrs] = useState({})

  
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
  const handleExpandAttrsClicked = attr => event => updateExpandedAttrs({[attr]: !expandedAttrs[attr]})
  
  return (
    <Page className="app-item-view">
      <div className="item-view">
        <div className="item-view__favorite">
          <ItemFavorite isFavorite={ownership.favorite} onClick={handleOwnershipClick('favorite')} />
        </div>
        <div className="item-view__image">
          <div className="item-view__image-inner" style={{backgroundImage: `url("${properties.canonicalImage}")`}} />
        </div>
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
          <div className={cn('item-view__stat')}>
              <h3 className="item-view__stat-label">{ownership.owned ? 'Owned ' : 'Not owned'}</h3>
              <div className="item-view__stat-img item-view__stat-img--owned">✓</div>
              <Link to="TODO" className="item-view__stat-cta --button-like --primary --tight">{ownership.owned ? 'Remove' : 'I bought this'}</Link>
            </div>
            <div className={cn('item-view__stat')}>
              <h3 className="item-view__stat-label">{ownership.played ? 'Plays' : 'Not Played'}</h3>
              <div className="item-view__stat-img item-view__stat-img--played">♟</div>
              <Link to="TODO" className="item-view__stat-cta --button-like --secondary --tight">I played this</Link>
            </div>
          </div>
        </div>
        <div className="item-view__secondary">
          <h2>Attributes</h2>
          {Object.keys(collection.shape.properties).reduce((soFar, key) => {
            const attribute = collection.shape.properties[key]

            if(attribute.type !== 'string') return soFar

            const value = properties[key] || '-'

            return [...soFar, 
              <div key={`${key}-name`} className="item-view__label">
                {attribute.copy}
              </div>
            ,
              <div key={`${key}-value`} className={cn('item-view__value', {['item-view__value--capped']: !expandedAttrs[key] && value.length > 75})} onClick={handleExpandAttrsClicked(key)}>
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