import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import cn from 'classnames'

import actions from 'state/actions'

import './component.scss'
import useBarcodeScan from './useBarcodeScan'

// XXX this will be hardcoded for BGShelf for now. Generaliztion to come

const formSelector = state => state.addNewItemForm

function Component(props) {
  const {
    className,
    attributes,
  } = props

  const {
    barcode,
    image,
    name,
    publisher,
  } = attributes


  const {item: values, useBarcodeLookup} = useSelector(formSelector)
  const dispatch = useDispatch()

  const [isImageInput, updateIsImageInput] = useState(!values.image)

  const handleScanEnd = data => {
    if(!data || !data.barcode) return
    dispatch(actions.formValuesUpdated(data))
    if(data.image) updateIsImageInput(true)
  }

  const {
    isScanOpen,
    scanRender,
    startScan,
  } = useBarcodeScan(handleScanEnd, useBarcodeLookup)

  const updateValue = attr => event => dispatch(actions.formValuesUpdated({[attr]: event.target.value}))
  const textInput = (attr, label = attr) => ([
    <label htmlFor={`${attr}-input`} key="1" className="attributes__label">{label}</label>,
    <input id={`${attr}-input`} type="text" value={values[attr]} onChange={updateValue(attr)} key="2" className="attributes__input" />
  ])

  const handleScanClick = event => startScan()
  const handleImageClick = event => updateIsImageInput(true)
  const handleImageInputDoneClick = event => updateIsImageInput(false)

  return (
    <div className={cn('primary-attributes', className)}>
      {scanRender}
      <div className={cn('attributes__block', 'primary-attributes__upc')}>
        {[
          ...textInput('barcode', 'Barcode'), 
          <button key="3" onClick={handleScanClick} className="attributes__button --button-like --primary">
            Scan
          </button>
        ]}
      </div>
      <div className={cn('attributes__block', 'primary-attributes__image')}>
        {!isImageInput && <img src={values.image} className="attributes__image-pic" onClick={handleImageClick} />}
        {isImageInput && [
          ...textInput('image', 'Image URL'),
          <button onClick={handleImageInputDoneClick} key="3" className="attributes__button --button-like">Done</button>
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