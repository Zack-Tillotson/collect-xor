import React, {useState} from 'react';
import {Link} from 'react-router-dom'

import {useDispatch} from 'react-redux'
import cn from 'classnames'

import ItemFavorite from 'components/ItemFavorite'

import actions from 'state/actions'

import './component.scss'

function Component(props) {

  const {item, imageClassName, textClassName, displayOwnership = true} = props
  const dispatch = useDispatch()

  const {id, properties, ownership = {}, purchases} = item

  const handleFavoriteClick = event => dispatch(actions.itemUpdated({id, ownership: {favorite: !ownership.favorite}}))

  const acquireDate = purchases.length > 0 && purchases[0].properties.dateAcquired;

  return (
    <div className="item-header">
      <div className="item-header__favorite">
        <ItemFavorite isFavorite={ownership.favorite} onClick={handleFavoriteClick} />
      </div>
      {displayOwnership && (
        <div className="item-header__ownership">
          <div className="item-header__ownership-inner">
          <div className={cn('item-header__stat')}>
              <h3 className="item-header__stat-label">{acquireDate ? 'Owned ' + acquireDate : 'Not owned'}</h3>
              <div className={cn('item-header__stat-img', 'item-header__stat-img--owned', {['item-header__stat-img--inactive']: !acquireDate})}>✓</div>
              <Link to="acquired" className="item-header__stat-cta --button-like --primary --tight">{acquireDate ? 'Remove' : 'I bought this'}</Link>
            </div>
            <div className={cn('item-header__stat')}>
              <h3 className="item-header__stat-label">{ownership.played ? 'Plays' : 'Not Played'}</h3>
              <div className={cn('item-header__stat-img', 'item-header__stat-img--played', {['item-header__stat-img--inactive']: !ownership.owned})}>♟</div>
              <Link to="played" className="item-header__stat-cta --button-like --secondary --tight">I played this</Link>
            </div>
          </div>
        </div>
      )}
      <div key="image" className={cn('item-header__image', imageClassName)}>
        <div className="item-header__image-inner" style={{backgroundImage: `url("${properties.canonicalImage}")`}} />
      </div>
      <div key="text" className={cn('item-header__text', textClassName)}>
        <div className="item-header__label">Name</div>
        <Link to={`/app/${id}/`} className="item-header__item">
          <h1 className="item-header__name">
            {properties.name}
          </h1>
        </Link>
        <div className="item-header__label">Year Published</div>
        <div className="item-header__publisher">
          {properties.releaseDate}
        </div>
      </div>
    </div>
  )
}

export default Component;