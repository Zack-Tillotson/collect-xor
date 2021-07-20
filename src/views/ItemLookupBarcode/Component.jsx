import React, { isValidElement } from 'react';
import {Link} from 'react-router-dom'

import './component.scss'

import Page from 'components/Page'
import Input from 'components/ItemForm/components/Input'


import useAuth from 'data/auth/useAuth'
import useCollection from 'data/collection/useCollection'
import useBarcodeLookup from './useBarcodeLookup';

function Component(props) {

  const auth = useAuth()
  const collection = useCollection()
  const {lookup} = useBarcodeLookup()

  if(!auth.isInitialized) {
    return auth.renderLoadingPage()
  }
  
  if(!auth.isLoggedIn) {
    return auth.renderLoginPage()
  }

  if(!collection.meta.isInitialized) {
    return auth.renderLoadingPage() 
  }

  const handleStartClick = event => lookup()

  return (
     <Page className="app-item-scan-barcode">
      <Link to="..">← Back</Link>
      <h1>Lookup Attributes</h1>
      <Input formName="id" showLink={false} />
      <button className="--button-like --primary" onClick={handleStartClick}>Lookup</button>
      <div className="attributes-list">
        <h3>Attributes</h3>
        <Input formName="properties.name" />
        <Input formName="properties.publisher" />
        <Input formName="properties.canonicalImage" />
      </div>
    </Page>
  )
}

export default Component;