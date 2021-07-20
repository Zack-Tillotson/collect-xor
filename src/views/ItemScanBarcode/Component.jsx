import React, { isValidElement } from 'react';
import {Link} from 'react-router-dom'

import './component.scss'

import Page from 'components/Page'
import BarcodeScan from 'components/BarcodeScan'

import useAuth from 'data/auth/useAuth'
import useCollection from 'data/collection/useCollection'

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

  return (
     <Page className="app-item-scan-barcode">
      <Link to="..">← Back</Link>
      <h1>Scan Barcode</h1>
      <BarcodeScan />
    </Page>
  )
}

export default Component;