import types from '../types'

const DEFAULT_STATE = {
  useBarcodeLookup: true, // If true will make API calls whenever UPC is scanned
  item: {
    barcode: '',
    image: '',
    name: '',
    publisher: '',
  },
  ownership: {}
}

function addNewItemForm(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case types.formValuesUpdated: {
      return {
        ...state,
        item: {
          ...state.item,
          ...action.payload,
        }
      };
    }
    case types.formOwnershipUpdated: {
      return {
        ...state,
        ownership: {
          ...state.ownership,
          ...action.payload,
        }
      };
    }
  }
  return state;
}

export default addNewItemForm