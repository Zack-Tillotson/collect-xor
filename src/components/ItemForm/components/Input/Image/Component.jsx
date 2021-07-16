import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import cn from 'classnames'

import actions from 'state/actions'
import useCollection from 'data/collection/useCollection'

import './component.scss'

import useImageUpload from './useImageUpload'

const formSelector = state => state.addNewItemForm

function Component(props) {
  const {
    className,
  } = props
  const collection = useCollection()

  const {properties: values, useBarcodeLookup} = useSelector(formSelector)
  const dispatch = useDispatch()

  const [isImageInput, updateIsImageInput] = useState(!values.image)

  const {
    uploadImage,
  } = useImageUpload()

  const updateValue = attr => event => dispatch(actions.formValuesUpdated({[attr]: event.target.value}))
  const textInput = (attr, label = attr) => ([
    <label htmlFor={`${attr}-input`} key="1" className="attributes__label">{label}</label>,
    <input id={`${attr}-input`} type="text" value={values[attr]} onChange={updateValue(attr)} key="2" className="attributes__input" />
  ])

  const handleImageClick = event => updateIsImageInput(true)
  const handleImageInputChange = event => {
    const file = event.target.files[0]
    uploadImage(file)
      .then(url => {
        updateValue('image')({target: {value: url}})
      })
  }
  const handleImageInputDoneClick = event => updateIsImageInput(false)

  return (
    <div className={cn('primary-attributes', className)}>
      <div className={cn('attributes__block', 'primary-attributes__upc')}>
        {[
          ...textInput('barcode', 'Barcode'), 
          <Link key="3" to="scan-barcode/" className="attributes__button --button-like --primary">
            Scan
          </Link>
        ]}
      </div>
      <div className={cn('attributes__block', 'primary-attributes__image')}>
        {!isImageInput && <img src={values.image} className="attributes__image-pic" onClick={handleImageClick} />}
        {isImageInput && [
          ...textInput('image', 'Image'),
          <button onClick={handleImageInputDoneClick} key="4" className="attributes__button --button-like">Done</button>,
          <input type="file" onChange={handleImageInputChange} key="3" accept="image/*" className="attributes__button" />,
        ]}
      </div>
      <div className={cn('attributes__block', 'primary-attributes__name')}>
        {textInput('name', 'Name')}
      </div>
      <div className={cn('attributes__block', 'primary-attributes__publisher')}>
        {textInput('publisher', 'Publisher')}
      </div>
    </div>
  )
}

export default Component;