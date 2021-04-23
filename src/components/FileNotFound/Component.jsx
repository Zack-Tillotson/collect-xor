import React from 'react';
import {Link} from 'react-router-dom'

import cn from 'classnames'

import './component.scss'
import logo from 'assets/logo-400x400.png'


function Component(props) {
  return (
    <div className="page__loader">
      <Link to="/" className="">
        <h1>404 File Not Found</h1>
        <img src={logo} />
      </Link>        
    </div>
  );
}

export default Component;