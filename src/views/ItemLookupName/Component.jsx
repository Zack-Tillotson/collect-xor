import React, { useState } from 'react';
import {Link} from 'react-router-dom'

import './component.scss'

import Page from 'components/Page'
import Input from 'components/ItemForm/components/Input'

import useAuth from 'data/auth/useAuth'
import useCollection from 'data/collection/useCollection'
import useNameLookup from './useNameLookup';

function Component(props) {

  const auth = useAuth()
  const collection = useCollection()
  const {
    lookupNames, 
    lookupAttributes,
    games,
  } = useNameLookup()
  const [step, updateStep] = useState('items')

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
    updateStep('items')
    lookupNames()
  }
  const handleItemClick = item => event => {
    updateStep('attributes')
    lookupAttributes(item)
  }

  return (
     <Page className="app-item-scan-barcode">
      <Link to="..">← Back</Link>
      <h1>Lookup Attributes</h1>
      <Input formName="properties.name" />
      <button className="--button-like --primary" onClick={handleStartClick}>Lookup</button>
      {step === 'items' && (
        <div className="attributes-list">
          <h3>BoardGameGeek Games</h3>
          {games.map(game => (
            <button key={game.id} className="--button-like --hollow" onClick={handleItemClick(game)}>{game.name} - {game.year}</button>
          ))}
        </div>
      )}
      {step === 'attributes' && (
        <div className="attributes-list">
          <h3>BoardGameGeek Attributes</h3>
          <Input formName="properties.name" />
          <Input formName="properties.publisher" />
          <Input formName="properties.canonicalImage" />
          <Input formName="properties.publisher" />
          <Input formName="properties.designer" />
        </div>
      )}
    </Page>
  )
}

export default Component;