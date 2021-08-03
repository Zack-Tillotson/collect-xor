import React from 'react';
import cn from 'classnames'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import actions from 'state/actions'

import './component.scss'

function Component(props) {

  const dispatch = useDispatch()

  const handleClick = event => props.onClick && props.onClick(event)
  return (
    <div className={cn('item-favorite', props.className, {['item-favorite--active']: props.onClick, ['item-favorite--is-favorite']: props.isFavorite})} onClick={handleClick}>
      Favorite
    </div>
  )
}

export default Component;