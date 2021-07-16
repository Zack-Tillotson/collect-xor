import React from 'react';
import cn from 'classnames'
import './component.scss'

import useBarcodeScan from './useBarcodeScan'

function Component(props) {
  const {
    isScanOpen,
    scanRender,
    startScan,
  } = useBarcodeScan(handleScanEnd, useBarcodeLookup)

  const handleScanClick = event => startScan()
  
  const handleScanEnd = data => {
    if(!data || !data.barcode) return
    dispatch(actions.formValuesUpdated(data))
    if(data.image) updateIsImageInput(true)
  }

  return (
    <div>
      {scanRender}
    </div>
  )
}

export default Component;