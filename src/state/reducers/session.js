import types from '../types'

export const COLORS = [
  '#ff7c7c',
  '#8dd889',
  '#74a2dd',
  '#f3f261',
  '#c461f3',
  '#62f9fc',
  '#fc9e62',
]

const INITIAL = {
  status: {
    isInitializing: true,
    isInitialized: false,    
  },
  players: [],
  game: null,
  events: [],
  colors: COLORS,
}

function session(state = INITIAL, action) {
  switch(action.type) {
    case types.dbDataLoaded: {

      if(action.payload.path !== 'sessions' || !action.payload.params) return state

      const newState = {
        ...state,
        status: {
          isInitialized: true,
          isInitializing: false,
        },
        ...action.payload.data,
      }

      if(!newState.colors) {
        newState.colors = COLORS
      }

      return newState
    }

    case types.stateValueUpdated: {
      if(!action.payload.path.startsWith('session/')) return state

      return {
        ...state,
        [action.payload.path.substring('session/'.length)]: action.payload.value,
      }
    }
  }
  return state;
}

export default session