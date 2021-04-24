import React from 'react';
import {Link} from 'react-router-dom'

import {useDispatch} from 'react-redux'
import cn from 'classnames'

import Page from 'components/Page'

import './component.scss'
import logo from 'assets/bgshelf/logo-400x400.webp'

function Component(props) {
  return (
    <Page className="app-home">
      <h1>BG Shelf</h1>
    </Page>
  );
}

export default Component;