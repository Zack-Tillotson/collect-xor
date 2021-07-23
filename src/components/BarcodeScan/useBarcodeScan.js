import React, {useEffect, useState} from 'react'
import cn from 'classnames'
import Quagga from 'quagga';

import './useBarcodeScan.scss'
import useBarcodeLookup from './useBarcodeLookup';

const STATUS = {
  default: 'Initializing',
  error: 'Sorry this isn\'t working',
  scanning: 'Scanning for barcodes',
  complete: 'Scan complete, found barcode'
}

const REQUIRED_DETECTION_COUNT = 8

let barcodes = {}

function useBarcodeScan() {

  const [isScanOpen, updateIsScanOpen] = useState(false)
  const [status, updateStatus] = useState(STATUS.default)
  const [highestCount, updateHighestCount] = useState(0)
  const {lookup} = useBarcodeLookup()

  const handleScanComplete = () => {
    Quagga.stop()
    Quagga.offDetected(handleBarcodeFound)

    updateIsScanOpen(false)
    updateStatus(STATUS.complete)
  }
  const cancelScan = event => handleScanComplete()

  const handleBarcodeFound = resp => {
    const code = resp.codeResult.code
    const currentCount = barcodes[code] || 0
    barcodes = {...barcodes, [code]: currentCount + 1}

    const highestCount = Object.values(barcodes).sort((a, b) => b - a)[0]
    updateHighestCount(highestCount)
    if(highestCount > REQUIRED_DETECTION_COUNT) {
      const highestCode = Object.keys(barcodes).find(code => barcodes[code] === highestCount)

      handleScanComplete()
      return lookup(highestCode)
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

  const percentLoaded = Math.floor(highestCount / REQUIRED_DETECTION_COUNT * 100)

  return {
    isScanOpen,
    startScan,
    cancelScan,
    status,
    STATUS,
    percentLoaded,
  }
}

export default useBarcodeScan