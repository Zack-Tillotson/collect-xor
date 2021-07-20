import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import cn from 'classnames'

import actions from 'state/actions'
import useCollection from 'data/collection/useCollection'

import Barcode from './Barcode'
import Image from './Image';
import Bool from './Bool';
import Text from './Text'

const formSelector = state => state.addNewItemForm

function Component(props) {
  const {
    formName,
    ...restProps
  } = props
  const collection = useCollection()

  const form = useSelector(formSelector)
  const dispatch = useDispatch()

  const shape = formName.split('.').reduce((shape, path) => shape[path], collection.shape)
  const value = formName.split('.').reduce((value, path) => value[path], form)

  const onUpdate = value => dispatch(actions.formValuesUpdated({name: formName, value}))

  const inputProps = {...restProps, formName, shape, value, onUpdate}
  
  switch(shape.type) {
    case 'barcode': {
      return <Barcode {...inputProps} />
    }
    case 'string': {
      return <Text {...inputProps} />
    }
    case 'boolean': {
      return <Bool {...inputProps} />
    }
    case 'image': {
      return <Image {...inputProps} />
    }
  }
  return 'Input type not supported (' + formName + ', ' + shape.type + ')'
}

export default Component;