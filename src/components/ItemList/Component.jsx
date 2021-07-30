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
            {ownership.favorite && (
              <div className={cn('item-card__favorite')}>
                Favorite
              </div>
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
                {ownership.ownIt && (
                  <div key="ownIt" className={cn('item-card__icon', 'item-card__owned', {['item-card__owned--own-it']: ownership.ownIt})}>
                    <span className="ownership-icon ownership-icon--own">$</span> Owned {ownership.acquiredDate && `(${ownership.acquiredDate})`}
                  </div>
                )}
                
                {ownership.playedIt && (
                  <div key="playedIt" className={cn('item-card__icon', 'item-card__played')}>
                    <span className="ownership-icon ownership-icon--play">♙</span> Played
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