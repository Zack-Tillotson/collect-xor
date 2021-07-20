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
    showLink = true,
    ...restProps
  } = props

  const collection = useCollection()

  return (
      <div className={cn('barcode-input', className)}>
        <TextInput className={cn('barcode-input__input', className)} {...restProps} />
        {showLink && (
          <Link to="scan-barcode/" className="barcode-input__button --button-like --primary">
            Scan
          </Link>
        )}
      </div>
  )
}

export default Component;