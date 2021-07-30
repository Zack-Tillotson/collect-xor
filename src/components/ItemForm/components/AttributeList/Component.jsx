import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import cn from 'classnames'

import useCollection from 'data/collection/useCollection'
import Input from '../Input'

import './component.scss'

function Component(props) {
  const {
    className,
    attribute, // properties or ownership
  } = props

  const collection = useCollection()

  const {[attribute]: shape} = collection.shape

  const formAttrs = Object.keys(shape)
    .filter(attr => !shape[attr].hidden)
    .sort((a, b) => ((shape[a].order || 999) - (shape[b].order || 999)))

  return (
    <div className={cn('attribute-list', className)}>
      {formAttrs.map(key => {
        const property = shape[key]
        return (
          <Input key={key} className={cn('attributes__block', `attributes__${key}`)} formName={`${attribute}.${key}`} />
        )
      })}
    </div>
  )
}

export default Component;