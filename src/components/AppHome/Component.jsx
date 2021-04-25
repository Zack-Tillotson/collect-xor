import React from 'react';
import {Link} from 'react-router-dom'

import {useDispatch} from 'react-redux'
import cn from 'classnames'

import Page from 'components/Page'
import ItemList from 'components/ItemList'
import AddItem from 'components/AddItem'

import useAuth from 'data/auth/useAuth'

import './component.scss'

function Component(props) {

  const auth = useAuth()

  if(!auth.isInitialized) {
    return auth.renderLoadingPage()
  }
  
  if(!auth.isLoggedIn) {
    return auth.renderLoginPage()
  }
  
  return (
    <Page className="app-home">
      <div className="app-home__header">
        <h1 className="app-home__title">Your game list</h1>
        <AddItem className="app-home__add-item" />
      </div>
      <ItemList />
    </Page>
  );
}

export default Component;