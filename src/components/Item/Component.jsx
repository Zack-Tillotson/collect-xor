import React, {useState} from 'react';
import {Link} from 'react-router-dom'

import {useDispatch} from 'react-redux'
import cn from 'classnames'

import ItemFavorite from 'components/ItemFavorite'
import Header from './components/Header'

import actions from 'state/actions'

import './component.scss'

function Component(props) {

  const {item, itemId, shape} = props

  const dispatch = useDispatch()
  const [expandedAttrs, updateExpandedAttrs] = useState({})

  const {id, properties, ownership = {}} = item

  const handleOwnershipClick = attr => event => dispatch(actions.itemUpdated({id: itemId, ownership: {[attr]: !ownership[attr]}}))
  const handleDeleteClick = event => window.confirm('Confirm delete? This can not be undone.') && dispatch(actions.itemDelete(itemId))
  const handleExpandAttrsClicked = attr => event => updateExpandedAttrs({[attr]: !expandedAttrs[attr]})
  
  return (
    <div className="item-view">
      <div className="item-view__favorite">
        <ItemFavorite isFavorite={ownership.favorite} onClick={handleOwnershipClick('favorite')} />
      </div>
      <Header 
        item={item} 
        shape={shape}
        imageClassName="item-view__image"
        textClassName="item-view__text" />
      <div className="item-view__ownership">
        <div className="item-view__ownership-inner">
        <div className={cn('item-view__stat')}>
            <h3 className="item-view__stat-label">{ownership.owned ? 'Owned ' : 'Not owned'}</h3>
            <div className={cn('item-view__stat-img', 'item-view__stat-img--owned', {['item-view__stat-img--inactive']: !ownership.owned})}>✓</div>
            <Link to="acquired" className="item-view__stat-cta --button-like --primary --tight">{ownership.owned ? 'Remove' : 'I bought this'}</Link>
          </div>
          <div className={cn('item-view__stat')}>
            <h3 className="item-view__stat-label">{ownership.played ? 'Plays' : 'Not Played'}</h3>
            <div className={cn('item-view__stat-img', 'item-view__stat-img--played', {['item-view__stat-img--inactive']: !ownership.owned})}>♟</div>
            <Link to="played" className="item-view__stat-cta --button-like --secondary --tight">I played this</Link>
          </div>
        </div>
      </div>
      <div className="item-view__secondary">
        <h2>Attributes</h2>
        {Object.keys(shape.properties).reduce((soFar, key) => {
          const attribute = shape.properties[key]

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
  );
}

export default Component;