/*
 * This module is the main interface to interact with database
 * collections within React components. It will expose the data
 * and the interfaces for triggering CRUD actions.
 */

import React, {useState, useEffect} from 'react'

import collection from './index'

export default () => {
  const [data, updateData] = useState(collection.get())

  useEffect(() => {
    return collection.listen(() => {
      updateData(collection.get())
    })
  }, [collection])
  
  return data
}