import React from 'react';

import cn from 'classnames'
import {Link} from 'react-router-dom'

import './component.scss'
import logoTitle from 'assets/headline-250x50.png'

function Component(props) {
  return (
    <div className={cn(props.className, 'page-head')}>
      <div className="page-head__content page__container">
        <Link to="/app/">
          <img src={logoTitle} alt="BG Shelf logo" />
        </Link>
      </div>
    </div>
  );
}

export default Component;