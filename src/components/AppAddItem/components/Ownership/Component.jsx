import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import cn from 'classnames'

import actions from 'state/actions'

import './component.scss'

const formSelector = state => state.addNewItemForm

function Component(props) {
  const {
    className,
    attributes,
  } = props

  const {ownership: values} = useSelector(formSelector)
  const dispatch = useDispatch()

  const updateValue = attr => event => dispatch(actions.formOwnershipUpdated({[attr]: event.target.checked}))
  const toggleInput = (attr, label = attr) => ([
    <label htmlFor={`${attr}-input`} key="1">{label}</label>,
    <input id={`${attr}-input`} type="checkbox" checked={!!values[attr]} onChange={updateValue(attr)} key="2" />
  ])

  return (
    <div className={cn('ownership-attributes', className)}>
      {Object.keys(attributes).map(key => {
        const attribute = attributes[key]
        return (
          <div key={key} className={cn(`ownership-attributes__${key}`)}>
            {toggleInput(key, attribute.copy)}
          </div>
        )
      })}
      
    </div>
  )
}

export default Component;