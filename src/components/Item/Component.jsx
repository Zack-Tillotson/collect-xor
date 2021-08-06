import React, {useState} from 'react';
import {Link} from 'react-router-dom'

import {useDispatch} from 'react-redux'
import cn from 'classnames'

import Header from './components/Header'

import actions from 'state/actions'

import './component.scss'

function Component(props) {

  const {item, itemId, shape} = props

  const dispatch = useDispatch()
  const [expandedAttrs, updateExpandedAttrs] = useState({})

  const {id, properties} = item

  const handleDeleteClick = event => window.confirm('Confirm delete? This can not be undone.') && dispatch(actions.itemDelete(itemId))
  const handleExpandAttrsClicked = attr => event => updateExpandedAttrs({[attr]: !expandedAttrs[attr]})
  
  return (
    <div className="item-view">
      <Header 
        item={item} 
        shape={shape}
        className="item-view__header" />
      <div className="item-view__secondary">
        <h2>Attributes</h2>
        {Object.keys(shape.properties).reduce((soFar, key) => {
          const attribute = shape.properties[key]

          if(attribute.type !== 'string') return soFar

          const value = properties[key] || '-'

          return [...soFar, 
            <div key={`${key}-name`} className="item-view__label">
              {attribute.copy}
            </div>
          ,
            <div key={`${key}-value`} className={cn('item-view__value', {['item-view__value--capped']: !expandedAttrs[key] && value.length > 75})} onClick={handleExpandAttrsClicked(key)}>
              {value}
            </div>
          ]
        }, [])}
      </div>
      <div className="item-view__controls">
        <Link className="--button-like --hollow" to={`/app/${itemId}/edit/`}>
          Edit
        </Link>
        <button className="--button-like --minimal" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Component;