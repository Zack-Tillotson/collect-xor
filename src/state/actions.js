import types from './types';

const createAction = (type) => (payload) => ({type, payload})

export default Object.keys(types).reduce((actionCreators, type) => ({...actionCreators, [type]: createAction(types[type])}), {})