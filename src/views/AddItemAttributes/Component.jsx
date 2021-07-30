import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import cn from 'classnames'

import './component.scss'

import Page from 'components/Page'
import Input from 'components/ItemForm/components/Input'
import FormBreadcrumbs from 'components/FormBreadcrumbs'

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

  const handleFormSubmit = event => {
    event.preventDefault()
    updateStep('items')
    lookupNames()
  }
  const handleItemClick = item => event => {
    updateStep('attributes')
    lookupAttributes(item)
  }

  return (
     <Page className="app-item-scan-barcode">
      <FormBreadcrumbs step={2} location={props.location} />
      <h1>Lookup Attributes</h1>
      <form onSubmit={handleFormSubmit}>
        <Input formName="properties.name" />
        <button className={cn('--button-like', step === 'items' ? '--primary' : '--hollow')}>Lookup</button>
      </form>
      {step === 'items' && games.length > 0 && (
        <div className="attributes-list">
          <h3>BoardGameGeek Games</h3>
          {games.map(game => (
            <button key={game.id} className="--button-like --hollow --wide" onClick={handleItemClick(game)}>{game.name} - {game.year}</button>
          ))}
        </div>
      )}
      {step === 'attributes' && (
        <div className="attributes-list">
          <h3>BoardGameGeek Attributes</h3>
          <Input formName="properties.name" />
          <Input formName="properties.releaseDate" />
          <Input formName="properties.publisher" />
          <Input formName="properties.canonicalImage" />
          <Input formName="properties.designer" />
          <Input formName="properties.description" />
          <Input formName="properties.minPlayers" />
          <Input formName="properties.maxPlayers" />
          <Link to="/app/add/review/" className="--button-like --primary">Next: Review</Link>
        </div>
      )}
    </Page>
  )
}

export default Component;