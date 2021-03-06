import React from 'react';
import cn from 'classnames'
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'

import actions from 'state/actions'
import Input from 'components/ItemForm/components/Input'

import './component.scss'
import useBarcodeScan from './useBarcodeScan'

function Component(props) {

  const handleScanClick = event => startScan()

  const {
    isScanOpen,
    status,
    STATUS,
    percentLoaded,
    startScan,
    cancelScan
  } = useBarcodeScan()
  
  const dispatch = useDispatch()

  return (
    <div className="scan-barcode">
      {status !== STATUS.complete && (
        <div className={cn('scan-barcode__scan', {['scan-barcode__scan--open']: isScanOpen, ['scan-barcode__scan--closed']: !isScanOpen})} onClick={() => !isScanOpen && startScan()}>
          <div id="image-viewport" />
        </div>
      )}
      <div>
        {isScanOpen && (<div className="barcode-scan__feedback">{status} {status === STATUS.scanning && `${percentLoaded}%`}</div>)}
        {isScanOpen && (<button onClick={cancelScan}>Cancel</button>)}
        {status === STATUS.default && (<p className="scan-barcode__helper">Hold the barcode up to the camera - make sure you've allowed this app to use your camera!</p>)}
        {status === STATUS.complete && (
          <div className="scan-barcode__complete-controls">
            <h3>{status}</h3>
            <Input formName="id" />
            <Link to="/app/add/attributes/" className="--button-like --primary">Next: Attributes</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Component;