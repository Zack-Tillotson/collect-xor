/*
 * This module is the main interface to interact with database
 * collections within React components. It will expose the data
 * and the interfaces for triggering CRUD actions.
 */

import {useState, useEffect} from 'react'

import collection from './index'

export default (itemId) => {
  const [data, updateData] = useState(collection.get())

  useEffect(() => {
    const unlisten = collection.listen(() => {
      updateData(collection.get())
    })

    return () => unlisten()
  }, [itemId])
  
  return data
}