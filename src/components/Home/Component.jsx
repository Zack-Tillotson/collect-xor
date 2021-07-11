import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';

import cn from 'classnames'

import Page from 'components/Page'

import './component.scss'
import hero from 'assets/bgshelf/logo-400x400.webp'

import useAuth from 'data/auth/useAuth'

function Component(props) {

  const auth = useAuth()

  useEffect(() => {
    if(auth.isInitialized && auth.isLoggedIn) {
      window.location = "/app/"
    }
  }, [auth.isInitialized, auth.isLoggedIn])
  
  return (
    <Page isHeadShown={false}>
      <div className="home">
        <h1 className="subtitle">Board Game Shelf</h1>
        <div className="home__hero">
          <img src={hero} />
        </div>
        <div className="home__controls">
          <Link to="/app/" className="--button-like --primary --wide">Open App</Link>
        </div>
        <div className="home__explanation">
          <p>Keep track of your board games, it's fun and free!</p>
        </div>
      </div>
    </Page>
  );
}

export default Component;