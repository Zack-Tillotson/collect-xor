import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import cn from 'classnames'

import actions from 'state/actions'
import useCollection from 'data/collection/useCollection'

import './component.scss'

import useImageUpload from './useImageUpload'

function Component(props) {
  const {
    className,
    formName,
    shape,
    value,
    onUpdate,
  } = props

  const [isImageInput, updateIsImageInput] = useState(!value)

  const {
    uploadImage,
  } = useImageUpload()

  const handleChange = event => onUpdate(event.target.value)

  const handleImageClick = event => updateIsImageInput(true)
  const handleImageInputChange = event => {
    const file = event.target.files[0]
    uploadImage(file).then(onUpdate)
  }
  const handleImageInputDoneClick = event => updateIsImageInput(false)

  return (
    <div className={cn('attributes__block', 'primary-attributes__image', className)}>
      {!isImageInput && <img src={value} className="attributes__image-pic" onClick={handleImageClick} />}
      {isImageInput && [
        <label htmlFor={`image-input__${formName}`} key="1" className="attributes__label">{shape.copy}</label>,
        <input id={`image-input__${formName}`} type="text" value={value || ''} onChange={handleChange} key="2" className="attributes__input" />,
        <button onClick={handleImageInputDoneClick} key="4" className="attributes__button --button-like">Done</button>,
        <input type="file" onChange={handleImageInputChange} key="3" accept="image/*" className="attributes__button" />,
      ]}
    </div>
  )
}

export default Component;