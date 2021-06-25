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

  const {item: values} = useSelector(formSelector)
  const dispatch = useDispatch()

  const updateValue = attr => event => dispatch(actions.formValuesUpdated({[attr]: event.target.value}))
  const textInput = (attr, label = attr) => ([
    <label htmlFor={`${attr}-input`} key="1" className="attributes__label">{label}</label>,
    <input id={`${attr}-input`} type="text" value={values[attr] || ''} onChange={updateValue(attr)} key="2" className="attributes__input" />
  ])

  return (
    <div className={cn('attribute-list', className)}>
      {Object.keys(attributes).map(key => {
        const attribute = attributes[key]
        return (
          <div key={key} className={cn('attributes__block', `attributes__${key}`)}>
            {textInput(key, attribute.copy)}
          </div>
        )
      })}
      
    </div>
  )
}

export default Component;