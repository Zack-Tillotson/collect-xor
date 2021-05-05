/*
 * This module is the main interface to interact with database
 * collections within React components. It will expose the data
 * and the interfaces for triggering CRUD actions.
 */

import React, {useState} from 'react'

import collection from './index'

export default () => {
  const [data, updateData] = useState(collection.get())

  // TODO monitor updates
  
  return data
}