import {types} from './actions'

const DEFAULT_STATE = {
  collectionType: '',
  meta: {
    isInitialized: false,
    isInProgress: false,
  },
  data: null,
  shape: { // Item attribute information
    item: null,
    ownership: null,
  },
}

function collection(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case types.initialize: {
      const collectionType = action.payload
      return {...state, collectionType}
    }
    case types.dataLoaded: {

    }
  }
  return state
}

export default collection