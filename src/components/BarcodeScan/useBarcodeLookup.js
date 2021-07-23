import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import actions from 'state/actions'

function useBarcodeLookup() {

  const dispatch = useDispatch()

  const lookup = barcode => {
  
    return fetch(`https://api.barcodespider.com/v1/lookup?token=b26e52aca779f1103306&upc=${barcode}`)
        .then(resp => resp.json())
        .then(data => {
          const {title, publisher, image} = data.item_attributes
          const updates = [
            {name: 'id', value: barcode},
            {name: 'properties.name', value: title},
          ]
          
          dispatch(actions.formValuesUpdated(updates))
        })
        .catch(err => {
          const updates = [
            {name: 'id', value: barcode},
          ]
          
          dispatch(actions.formValuesUpdated(updates))
        })
  }

  return {
    lookup,
  }
}

export default useBarcodeLookup