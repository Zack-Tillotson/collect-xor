import React, {useState} from 'react';
import cn from 'classnames'
import './component.scss'

// XXX this will be hardcoded for BGShelf for now. Generaliztion to come

function Component(props) {
  const {
    className,
    attributes,
  } = props

  const {
    image,
    name,
    publisher,
    releaseDate,
  } = attributes

  const [values, updateValues] = useState({
    image: '',
    name: '',
    publisher: '',
    releaseDate: '',
  })

  const [isImageInput, updateIsImageInput] = useState(!values.image)

  const updateValue = attr => event => updateValues({...values, [attr]: event.target.value})
  const textInput = (attr, label = attr) => ([
    <label htmlFor={`${attr}-input`}>{label}</label>,
    <input id={`${attr}-input`} type="text" value={values[attr]} onChange={updateValue([attr])} />
  ])

  const handleImageClick = event => updateIsImageInput(true)
  const handleImageInputDoneClick = event => updateIsImageInput(false)

  return (
    <div className={cn('primary-attributes', className)}>
      <div className={cn('primary-attributes__image')}>
        {!isImageInput && <img src={values.image} className="primary-attributes__image-pic" onClick={handleImageClick} />}
        {isImageInput && [
          ...textInput('image', 'Image URL'),
          <button onClick={handleImageInputDoneClick}>Done</button>
        ]}
      </div>
      <div className={cn('primary-attributes__name')}>
        {textInput('name', 'Name')}
      </div>
      <div className={cn('primary-attributes__publisher')}>
        {textInput('publisher', 'Publisher')}
      </div>
      <div className={cn('primary-attributes__release-date')}>
        {textInput('releaseDate', 'Year Released')}
      </div>
    </div>
  )
}

export default Component;