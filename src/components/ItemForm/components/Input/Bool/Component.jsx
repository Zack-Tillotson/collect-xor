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
    shape,
    value,
    onUpdate,
  } = props

  const collection = useCollection()

  const handleChange = event => onUpdate(!value)

  return (
    <label htmlFor={`${formName}-input`} className={cn('attributes__block', 'bool-input', '--button-like', className, {['--primary']: value, ['--hollow']: !value})}>
      {shape.copy}
      <input id={`${formName}-input`} type="checkbox" value={value ? 'checked' : ''} onChange={handleChange} className="bool-input__input" />
    </label>
  )
}

export default Component;