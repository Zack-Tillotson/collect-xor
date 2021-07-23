import React, { isValidElement } from 'react';
import {Link} from 'react-router-dom'

import './component.scss'

import Page from 'components/Page'
import BarcodeScan from 'components/BarcodeScan'
import FormBreadcrumbs from 'components/FormBreadcrumbs'

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
    <Page className="add-item-barcode">
      <FormBreadcrumbs step={1} location={props.location} />
      <h1>Scan Barcode</h1>
      <BarcodeScan />
      <div className="add-item-barcode__alternate-controls">
        <div>- or -</div>
        <Link to="/app/add/attributes/" className="--button-like --hollow">Skip</Link>
      </div>
    </Page>
  )
}

export default Component;