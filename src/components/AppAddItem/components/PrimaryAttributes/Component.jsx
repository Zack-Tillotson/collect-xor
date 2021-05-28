import React, {useState} from 'react';
import cn from 'classnames'
import './component.scss'

import useBarcodeScan from './useBarcodeScan'

// XXX this will be hardcoded for BGShelf for now. Generaliztion to come

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

  const [values, updateValues] = useState({
    barcode: '0029877031313',
    image: 'https://images.barcodespider.com/upcimage/0029877031313.jpg',
    name: 'Rivals for CATAN',
    publisher: 'Catan Studio',
  })

  const [isImageInput, updateIsImageInput] = useState(!values.image)

  const handleScanEnd = data => {
    if(!data || !data.barcode) return
    updateValues({...values, ...data})
  }

  const {
    isScanOpen,
    scanRender,
    startScan,
  } = useBarcodeScan(handleScanEnd)

  const updateValue = attr => event => updateValues({...values, [attr]: event.target.value})
  const textInput = (attr, label = attr) => ([
    <label htmlFor={`${attr}-input`} key="1">{label}</label>,
    <input id={`${attr}-input`} type="text" value={values[attr]} onChange={updateValue([attr])} key="2" />
  ])

  const handleScanClick = event => startScan()
  const handleImageClick = event => updateIsImageInput(true)
  const handleImageInputDoneClick = event => updateIsImageInput(false)

  return (
    <div className={cn('primary-attributes', className)}>
      {scanRender}
      <div className={cn('primary-attributes__upc')}>
        {[...textInput('barcode', 'Barcode'), <button key="3" onClick={handleScanClick}>Scan</button>]}
      </div>
      <div className={cn('primary-attributes__image')}>
        {!isImageInput && <img src={values.image} className="primary-attributes__image-pic" onClick={handleImageClick} />}
        {isImageInput && [
          ...textInput('image', 'Image URL'),
          <button onClick={handleImageInputDoneClick} key="3">Done</button>
        ]}
      </div>
      <div className={cn('primary-attributes__name')}>
        {textInput('name', 'Name')}
      </div>
      <div className={cn('primary-attributes__publisher')}>
        {textInput('publisher', 'Publisher')}
      </div>
    </div>
  )
}

export default Component;