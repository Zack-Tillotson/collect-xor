import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import actions from 'state/actions'

const formSelector = state => state.addNewItemForm

function useBarcodeLookup(formName = 'id') {

  const form = useSelector(formSelector)
  const dispatch = useDispatch()

  const barcode = formName.split('.').reduce((value, path) => value[path], form)

  const lookup = () => {
  
    fetch(`https://api.barcodespider.com/v1/lookup?token=b26e52aca779f1103306&upc=${barcode}`)
        .then(resp => resp.json())
        .then(data => {
          const {title, publisher, image} = data.item_attributes
          const updates = [
            {name: 'properties.name', value: title}, 
            {name: 'properties.publisher', value: publisher}, 
            {name: 'properties.canonicalImage', value: image},
          ]
          
          dispatch(actions.formValuesUpdated(updates))
        })
        .catch(err => {})
  }

  return {
    lookup,
  }
}

export default useBarcodeLookup