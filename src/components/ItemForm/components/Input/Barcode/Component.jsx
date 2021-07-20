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
  } = props

  const collection = useCollection()

  return (
      <div className={cn('attributes__block', 'primary-attributes__upc', className)}>
        <TextInput {...props} />
        {showLink && (
          <Link to="scan-barcode/" className="attributes__button --button-like --primary">
            Scan
          </Link>
        )}
      </div>
  )
}

export default Component;