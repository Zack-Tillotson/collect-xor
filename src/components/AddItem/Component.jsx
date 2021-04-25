import React from 'react';
import cn from 'classnames'
import {Link} from 'react-router-dom'

import './component.scss'

function Component(props) {
  return (
    <Link 
      to="/app/add/" 
      className="add-item-button --button-like --primary">
        <div className="add-item-button__icon">＋</div>
        <div className="add-item-button__label">Add item</div>
    </Link>
  )
}

export default Component;