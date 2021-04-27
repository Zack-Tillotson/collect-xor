import React from 'react'
/*
 * This module is the main interface to interact with database
 * collections within React components. It will allow consumers 
 * to understand the current collection shape and make CRUD 
 * operations on the collection items.
 * 
 * Data is accessed synchronously but in-progress operations will
 * be identifiable using the 'meta' attribute. 
 */
 
export default () => {
  const [isInitialized, updateIsInitialized] = useState(false) // TODO from db
  const 
  return {
    meta: {
      isInitialized,
      isInProgress,
    },
    data,
    shape: { // Item attribute information
      item,
      ownership,
    },
  }
}