import types from '../types'

const INITIAL = {
  status: {
    isInitializing: true,
    isInitialized: false,    
  },
  players: [],
  games: [],
  sessions: [],
  newSessionForm: {
    game: 0,
    players: [],
  },
}

function sessionConfig(state = INITIAL, action) {
  switch(action.type) {
    case types.dbDataLoaded: {
      
      if(action.payload.path !== 'initialize') return state

      return {
        ...state,
        status: {
          isInitialized: true,
          isInitializing: false,
        },
        ...action.payload.data,
      }
    }

    case types.stateValueUpdated: {
      if(!action.payload.path.startsWith('sessionConfig/')) return state

      return {
        ...state,
        [action.payload.path.substring('sessionConfig/'.length)]: action.payload.value,
      }
    }
  }
  return state;
}

export default sessionConfig;