import React, {useEffect, useState} from 'react'
import cn from 'classnames'
import Quagga from 'quagga';

import './useBarcodeScan.scss'

const STATUS = {
  default: 'Initializing',
  error: 'Sorry this isn\'t working',
  scanning: 'Scanning for barcodes',
  complete: 'Scan complete, found barcode'
}

const REQUIRED_DETECTION_COUNT = 8

let barcodes = {}

function useBarcodeScan(onScanEnd) {

  const [isScanOpen, updateIsScanOpen] = useState(false)
  const [status, updateStatus] = useState(STATUS.default)
  const [highestCount, updateHighestCount] = useState(0)

  const handleScanComplete = barcode => {
    Quagga.stop()
    Quagga.offDetected(handleBarcodeFound)

    updateIsScanOpen(false)
    updateStatus(STATUS.complete)
    
    if(!barcode) {
      onScanEnd({barcode})
      return Promise.reject({barcode})
    }

    return fetch(`https://api.barcodespider.com/v1/lookup?token=b26e52aca779f1103306&upc=${barcode}`)
      .then(resp => resp.json())
      .then(data => {
        const {title, publisher, image} = data.item_attributes
        const itemInfo = {barcode, name: title, publisher, image}
        onScanEnd(itemInfo)
        return itemInfo
      })
      .catch(err => {
        onScanEnd({barcode})
        return {barcode}
      })

    
  }
  const handleCancelClick = event => handleScanComplete(null)

  const handleBarcodeFound = resp => {
    const code = resp.codeResult.code
    const currentCount = barcodes[code] || 0
    barcodes = {...barcodes, [code]: currentCount + 1}

    const highestCount = Object.values(barcodes).sort((a, b) => b - a)[0]
    updateHighestCount(highestCount)
    if(highestCount > REQUIRED_DETECTION_COUNT) {
      const highestCode = Object.keys(barcodes).find(code => barcodes[code] === highestCount)
      handleScanComplete(highestCode)
    }
  }

  const startScan = () => {
    updateIsScanOpen(true)
    updateStatus(STATUS.default)

    Quagga.init({
      inputStream : {
        name : "Live",
        type : "LiveStream",
        target: document.querySelector('#image-viewport')
      },
      decoder : {
        readers : [
          'code_128_reader',
          'ean_reader',
          'ean_8_reader',
          'code_39_reader',
          'code_39_vin_reader',
          'codabar_reader',
          'upc_reader',
          'upc_e_reader',
          'i2of5_reader',
          '2of5_reader',
          'code_93_reader',
        ]
      },
      multiple: false,
      halfSample: true,
      patchSize: 'medium',
    }, err => {
        if (err) {
            updateStatus(STATUS.error)
            return
        }
        barcodes = {}
        Quagga.onDetected(handleBarcodeFound)
        Quagga.start()

        updateStatus(STATUS.scanning)
    });
  }

  const scanRender = (
    <div className={cn('barcode-scan', {['barcode-scan--open']: isScanOpen})}>
      {isScanOpen && (<h2>Scan the barcode</h2>)}
      {isScanOpen && (<p>Hold the barcode up to the camera - make sure you've allowed this app to use your camera!</p>)}
      <div id="image-viewport" />
      {isScanOpen && (<div className="barcode-scan__feedback">{status} {status === STATUS.scanning && `${Math.floor(highestCount / REQUIRED_DETECTION_COUNT * 100)}%`}</div>)}
      {isScanOpen && (<button onClick={handleCancelClick}>Cancel</button>)}
    </div>
  )

  return {
    isScanOpen,
    scanRender,
    startScan,
  }
}

export default useBarcodeScan