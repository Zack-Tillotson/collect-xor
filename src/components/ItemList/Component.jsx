import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import cn from 'classnames'

import { useDispatch, useSelector } from 'react-redux';

import ItemFavorite from 'components/ItemFavorite'

import actions from 'state/actions'
import formSelector from 'state/selectors/form'

import './component.scss'

const sortOptions = [{
  value: 'name',
  copy: 'Name',
  getValue: item => item.properties.name.toLowerCase(),
  defaultValue: '',
}, {
  value: 'favorite',
  copy: 'Favorite',
  getValue: item => item.ownership.favorite ? -1 : 1,
  defaultValue: 0,
}, {
  value: 'acquired',
  copy: 'Date Acquired',
  getValue: item => item.purchases[0].properties.dateAcquired,
  defaultValue: '',
  reverse: true,
}, {
  value: 'released',
  copy: 'Date Released',
  getValue: item => item.properties.releaseDate,
  defaultValue: '',
  reverse: true,
},{
  value: 'played',
  copy: 'Played Recently',
  getValue: item => item.sessions[item.sessions.length - 1].properties.date,
  defaultValue: '',
  reverse: true,
}]

const sortItems = ({getValue, defaultValue, reverse = false}) => (a, b) => {
  let aValue = defaultValue
  let bValue = defaultValue
  const reverser = reverse ? -1 : 1
  try {
    aValue = getValue(a)
  } catch(e) {}
  try {
    bValue = getValue(b)
  } catch(e) {}

  if(aValue == bValue) return 0
  return reverser * (aValue > bValue ? 1 : -1)
}

function Component(props) {
  const {items} = props

  const [sortedItems, updateSortedItems] = useState(null)
  const dispatch = useDispatch()
  const {listSortOrder = sortOptions[0].value} = useSelector(formSelector)

  const sortOrder = sortOptions.find(option => option.value === listSortOrder)

  useEffect(() => {
    updateSortedItems([...items].sort(sortItems(sortOrder)))
  }, [items, listSortOrder])

  if(!sortedItems) return null

  const handleSortChange = event => dispatch(actions.formValuesUpdated({name: 'listSortOrder', value: event.target.value}))

  return (
    <div className="item-list">
      <div className="item-list__controls">
        <label htmlFor="sort-options" className="item-list__control-label">Sort By</label>
        <select name="sort-options" id="sort-options" className="--button-like --hollow --tight" onChange={handleSortChange} value={sortOrder.value}>
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.copy}
            </option>
          ))}
        </select>
      </div>
      {sortedItems.map(item => {
        const {properties, ownership = {}, purchases, sessions} = item
        const acquireDate = purchases.length > 0 && purchases[0].properties.dateAcquired;
        return (
          <Link to={`/app/${item.id}/`} key={item.id} className="item-list__item item-card">
            {ownership.favorite && (
              <ItemFavorite isFavorite={true} className="item-card__favorite" />
            )}
            <div className="item-card__image">
              <div className="item-card__image-wrapper">
                <div className="item-card__image-inner" style={{backgroundImage: `url("${properties.canonicalImage}")`}} />
              </div>
            </div>
            <div className="item-card__primary-attrs">
              <div className="item-card__year">
                {properties.releaseDate}
              </div>
              <h3 className="item-card__name">
                {properties.name}
              </h3>
              <div className="item-card__desc">
                {properties.description}
              </div>
            </div>
            <div className="item-card__attrs">
              <div className="item-card__label">Designer</div>
              <div className="item-card__publisher">
                <span className="item-card__inner">
                  {properties.designer}
                </span>
              </div>
              <div className="item-card__label">Publisher:</div>
              <div className="item-card__publisher">
                <span className="item-card__inner">
                  {properties.publisher}
                </span>
              </div>
              {properties.price && [
                <div key="label" className="item-card__label">MSRP:</div>
                ,
                <div key="value" className="item-card__publisher">
                  <span className="item-card__inner">
                    {properties.price}
                  </span>
                </div>
              ]}
              {(properties.minPlayers || properties.maxPlayers) && ([
                <div key="label" className="item-card__label">Player Count:</div>
                ,
                <div key="value" className="item-card__players">
                  <span className="item-card__inner">
                    {[properties.minPlayers, properties.maxPlayers].filter(val => !!val).join('-')}
                  </span>
                </div>
              ])}
            </div>
            <div className="item-card__ownership">
              <div className="item-card__ownership-wrapper">
                {purchases.length > 0 && (
                  <div key="ownIt" className={cn('item-card__icon', 'item-card__owned', {['item-card__owned--own-it']: purchases.length > 0})}>
                    <span className="ownership-icon ownership-icon--own">$</span> Owned {acquireDate && `(${acquireDate})`}
                  </div>
                )}
                
                {sessions.length > 0 && (
                  <div key="playedIt" className={cn('item-card__icon', 'item-card__played')}>
                    <span className="ownership-icon ownership-icon--play">♙</span> Played {sessions.length} time{sessions.length > 1 && 's'}
                  </div>
                )}
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Component;