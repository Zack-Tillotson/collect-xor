import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import cn from 'classnames'

import useCollection from 'data/collection/useCollection'

import TextInput from '../Text'

import './component.scss'

function Component(props) {
  const {
    className,
    ...restProps
  } = props

  return (
      <div className={cn('barcode-input', className)}>
        <TextInput className={cn('barcode-input__input', className)} {...restProps} />
      </div>
  )
}

export default Component;