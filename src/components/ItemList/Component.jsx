import React from 'react';
import {Link} from 'react-router-dom'
import cn from 'classnames'
import './component.scss'

function Component(props) {
  const {items} = props

  if(!items) return null

  return (
    <div className="item-list">
      {items.map(item => {
        const {properties, ownership = {}} = item
        return (
          <Link to={`/app/${item.id}/`} key={item.id} className="item-list__item item-card">
            <div className="item-card__image" style={{backgroundImage: `url("${properties.canonicalImage}")`}} />
            <div className="item-card__text">
              <div className="item-card__label">Name:</div>
              <h3 className="item-card__name">
                <span className="item-card__inner">
                  {properties.name}
                </span>
              </h3>
              <div className="item-card__label">Publisher:</div>
              <div className="item-card__publisher">
                <span className="item-card__inner">
                  {properties.publisher}
                </span>
              </div>
            </div>
            <div className="item-card__ownership">
              <div className={cn('item-card__icon', {['item-card__icon--active']: ownership.ownIt})}>
                <div className="item-card__icon-img">✓</div>
                <div className="item-card__icon-label">Owned</div>
              </div>
              <div className={cn('item-card__icon', {['item-card__icon--active']: ownership.favorite})}>
                <div className={'item-card__icon-img'}>♥</div>
                <div className="item-card__icon-label">Favorite</div>
              </div>
              <div className={cn('item-card__icon', {['item-card__icon--active']: ownership.playedIt})}>
                <div className={'item-card__icon-img'}>♟</div>
                <div className="item-card__icon-label">Played</div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Component;