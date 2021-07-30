import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import cn from 'classnames'

import actions from 'state/actions'
import useCollection from 'data/collection/useCollection'

import './component.scss'

const formSelector = state => state.addNewItemForm

function Component(props) {
  const {
    className,
    formName,
    id,
    shape,
    value,
    onUpdate,
  } = props

  const collection = useCollection()

  const handleChange = event => onUpdate(event.target.value)

  return (
    <div className={cn('attributes__block', 'primary-attributes__name', className)}>
      <label htmlFor={`${formName}-input`} className="attributes__label">{shape.copy}</label>
      <input id={id || `${formName}-input`} type="text" value={value || ''} onChange={handleChange} className="attributes__input" />
    </div>
  )
}

export default Component;