import React from 'react';
import {Link} from 'react-router-dom'

import {useDispatch} from 'react-redux'
import cn from 'classnames'

import Page from 'components/Page'
import Login from 'components/Login'

import './component.scss'

function Component(props) {
  
  if(!props.auth) {
    return (
      <Page className="app-home">
        Please log in to use Boardgame Shelf.
        <Login />
      </Page>
    )
  }

  return (
    <Page className="app-home">
      <h1>Collection</h1>
    </Page>
  );
}

export default Component;