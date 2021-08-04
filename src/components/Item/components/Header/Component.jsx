import React, {useState} from 'react';
import {Link} from 'react-router-dom'

import {useDispatch} from 'react-redux'
import cn from 'classnames'

import actions from 'state/actions'

import './component.scss'

function Component(props) {

  const {item, imageClassName, textClassName} = props

  const {id, properties} = item

  return [(
    <div key="image" className={cn('item-header__image', imageClassName)}>
      <div className="item-header__image-inner" style={{backgroundImage: `url("${properties.canonicalImage}")`}} />
    </div>
  ), (
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
  )];
}

export default Component;