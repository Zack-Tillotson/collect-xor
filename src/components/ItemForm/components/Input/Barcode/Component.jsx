import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import cn from 'classnames'

import actions from 'state/actions'
import useCollection from 'data/collection/useCollection'

import TextInput from '../Text'

import './component.scss'

const formSelector = state => state.addNewItemForm

function Component(props) {
  const {
    className,
  } = props
  const collection = useCollection()

  const {properties: values, useBarcodeLookup} = useSelector(formSelector)
  const dispatch = useDispatch()

  return (
      <div className={cn('attributes__block', 'primary-attributes__upc', className)}>
        <TextInput {...props} />
        <Link to="scan-barcode/" className="attributes__button --button-like --primary">
          Scan
        </Link>
      </div>
  )
}

export default Component;