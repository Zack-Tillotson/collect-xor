import React from 'react';
import cn from 'classnames'
import './component.scss'

function Component(props) {
  const {items} = props

  if(!items) return null

  return (
    <div className="item-list">
      {items.map(item => {
        return (
          <div key={item.id} className="item-list__item">
            {item.item.name}
          </div>
        )
      })}
    </div>
  )
}

export default Component;