const type = 'DATA/COLLECTION'

export const types = {
  initialize: `${type}/initialize`,
  dataLoaded: `${type}/dataLoaded`,
}

const createAction = (type) => (payload) => ({type, payload})

// Each type gets an action creator which accepts the payload and returns a standard action
export default Object.keys(types)
  .reduce((actionCreators, type) => ({...actionCreators, [type]: createAction(types[type])}), {})