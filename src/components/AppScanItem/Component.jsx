import React from 'react';
import cn from 'classnames'
import './component.scss'

import Page from 'components/Page'

import useAuth from 'data/auth/useAuth'
import useCollection from 'data/collection/useCollection'

import Quagga from 'quagga';

function Component(props) {

  const auth = useAuth()
  const collection = useCollection()

  if(!auth.isInitialized) {
    return auth.renderLoadingPage()
  }
  
  if(!auth.isLoggedIn) {
    return auth.renderLoginPage()
  }

  if(!collection.meta.isInitialized) {
    return auth.renderLoadingPage() 
  }

  const handleStartClick = event => {
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
      debug: {
          drawBoundingBox: true,
          showFrequency: true,
          drawScanline: true,
          showPattern: true,
      },
    }, function(err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.onDetected(resp => console.log(resp.codeResult.code))
        Quagga.start()
    });
  }

  return (
     <Page className="app-add-item">
      <h1>Scan a barcode</h1>
      <button onClick={handleStartClick}>Scan</button>
      <div id="image-viewport" />
    </Page>
  )
}

export default Component;