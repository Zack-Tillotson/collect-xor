import React from 'react';
import cn from 'classnames'
import {Link} from 'react-router-dom'

import './component.scss'

function Component(props) {
  return (
    <div className={cn('add-item', props.className)}>
      <Link 
        to="/app/add/" 
        className="add-item-button --button-like --primary">
          Add item
      </Link>
      <Link 
        to="/app/scan/" 
        className="add-item-button --button-like --primary">
          Scan item
      </Link>
    </div>
  )
}

export default Component;