import React from 'react';
import cn from 'classnames'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import actions from 'state/actions'

import './component.scss'

function Component(props) {

  const dispatch = useDispatch()

  const handleClick = event => dispatch(actions.formInitialized())
  return (
    <div className={cn('add-item', props.className)}>
      <Link 
        to="/app/add/barcode/"
        className="add-item-button --button-like --primary"
        onClick={handleClick}>
          Add item
      </Link>
    </div>
  )
}

export default Component;