import React from 'react';
import cn from 'classnames'
import './component.scss'

function Component(props) {
  const {items} = props

  if(!items) return null

  return (
    <div className="item-list">
      {items.map((item, index) => {
        return (
          <div key={index} className="item-list__item item-card">
            <div className="item-card__image" style={{backgroundImage: `url(${item.item.image})`}} />
            <div className="item-card__text">
              <div className="item-card__label">Name:</div>
              <h3 className="item-card__name">
                <span className="item-card__inner">
                  {item.item.name}
                </span>
              </h3>
              <div className="item-card__label">Publisher:</div>
              <div className="item-card__publisher">
                <span className="item-card__inner">
                  {item.item.publisher}
                </span>
              </div>
            </div>
            <div className="item-card__ownership">
              <div className={cn('item-card__icon', {['item-card__icon--active']: item.ownership.ownIt})}>
                <div className="item-card__icon-img">✓</div>
                <div className="item-card__icon-label">Owned</div>
              </div>
              <div className={cn('item-card__icon', {['item-card__icon--active']: item.ownership.favorite})}>
                <div className={cn('item-card__icon-img', {['item-card__icon-img--active']: item.ownership.favorite})}>♥</div>
                <div className="item-card__icon-label">Favorite</div>
              </div>
              <div className={cn('item-card__icon', {['item-card__icon--active']: item.ownership.played})}>
                <div className={cn('item-card__icon-img', {['item-card__icon-img--active']: item.ownership.played})}>♟</div>
                <div className="item-card__icon-label">Played</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Component;