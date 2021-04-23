import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {actions} from 'state'

export const pathSelector = path => state => path.split('/').reduce((substate, pathPiece) => substate[pathPiece], state)

export default path => {
  const value = useSelector(pathSelector(path))
  const dispatch = useDispatch()
  const updateValue = value => dispatch(actions.stateValueUpdated({path, value}))
  
  return [value, updateValue]
}