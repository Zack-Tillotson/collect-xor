import types from '../types'

const DEFAULT_STATE = {
  useBarcodeLookup: true, // If true will make API calls whenever UPC is scanned
  item: {
    barcode: '0816167010505', // XXX remove default values when dev is complete
    image: 'https://images.barcodespider.com/upcimage/0816167010505.jpg',
    name: 'Boogy Wipes',
    publisher: 'Boogy Wipes',
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